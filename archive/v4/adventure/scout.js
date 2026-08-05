import fs from "node:fs";
import path from "node:path";
import nodeFsRec from "node-fs-recursive";

function scoutTheRealmForTargetJsons({ realmPath, inFileNameToCompare }) {
    const allDiscoveries = fs.readdirSync(realmPath, { recursive: true });

    const targetGems = nodeFsRec({
        folderPath: realmPath,
        fileNameToFilter: inFileNameToCompare
    });

    // return targetGems.map(gem => path.join(realmPath, gem));
    return targetGems;
};

export { scoutTheRealmForTargetJsons };
