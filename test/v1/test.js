import path from 'path';

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsPath = path.join(__dirname, "api");

import defaultFunc from '../../index.js';

const k1 = defaultFunc({
    toPath: appJsPath
});

// console.log("ssssssssss : ", k1);
console.log(JSON.stringify(k1, null, 4));
