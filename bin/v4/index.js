import scout from "./adventure/scout.js";
import parser from "./adventure/parser.js";

const startFunc = ({ toPath, inTargetPath }) => {
    const paths = scout({ toPath });
    const endPointsWithStory = parser({ paths, inTargetPath });
    return endPointsWithStory;
};

export default startFunc;