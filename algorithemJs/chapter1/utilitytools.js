"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandom(min, max) {
    var range = max - min;
    var randNum = Math.round(Math.random() * range) + min;
    return randNum;
}
function generateRandomArray(min, max, itemNum) {
    var ArrayRandom = [];
    for (var i = 0; i < itemNum; ++i) {
        ArrayRandom.push(generateRandom(min, max));
    }
    return ArrayRandom;
}
/**
 * 排序校验 不使用标准排序方法
 * @param ArrayInput
 * @param ArrayOutput
 */
function checkSequence(ArrayInput, ArrayOutput) {
    var objTemp = {};
    ArrayInput.forEach(function (value, index) {
        if (objTemp[value]) {
            ++objTemp[value];
        }
        else {
            objTemp[value] = 1;
        }
    });
    for (var i = 0; i < ArrayOutput.length; ++i) {
        if (objTemp[ArrayOutput[i]]) {
            objTemp[ArrayOutput[i]] = objTemp[ArrayOutput[i]] - 1;
        }
        else {
            return false;
        }
    }
    for (var key in objTemp) {
        if (objTemp[key] !== 0) {
            return false;
        }
    }
    // 检查是否从小到大
    for (var i = 0; i < ArrayOutput.length - 1; ++i) {
        if (ArrayOutput[i] > ArrayOutput[i + 1]) {
            console.log('!!!!!!333');
            return false;
        }
    }
    return true;
}
/**
 * 排序检测，使用标准排序准则
 * @param ArrayInput
 * @param ArrayOutput
 */
function checkSeqUseStdSort(ArrayInput, ArrayOutput) {
    if (ArrayInput.length !== ArrayOutput.length) {
        return false;
    }
    var ArrayToSort = ArrayInput.concat([]);
    ArrayToSort.sort(function (a, b) { return (a - b); });
    for (var i = 0; i < ArrayToSort.length; ++i) {
        if (ArrayToSort[i] !== ArrayOutput[i]) {
            return false;
        }
    }
    return true;
}
/**
 * 归并排序归并过程
 * @param ArrayInput
 * @param start
 * @param middle
 * @param end
 */
function merge(ArrayInput, start, middle, end) {
    var ArrayFirst = ArrayInput.slice(start, middle + 1);
    var ArraySecond = ArrayInput.slice(middle + 1, end + 1);
    var i = 0, j = 0, k = 0;
    for (; i < ArrayFirst.length && j < ArraySecond.length; ++k) {
        if (ArrayFirst[i] < ArraySecond[j]) {
            ArrayInput[start + k] = ArrayFirst[i];
            ++i;
        }
        else {
            ArrayInput[start + k] = ArraySecond[j];
            ++j;
        }
    }
    if (i < ArrayFirst.length) {
        for (; i < ArrayFirst.length; ++i) {
            ArrayInput[start + k] = ArrayFirst[i];
            ++k;
        }
    }
    if (j < ArraySecond.length) {
        for (; j < ArraySecond.length; ++j) {
            ArrayInput[start + k] = ArraySecond[j];
            ++k;
        }
    }
}
var utilityTools = {
    generateRandom: generateRandom,
    generateRandomArray: generateRandomArray,
    checkSequence: checkSequence,
    checkSeqUseStdSort: checkSeqUseStdSort,
    merge: merge
};
exports.default = utilityTools;
