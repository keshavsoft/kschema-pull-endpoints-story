# kschema-pull-endpoints

> Recursively scan your backend or UI directories to locate and collect routes and configuration files (`end-points.js`) dynamically.

[![Documentation](https://img.shields.io/badge/docs-GitHub_Pages-blue)](https://keshavsoft.github.io/kschema-pull-endpoints/)
<br />
[📖 View the Interactive Documentation and Scout Simulator](https://keshavsoft.github.io/kschema-pull-endpoints/)

`kschema-pull-endpoints` is a lightweight, configuration-driven utility that scans a designated directory tree for endpoint JavaScript files (`end-points.js`) and returns their absolute paths. This is ideal for modular route registration, dynamic routing setups, and schema compilation in Express/Node.js microservices or monorepos.

---

## Features

- 🔍 **Automated Scouting**: Recursively searches the filesystem to locate all files named `end-points.js`.
- 📦 **Dynamic Runtime Loader**: Scans the `bin/` folder and loads the latest engine version (currently `v6`) dynamically, ensuring backward compatibility.
- 📖 **Story-Driven Codebase**: Employs clean naming conventions like "The Scout" (`scout.js`) to make logic readable and self-documenting.
- ⚙️ **Action Isolation**: Currently processes standard route endpoints under the `"Crud"` action.
- 🧪 **Version-Isolated Testing**: Includes dedicated test harnesses for each version (e.g. `test/v6`) to guarantee runtime reliability.

---

## Installation

```bash
npm install kschema-pull-endpoints
```

---

## Usage

### Programmatic API

Import the utility and call it with your target folder path:

```javascript
import loadEndpoints from "kschema-pull-endpoints";
import path from "node:path";

// Recursively find all endpoint files in your API directory
const endpoints = loadEndpoints({
    toPath: path.join(process.cwd(), "api", "v1"),
    inAction: "Crud" // Optional: defaults to "Crud"
});

console.log(endpoints);
/*
Output:
[
  "/Users/username/project/api/v1/doctors/end-points.js",
  "/Users/username/project/api/v1/bills/end-points.js",
  "/Users/username/project/api/v1/tests/end-points.js"
]
*/
```

### Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `toPath` | `String` | *Required* | The absolute directory path to scan. |
| `inAction` | `String` | `"Crud"` | The command action name (only `"Crud"` supported currently). |

---

## Architecture & Under the Hood (v6)

This library uses a version-isolated runner architecture:

1. **The Entry point** (`index.js`): Scans the `bin/` directory, detects the highest version folder (e.g. `bin/v6`), and imports its main engine.
2. **The Chronicle** (`bin/v6/index.js`): Receives the input arguments, matches the action, and delegates the search.
3. **The Scout** (`bin/v6/scout.js`): Uses recursive filesystem scanning (`node-fs-recursive`) to search the realm (`toPath`) and gather all target gems (`end-points.js`).

---

## Local Development & Testing

Clone the repository and install dependencies:

```bash
git clone https://github.com/keshavsoft/kschema-pull-endpoints.git
cd kschema-pull-endpoints
npm install
```

Run the validation suite for the latest version:

```bash
node test/v6/test.js
```

---

## License

MIT

