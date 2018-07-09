function getMinNumFromArray(arrayInput: Array<number>) {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    let nMin = arrayInput[0];
    for (let i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] < nMin) {
            nMin = arrayInput[i];
        }
    }
}
function getMaxNumFromArray(arrayInput: Array<number>) {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    let nMax = arrayInput[0];
    for (let i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] > nMax) {
            nMax = arrayInput[i];
        }
    }
}
interface MinMaxPair {
    min: number;
    max: number;
}
function getMinMaxFromArray(arrayInput: Array<number>): MinMaxPair {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    const resultTemp: MinMaxPair = {
        min: 0,
        max: 0
    }
    let nStartIndex = 0;
    if (arrayInput.length % 2 === 0) {
        nStartIndex = 2;
        if (arrayInput[0] < arrayInput[1]) {
            resultTemp.min = arrayInput[0];
            resultTemp.max = arrayInput[1];
        } else {
            resultTemp.min = arrayInput[1];
            resultTemp.max = arrayInput[0];
        }
    } else {
        resultTemp.min = arrayInput[0];
        resultTemp.max = arrayInput[0];
        nStartIndex = 1;
    }
    for (; nStartIndex < arrayInput.length;) {
        if (arrayInput[nStartIndex] < arrayInput[nStartIndex + 1]) {
            if (resultTemp.max < arrayInput[nStartIndex + 1]) {
                resultTemp.max = arrayInput[nStartIndex + 1];
            }
            if (resultTemp.min > arrayInput[nStartIndex]) {
                resultTemp.min = arrayInput[nStartIndex];
            }
        } else {
            if (resultTemp.min > arrayInput[nStartIndex + 1]) {
                resultTemp.min = arrayInput[nStartIndex + 1];
            }
            if (resultTemp.max < arrayInput[nStartIndex]) {
                resultTemp.max = arrayInput[nStartIndex];
            }
        }
        nStartIndex += 2;
    }
    return resultTemp;
}