---
title: DesyncClient class
subtitle: High-Level Client for the Desync Search API
slug: desyncclient
---

# DesyncClient

The `DesyncClient` class provides a high-level interface to the Desync Search API, managing individual searches, bulk operations, domain crawling, and credit balance checks. Below are its primary methods, each listed with a short heading. The full method signature appears under each heading in a code block.

---

## __init__()

**Signature:**
```python
def __init__(self, user_api_key="", developer_mode=False)
```

**Description:**  
Initializes the client with the provided API key or reads it from the `DESYNC_API_KEY` environment variable. If `developer_mode` is `True`, the client uses a test endpoint; otherwise, it uses the production endpoint.

**Parameters:**
- **user_api_key** *(str, optional)*: Your Desync API key.  
- **developer_mode** *(bool, optional)*: Toggles between test and production endpoints.

**Example:**
```python
from desync_search import DesyncClient

client = DesyncClient(user_api_key="YOUR_API_KEY", developer_mode=False)
```

---

## search()

**Signature:**
```python
def search(
    self,
    url,
    search_type="stealth_search",
    scrape_full_html=False,
    remove_link_duplicates=True
) -> PageData
```

**Description:**  
Performs a single search on a specified URL. Returns a `PageData` object containing the page’s text, links, timestamps, and other metadata.

**Parameters:**
- **url** *(str)*: The URL to scrape.  
- **search_type** *(str)*: `"stealth_search"` (default, 10 credits) or `"test_search"` (1 credit).  
- **scrape_full_html** *(bool)*: If `True`, returns the full HTML content.  
- **remove_link_duplicates** *(bool)*: If `True`, removes duplicate links from the results.

**Example:**
```python
result = client.search("https://example.com")
print(result.text_content)
```

---

## bulk_search()

**Signature:**
```python
def bulk_search(
    self,
    target_list,
    extract_html=False
) -> dict
```

**Description:**  
Initiates an asynchronous bulk search on up to 1000 URLs at once. Returns a dictionary containing a `bulk_search_id` and other metadata.

**Parameters:**
- **target_list** *(list[str])*: List of URLs to process.  
- **extract_html** *(bool)*: If `True`, includes the full HTML content in results.

**Example:**
```python
bulk_info = client.bulk_search(
    target_list=["https://example.com", "https://another-example.net"]
)
print(bulk_info["bulk_search_id"])
```

---

## list_available()

**Signature:**
```python
def list_available(
    self,
    url_list=None,
    bulk_search_id=None
) -> list
```

**Description:**  
Retrieves minimal data about previously collected search results (IDs, domains, timestamps, etc.). Returns a list of `PageData` objects with limited fields.

**Parameters:**
- **url_list** *(list[str], optional)*: Filters results by specific URLs.  
- **bulk_search_id** *(str, optional)*: Filters results by a particular bulk search ID.

**Example:**
```python
partial_records = client.list_available(bulk_search_id="some-bulk-id")
for rec in partial_records:
    print(rec.url, rec.complete)
```

---

## pull_data()

**Signature:**
```python
def pull_data(
    self,
    record_id=None,
    url=None,
    domain=None,
    timestamp=None,
    bulk_search_id=None,
    search_type=None,
    latency_ms=None,
    complete=None,
    created_at=None
) -> list
```

**Description:**  
Retrieves full data (including text and optional HTML content) for one or more records matching the provided filters. Returns a list of `PageData` objects.

**Parameters:**  
Any combination of filters like `record_id`, `url`, `domain`, `timestamp`, or `bulk_search_id`.

**Example:**
```python
detailed_records = client.pull_data(url="https://example.com")
for record in detailed_records:
    print(record.html_content)
```

---

## pull_credits_balance()

**Signature:**
```python
def pull_credits_balance(self) -> dict
```

**Description:**  
Checks the user’s current credit balance and returns it as a dictionary.

**Example:**
```python
balance_info = client.pull_credits_balance()
print(balance_info["credits_balance"])
```

---

## collect_results()

**Signature:**
```python
def collect_results(
    self,
    bulk_search_id: str,
    target_links: list,
    wait_time: float = 30.0,
    poll_interval: float = 2.0,
    completion_fraction: float = 0.975
) -> list
```

**Description:**  
Polls periodically for bulk search completion until a specified fraction of pages are done or a maximum wait time elapses, then retrieves full data. Returns a list of `PageData` objects.

**Parameters:**
- **bulk_search_id** *(str)*: The unique identifier for the bulk search.  
- **target_links** *(list[str])*: The list of URLs in the bulk job.  
- **wait_time** *(float)*: Maximum polling duration in seconds.  
- **poll_interval** *(float)*: Interval between status checks.  
- **completion_fraction** *(float)*: Fraction of completed results needed to stop polling.

**Example:**
```python
results = client.collect_results(
    bulk_search_id="bulk-id-123",
    target_links=["https://example.com", "https://another.com"]
)
print(len(results))
```

---

## simple_bulk_search()

**Signature:**
```python
def simple_bulk_search(
    self,
    target_list: list,
    extract_html: bool = False,
    poll_interval: float = 2.0,
    wait_time: float = 30.0,
    completion_fraction: float = 1
) -> list
```

**Description:**  
Splits a large list of URLs into chunks (up to 1000 URLs each), initiates a bulk search for each chunk, then collects and aggregates the results.

**Parameters:**
- **target_list** *(list[str])*: URLs to be processed, possibly more than 1000.  
- **extract_html** *(bool)*: If `True`, includes the full HTML content.  
- **poll_interval** *(float)*: Polling interval in seconds.  
- **wait_time** *(float)*: Maximum wait time in seconds per chunk.  
- **completion_fraction** *(float)*: Fraction of completed links needed to stop polling each chunk.

**Example:**
```python
all_pages = client.simple_bulk_search(
    target_list=["https://site1.com", "https://site2.com", ...],
    extract_html=False
)
print(len(all_pages))
```

---

## crawl()

**Signature:**
```python
def crawl(
    self,
    start_url: str,
    max_depth: int = 2,
    scrape_full_html: bool = False,
    remove_link_duplicates: bool = True,
    poll_interval: float = 2.0,
    wait_time_per_depth: float = 30.0,
    completion_fraction: float = 0.975
) -> list
```

**Description:**  
Recursively crawls the specified `start_url` up to `max_depth` levels. Performs a stealth search on the start URL, collects same-domain links, and uses bulk searches to fetch pages at each depth.

**Parameters:**
- **start_url** *(str)*: Initial URL to crawl.  
- **max_depth** *(int)*: Maximum crawl depth.  
- **scrape_full_html** *(bool)*: If `True`, includes the full HTML.  
- **remove_link_duplicates** *(bool)*: If `True`, removes duplicate links.  
- **poll_interval** *(float)*: Polling interval in seconds.  
- **wait_time_per_depth** *(float)*: Maximum wait time in seconds per depth.  
- **completion_fraction** *(float)*: Fraction of completed links required to move to the next depth.

**Example:**
```python
crawled_pages = client.crawl(
    start_url="https://example.com",
    max_depth=3,
    scrape_full_html=False
)
print(len(crawled_pages))
```

---

## _post_and_parse()

**Signature:**
```python
def _post_and_parse(self, payload)
```

**Description:**  
An internal helper method that sends the given payload to the API, parses the JSON response, and raises an error if the request fails.

---
