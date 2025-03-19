---
title: Quickstart
subtitle: Code Examples for Desync Search
slug: quickstart
---

# Quickstart with Desync Search

Below are ready-to-run code examples that demonstrate the core features of Desync Search. Simply copy these snippets into your IDE, update your API key if necessary (or set it in your environment), and run!

## 1. Performing a Single Search

**What It Does:**  
Search a single URL and return detailed page data—including the URL, links, and content length—packaged in a `PageData` object.

```python
from desync_search import DesyncClient

client = DesyncClient()
target_url = "https://example.com"
result = client.search(target_url)

print("URL:", result.url)
print("Internal Links:", len(result.internal_links))
print("External Links:", len(result.external_links))
print("Text Content Length:", len(result.text_content))
```

---

## 2. Crawling an Entire Domain

**What It Does:**  
Recursively crawls a website. The starting page is "depth 0". Any link on that page (that has the same domain) is considered "depth 1", and links on depth 1 pages become "depth 2", and so on. This process continues until the maximum depth is reached or no new unique pages are found.

```python
from desync_search import DesyncClient

client = DesyncClient()

pages = client.crawl(
    start_url="https://example.com",
    max_depth=2,
    scrape_full_html=False,
    remove_link_duplicates=True
)

print(f"Discovered {len(pages)} pages.")
for page in pages:
    print("URL:", page.url, "| Depth:", getattr(page, "depth", "N/A"))
```

---

## 3. Initiating a Bulk Search

**What It Does:**  
Processes a list of URLs asynchronously in one operation. Up to 1000 URLs can be processed per bulk search. The method returns metadata including a unique bulk search ID that you can later use to retrieve the full results.

```python
from desync_search import DesyncClient

client = DesyncClient()
urls = [
    "https://example.com",
    "https://another-example.com",
    # Add additional URLs here (up to 1000 per bulk search)
]

bulk_info = client.bulk_search(target_list=urls, extract_html=False)
print("Bulk Search ID:", bulk_info.get("bulk_search_id"))
print("Total Links Scheduled:", bulk_info.get("total_links"))
```

---

## 4. Collecting Bulk Search Results

**What It Does:**  
After initiating a bulk search, use this snippet to poll for and collect the complete results. The method waits until a specified fraction of the URLs have been processed (or a timeout is reached) and then retrieves the full page data.

```python
from desync_search import DesyncClient

client = DesyncClient()
urls = [
    "https://example.com",
    "https://another-example.com",
    # Add more URLs as needed
]

# Initiate a bulk search
bulk_info = client.bulk_search(target_list=urls, extract_html=False)

# Poll and collect results once enough pages are complete
results = client.collect_results(
    bulk_search_id=bulk_info["bulk_search_id"],
    target_links=urls,
    wait_time=30.0,
    poll_interval=2.0,
    completion_fraction=0.975
)

print(f"Retrieved {len(results)} pages from the bulk search.")
for result in results:
    print("URL:", result.url)
```

---

## 5. Using Simple Bulk Search

**What It Does:**  
For large lists of URLs (even exceeding 1000 elements), the `simple_bulk_search` method splits the list into manageable chunks, starts a bulk search for each chunk, and then aggregates all the results. This provides a fully managed bulk search experience.

```python
from desync_search import DesyncClient

client = DesyncClient()
urls = [
    "https://example.com",
    "https://another-example.com",
    # Add as many URLs as needed; this method handles splitting automatically.
]

results = client.simple_bulk_search(
    target_list=urls,
    extract_html=False,
    poll_interval=2.0,
    wait_time=30.0,
    completion_fraction=1
)

print(f"Retrieved {len(results)} pages using simple_bulk_search.")
for result in results:
    print("URL:", result.url)
```