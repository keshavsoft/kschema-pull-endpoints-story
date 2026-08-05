# Development Guide

This document explains the internal architecture and development workflow of `kschema-pull-endpoints-story`.

---

# Introduction

`kschema-pull-endpoints-story` is a modular metadata-collection package. Its core purpose is recursively finding endpoint files (`end-points.js`) in a project workspace, reading their code, and parsing their structure to collect route and logic stories.

The architecture emphasizes:
- **Version Isolation**: Multiple runtime engines can co-exist inside the codebase.
- **Dynamic Loader**: The root entry point dynamically resolves and loads the latest engine.
- **Dependency Integration**: Leverages `kschema-pull-endpoints` for scanning and `pattern-collector-anyjs-story` for story parsing.

---

# Folder Structure

```text
bin/
 ├── core/
 │    ├── getLatestVersion.js
 │    └── loadRunner.js
 ├── v2/
 │    └── index.js
 └── v3/ (Active Version)
      └── index.js

index.js             (Root Entry point)

test/
 ├── v1/
 ├── v2/
 └── v3/
```

---

# High-Level Architecture

The execution pipeline for a programmatic call to `kschema-pull-endpoints-story` works as follows:

```text
Programmatic API Call
        ↓
    index.js (Root)
        ↓  (Scans bin/ for highest v* directory with index.js)
  bin/v3/index.js
        ↓
  1. Invokes kschema-pull-endpoints to locate all end-points.js
  2. Reads each found file and parses its contents using pattern-collector-anyjs-story
        ↓
Returns flat array of endpoints with their respective path details and parsed stories
```

---

# Engine Components (v3)

### 1. Root Entry (`index.js`)
The root entry point scans all directories in `bin/` matching `/^v\d+$/` and sorts them to find the highest number. It then dynamically loads and exports the default function of the latest version's `index.js`.

### 2. The Chronicle Engine (`bin/v3/index.js`)
Serves as the version entry point. It receives `toPath` and `inTargetPath` as parameters, searches for matching file paths via `kschema-pull-endpoints`, collects the story data for each file, and formats the output.

---

# Developing and Versioning

To introduce changes or release a new version format:

1. **Create the New Version Directory**: Add a directory under `bin/` (e.g. `bin/v4`).
2. **Implement `index.js`**: Create `index.js` as the main export of the folder with the updated logic.
3. **Create a Test Harness**: Add a directory under `test/` (e.g. `test/v4`) matching the new runtime environment structure to validate your changes.

The dynamic resolver in the root `index.js` will automatically pick up and execute the new version as soon as it is created.

---

# Local Testing

Run verification tests for the active engine (`v3`) from the project root:

```bash
node test/v3/test.js
```
