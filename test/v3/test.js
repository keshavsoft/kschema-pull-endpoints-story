import path from 'path';

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsPath = path.join(__dirname, "api");

import defaultFunc from '../../index.js';

const endPointsWithStory = defaultFunc({
    toPath: appJsPath,
    inTargetPath: __dirname
});

// console.log("ssssssssss------ : ", __dirname);
console.log(JSON.stringify(endPointsWithStory[0], null, 4));
