---
title: Installation & Setup
subtitle: Get Started with Desync Search
slug: installation
---

# Installation & Setup

## 1. Installing the Library

To install Desync Search via pip, run:

```bash
pip install desync_search
```

## 2. Setting Up Your API Key

Desync Search uses your API key to authenticate requests. The `DesyncClient` automatically checks for an environment variable named `DESYNC_API_KEY` if you don't pass the key directly. This ensures secure and convenient usage.

### Setting the Environment Variable

#### On Unix/Linux/MacOS (bash):

Add the following to your terminal session or your shell profile (e.g. `.bashrc` or `.bash_profile`):

```bash
export DESYNC_API_KEY="your_api_key_here"
```

#### On Windows (Command Prompt):

Run the following command:

```cmd
set DESYNC_API_KEY=your_api_key_here
```

#### On Windows (PowerShell):

Use this command:

```powershell
$env:DESYNC_API_KEY="your_api_key_here"
```

## 3. Initializing the Client

Once your API key is set, you can initialize the client without specifying the API key:

```python
from desync_search import DesyncClient

client = DesyncClient()
```

Alternatively, you can pass a different API key directly:

```python
client = DesyncClient(user_api_key="your_api_key_here")
```
```