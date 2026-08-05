
function startFunc({ inPathsArray, inTargetPath, inFileNameToCompare }) {
    const trimmedPathsArray = inPathsArray.map(element => {
        return element.replace(inTargetPath, "").replace(/\\/g, "/").replace(`/${inFileNameToCompare}`, "");
    });

    return trimmedPathsArray;
}

export default startFunc;
