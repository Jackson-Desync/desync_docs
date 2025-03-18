---
title: PageData class
subtitle: Every Method and Attribute of the PageData Class
slug: pagedata
---

The `PageData` class packages all the information extracted from a web page during a search. It includes both details about the page itself and metadata about the search operation (such as timestamps and latency).

## PageData Attributes

### `id` (int)
A unique identifier for the search result. This is always an integer.

### `url` (str)
The URL targeted by the search, often referred to as the "target URL" or "target page". <br/>
For example: `abc.com/news`.

### `domain` (str)
The domain of the targeted URL. <br/>
For instance, if the URL is `abc.com/news`, then the domain is `abc.com`.

### `timestamp` (int)
A Unix timestamp marking when the result was received. This value is always an integer.

### `bulk_search_id` (str)
A unique identifier for the bulk search batch that this search belongs to. All searches in the same batch share the same `bulk_search_id`. This may be `NONE` if the search was not part of a bulk search.

### `search_type` (str)
A string indicating the type of search performed. Two options are available:
- **`stealth_search`**: *(Default)* Renders JavaScript and employs methods to evade most bot detection systems, making the search appear human.
- **`test_search`**: Does not render JavaScript and uses minimal measures to appear human. This mode is intended for prototyping and may produce different results than `stealth_search`.

### `text_content` (str)
The text extracted from the page’s DOM. This attribute is always a string and is recommended for use with any retrieval or regex-based data extraction.

### `html_content` (str)
The full HTML (or as much as was loaded during extraction) of the target page. This attribute is optional and not returned by default to save on bandwidth and processing time. Enable it if you need the complete HTML.
Every method that performs a search has a option to turn this on.

### `internal_links` (list[str])
A list of URLs found on the target page that point to the same domain. For example, if the target URL is `abc.com`, the list might include:
```
["abc.com/news", "abc.com/faq", ...]
```
This is useful for navigating within the same website.

### `external_links` (list[str])
A list of URLs on the target page that point to different domains. For example, if the target URL is `abc.com`, the list might include:
```
["def.com", "def.com/news", ...]
```

### `latency_ms` (int)
An integer representing the time in milliseconds (ms) between the server-side initialization of the search and the collection of results. Note that this may differ from client-side timings due to network and polling delays.

### `complete` (bool)
A boolean value indicating whether the search operation is complete. This is primarily used for developer purposes.

### `created_at` (int)
A Unix timestamp marking the moment the search was initiated on the client-side.
