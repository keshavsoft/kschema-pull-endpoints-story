import fs from 'node:fs';
import getAnyJsStory from "pattern-collector-anyjs-story";

const fileType = "fromEndPointsJs";

export default function parseEndpoints({ paths, inTargetPath }) {
    return paths.map(element => {
        const fileContent = fs.readFileSync(element, 'utf8');

        const anyJsStory = getAnyJsStory({
            fileContent,
            fileType
        });

        return {
            fullPath: element,
            trimmedPath: element.replace(inTargetPath, ""),
            story: anyJsStory
        };
    });
}
