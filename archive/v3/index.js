import { scoutTheRealmForTargetJsons } from "./adventure/scout.js";
import { transmuteGemsWithWisdom } from "./adventure/blacksmith.js";
import trimPaths from "./adventure/trimPaths.js";

const fileNameToCompare = "end-points.js";

const startFunc = ({ toPath, sacredWisdom, inAction = "Crud", inTargetPath }) => {
    switch (inAction) {
        case "Crud":
            const hiddenGems = scoutTheRealmForTargetJsons({
                realmPath: toPath,
                inFileNameToCompare: fileNameToCompare
            });

            const trimmedPathsArray = trimPaths({
                inPathsArray: hiddenGems,
                inTargetPath, inFileNameToCompare: fileNameToCompare
            });
            console.log("aaaaaaaa : ", trimmedPathsArray, hiddenGems);

            // transmuteGemsWithWisdom({ gems: hiddenGems, wisdom: sacredWisdom?.columnsConfig });

            break;
        default:
            break;
    }
    return true;
};

export default startFunc;