import { scoutTheRealmForTargetJsons } from "./scout.js";

const fileNameToCompare = "end-points.js";

const startFunc = ({ toPath, inAction = "Crud" }) => {
    switch (inAction) {
        case "Crud":
            const hiddenGems = scoutTheRealmForTargetJsons({
                realmPath: toPath,
                inFileNameToCompare: fileNameToCompare
            });

            return hiddenGems;
            break;
        default:
            break;
    }
    return true;
};

export default startFunc;