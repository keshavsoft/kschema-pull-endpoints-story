import { scoutTheRealmForTargetJsons } from "./adventure/scout.js";
import trimPaths from "./adventure/trimPaths.js";

const fileNameToCompare = "end-points.js";

const startFunc = ({ toPath, inAction = "Crud", inTargetPath }) => {
    switch (inAction) {
        case "Crud":
            const hiddenGems = scoutTheRealmForTargetJsons({
                realmPath: toPath,
                inFileNameToCompare: fileNameToCompare
            });

            // console.log("hiddenGems : ", fileNameToCompare, hiddenGems);

            const trimmedPathsArray = trimPaths({
                inPathsArray: hiddenGems,
                inTargetPath, inFileNameToCompare: fileNameToCompare
            });

            console.log("aaaaaaaa : ", fileNameToCompare, trimmedPathsArray, hiddenGems);

            // transmuteGemsWithWisdom({ gems: hiddenGems, wisdom: sacredWisdom?.columnsConfig });
            return trimmedPathsArray;
            break;
        default:
            break;
    }
    return true;
};

export default startFunc;