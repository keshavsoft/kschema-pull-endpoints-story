import fs from 'fs';

import pullEndPoints from "kschema-pull-endpoints";
import getAnyJsStory from "pattern-collector-anyjs-story";

import { fileURLToPath } from "url";

const fileType = "fromEndPointsJs";

const startFunc = ({ toPath }) => {

const endPointsWithFullPath = pullEndPoints({
    toPath
});

    const endPointsWithStory = endPointsWithFullPath.map(element => {

        const fileContent = fs.readFileSync(element, 'utf8');

        const anyJsStory = getAnyJsStory({
            fileContent,
            fileType
        });

        return {
            fullPath: element,
            story: anyJsStory
        }
    });


    return endPointsWithStory;
};

export default startFunc;