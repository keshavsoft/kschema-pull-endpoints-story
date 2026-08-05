import fs from 'fs';

import pullEndPoints from "kschema-pull-endpoints";
import getAnyJsStory from "pattern-collector-anyjs-story";

const fileType = "fromEndPointsJs";

const startFunc = ({ toPath, inTargetPath }) => {

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
            trimmedPath: element.replace(inTargetPath, ""),
            story: anyJsStory
        }
    });


    return endPointsWithStory;
};

export default startFunc;