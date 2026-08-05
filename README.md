# kschema-pull-endpoints-story

> Recursively scan your backend or UI directories to locate `end-points.js` configuration/route files, and parse their contents to gather their complete routing and code "stories".

[![Documentation](https://img.shields.io/badge/docs-GitHub_Pages-blue)](https://keshavsoft.github.io/kschema-pull-endpoints-story/)
<br />

`kschema-pull-endpoints-story` is a lightweight programmatic utility that combines recursive path scanning with regex-based AST/pattern analysis. It locates all files named `end-points.js` within a target directory and extracts detailed metadata (stories) about how those endpoints are configured, imported, and consumed.

---

## Features

- 🔍 **Automated Scanning**: Recursively discovers all `end-points.js` files using `kschema-pull-endpoints`.
- 📖 **Story Extraction**: Parses code patterns inside each `end-points.js` file using `pattern-collector-anyjs-story` to build a metadata story.
- 📦 **Dynamic Runtime Resolver**: Automatically detects and loads the latest engine version (currently `v3`) dynamically from the `bin/` directory.
- 🧪 **Version-Isolated Testing**: Includes version-isolated test suites (e.g. `test/v3`) to guarantee backward compatibility and development safety.

---

## Installation

```bash
npm install kschema-pull-endpoints-story
```

---

## Usage

### Programmatic API

Import the default function and call it with your target folder path (`toPath`) and reference base path (`inTargetPath`):

```javascript
import collectEndpointsStory from "kschema-pull-endpoints-story";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Recursively find endpoints and build their code stories
const results = collectEndpointsStory({
    toPath: path.join(__dirname, "api"),
    inTargetPath: __dirname
});

console.log(JSON.stringify(results[0], null, 4));
```

### Sample Output Structure

```json
{
    "fullPath": "D:\\KeshavSoftRepos\\5aug\\ks2\\kschema-pull-endpoints-story\\test\\v3\\api\\v1\\bills\\end-points.js",
    "trimmedPath": "\\api\\v1\\bills\\end-points.js",
    "story": {
        "story": {
            "express": {
                "import": [
                    "importLinesFromNpm.firstLineIndex",
                    "importLinesFromNpm.lastLineIndex",
                    "firstLineIndex"
                ]
            },
            "funcFromdel": {
                "import": [
                    "importLines.firstLineIndex",
                    "importLines.lastLineIndex",
                    "firstLineIndex"
                ],
                "consumption": [
                    "useLines.firstLineIndex",
                    "variablesDeclareHereLines.lastLineIndex",
                    "lastLineIndex"
                ]
            }
        },
        "variablesConnection": "funcFrom",
        "reverseTemplates": {
            "importNpmRegex": "import {0} from '{1}';",
            "importRegex": "import {0} from './{1}/controller.js';",
            "consumptionRegex": "router.get('/{1}', (req, res) => {0}({ req, res, inTablePath: tablePath }));"
        },
        "firstAndLastValues": {
            "importLinesFromNpm": {
                "firstLine": {
                    "match": "import express from 'express';",
                    "line": "import express from 'express';",
                    "lineNumber": 1
                },
                "lastLine": {
                    "match": "import express from 'express';",
                    "line": "import express from 'express';",
                    "lineNumber": 1
                }
            },
            "importLines": {
                "firstLine": {
                    "match": "import funcFromdel from './del/controller.js';",
                    "line": "import funcFromdel from './del/controller.js';",
                    "lineNumber": 3
                },
                "lastLine": {
                    "match": "import funcFromshowAll from './showAll/controller.js';",
                    "line": "import funcFromshowAll from './showAll/controller.js';",
                    "lineNumber": 6
                }
            }
        },
        "onlyIndexesValues": {
            "importLinesFromNpm": {
                "firstLineIndex": 1,
                "lastLineIndex": 1
            },
            "importLines": {
                "firstLineIndex": 3,
                "lastLineIndex": 6
            }
        }
    }
}
```

---

## Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `toPath` | `String` | *Required* | The absolute directory path to scan. |
| `inTargetPath` | `String` | *Required* | The root target directory path used to trim absolute paths into relative ones (`trimmedPath`). |

---

## Architecture & Internals

This library uses a version-isolated runner architecture:

1. **Root Entry** (`index.js`): Scans the `bin/` directory, detects the highest version folder (e.g. `bin/v3`), and imports its engine dynamically.
2. **The Chronicle Engine** (`bin/v3/index.js`):
   - Triggers `kschema-pull-endpoints` to scan the designated realm (`toPath`) and gather absolute file paths of `end-points.js`.
   - Iterates through the paths, reads file content, and processes the text using `pattern-collector-anyjs-story`.
   - Maps and returns the collection as a flat array of objects containing `fullPath`, `trimmedPath`, and `story`.

---

## Local Development & Testing

Clone the repository and install dependencies:

```bash
git clone https://github.com/keshavsoft/kschema-pull-endpoints-story.git
cd kschema-pull-endpoints-story
npm install
```

Run the validation suite for the latest version (`v3`):

```bash
node test/v3/test.js
```

---

## License

MIT
