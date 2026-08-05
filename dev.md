# Development Guide

This document explains the internal architecture and development workflow of `kschema-pull-endpoints`.

---

# Introduction

`kschema-pull-endpoints` is a modular routing helper package. Its core purpose is recursively finding endpoint files (`end-points.js`) in a project workspace to allow automatic route initialization and registration.

The architecture emphasizes:
- **Version Isolation**: Multiple runtime engines can co-exist inside the codebase.
- **Dynamic Loader**: The root entry point dynamically resolves and loads the latest engine.
- **Story-Driven Code Layout**: Naming internal modules with intuitive roles (like "The Scout" for directory scanning).

---

# Folder Structure

```text
bin/
 ├── core/
 │    ├── getLatestVersion.js
 │    └── loadRunner.js
 ├── v5/
 │    ├── adventure/
 │    │    ├── scout.js
 │    │    └── trimPaths.js
 │    ├── alterConfig.js
 │    ├── getAllJsons.js
 │    ├── getConfig.js
 │    └── index.js
 └── v6/ (Active Version)
      ├── index.js   (The Chronicle / Entry Router)
      └── scout.js   (The Scout / Scanner)

index.js             (Root Entry point)

test/
 ├── v5/
 └── v6/
```

---

# High-Level Architecture

The execution pipeline for a programmatic call to `kschema-pull-endpoints` works as follows:

```text
Programmatic API Call
        ↓
    index.js (Root)
        ↓  (Scans bin/ for highest v* directory with index.js)
  bin/v6/index.js (Chronicle)
        ↓  (Determines action, e.g. "Crud")
  bin/v6/scout.js (Scout)
        ↓  (Performs recursive search using node-fs-recursive)
Returns list of absolute paths
```

---

# Engine Components (v6)

### 1. Root Entry (`index.js`)
The root entry point scans all directories in `bin/` matching `/^v\d+$/` and sorts them to find the highest number. It then dynamically loads and exports the default function of the latest version's `index.js`.

### 2. The Chronicle (`bin/v6/index.js`)
Serves as the version entry point. It checks the configuration action parameter (`inAction`) and decides which module to call. Currently, `"Crud"` is supported, which invokes the Scout.

### 3. The Scout (`bin/v6/scout.js`)
Performs recursive filesystem searching. It utilizes the external library `node-fs-recursive` to scan the workspace and identify all files named `end-points.js`.

---

# Developing and Versioning

To introduce changes or release a new version format:

1. **Create the New Version Directory**: Add a directory under `bin/` (e.g. `bin/v7`).
2. **Implement `index.js`**: Create `index.js` as the main export of the folder.
3. **Register Actions**: Create the action modules under your version directory.
4. **Create a Test Harness**: Add a directory under `test/` (e.g. `test/v7`) matching the new runtime environment structure to ensure validation.

The dynamic resolver in the root `index.js` will automatically pick up and execute the new version as soon as it is created.

---

# Local Testing

Run verification tests for the active engine (`v6`) from the project root:

```bash
node test/v6/test.js
```
