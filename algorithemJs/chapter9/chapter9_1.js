"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitytools_1 = require("./utilitytools");
function getMinNumFromArray(arrayInput) {
    if (arrayInput.length <= 0)
        throw new Error("Error input!");
    var nMin = arrayInput[0];
    for (var i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] < nMin) {
            nMin = arrayInput[i];
        }
    }
    return nMin;
}
function getMaxNumFromArray(arrayInput) {
    if (arrayInput.length <= 0)
        throw new Error("Error input!");
    var nMax = arrayInput[0];
    for (var i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] > nMax) {
            nMax = arrayInput[i];
        }
    }
    return nMax;
}
function getMinMaxFromArray(arrayInput) {
    if (arrayInput.length <= 0)
        throw new Error("Error input!");
    var resultTemp = {
        min: 0,
        max: 0
    };
    var nStartIndex = 0;
    if (arrayInput.length % 2 === 0) {
        nStartIndex = 2;
        if (arrayInput[0] < arrayInput[1]) {
            resultTemp.min = arrayInput[0];
            resultTemp.max = arrayInput[1];
        }
        else {
            resultTemp.min = arrayInput[1];
            resultTemp.max = arrayInput[0];
        }
    }
    else {
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
        }
        else {
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
// 算法导论第九章第一节习题1
/**
 * 思路，找到最小值，并记录其找最小值比较路径的路径，
 * 而 。找最小值的方式采用锦标赛的方式，也就是2个一组，小的
 * 晋级，最终次小值一定在最小值的比较路径上。
 * @param arrayInput
 */
function getSecondMinNum(arrayInput) {
    if (arrayInput.length < 2)
        throw new Error('Error Input!');
    var nStartIndex = arrayInput.length - 1;
    var arrayTemp = [];
    var arrayCompareIndex = [];
    for (var i = 0; i < arrayInput.length; ++i) {
        arrayTemp.push({
            num: arrayInput[i],
            index: i
        });
        arrayCompareIndex.push([]);
    }
    while (arrayTemp.length > 1) {
        var i = 0;
        var arrayHelp = [];
        for (i = 0; i < arrayTemp.length - 1; i += 2) {
            if (arrayTemp[i].num < arrayTemp[i + 1].num) {
                arrayHelp.push(arrayTemp[i]);
                arrayCompareIndex[arrayTemp[i].index].push(arrayTemp[i + 1].index);
            }
            else {
                arrayHelp.push(arrayTemp[i + 1]);
                arrayCompareIndex[arrayTemp[i + 1].index].push(arrayTemp[i].index);
            }
        }
        if (i === arrayTemp.length - 1) {
            arrayHelp.push(arrayTemp[i]);
        }
        arrayTemp = arrayHelp.concat();
    }
    var nMinIndex = arrayTemp[0].index;
    var nSecondMinIndex = arrayCompareIndex[nMinIndex][0];
    var nSecondMin = arrayInput[nSecondMinIndex];
    var arrayIndex = arrayCompareIndex[nMinIndex];
    for (var i = 0; i < arrayIndex.length; ++i) {
        if (nSecondMin > arrayInput[arrayIndex[i]]) {
            nSecondMinIndex = arrayIndex[i];
            nSecondMin = arrayInput[arrayIndex[i]];
        }
    }
    return {
        first: nMinIndex,
        second: nSecondMinIndex
    };
}
var TestCase_1 = (function () {
    function TestCase_1() {
    }
    TestCase_1.prototype.testCaseGetMinMax = function () {
        var arrayLen = utilitytools_1.default.generateRandom(10, 20);
        var arrayTestCase = utilitytools_1.default.generateRandomArray(1, 1000, arrayLen);
        console.log("origin number sequence is " + arrayTestCase);
        var nMin = getMinNumFromArray(arrayTestCase);
        var nMax = getMaxNumFromArray(arrayTestCase);
        var MinMaxPair = getMinMaxFromArray(arrayTestCase);
        var MinSecondPair = getSecondMinNum(arrayTestCase);
        var arrayTemp = arrayTestCase.concat();
        arrayTemp.sort(function (a, b) {
            return a - b;
        });
        console.log("min number is " + nMin + ", max number is " + nMax);
        console.log("minMaxpair is: ", MinMaxPair);
        console.log("minSecondPairIndex is", MinSecondPair);
        if (nMin === arrayTemp[0]) {
            console.log('testcase get min item success!');
        }
        else {
            console.log('testcase get min item failed!');
        }
        if (nMax === arrayTemp[arrayTemp.length - 1]) {
            console.log('testcase get max item success!');
        }
        else {
            console.log('testcase get max item failed');
        }
        if (MinMaxPair.max === arrayTemp[arrayTemp.length - 1] &&
            MinMaxPair.min === arrayTemp[0]) {
            console.log('testcase get minmax success!');
        }
        else {
            console.log('testcase get minmax failed!');
        }
        if (arrayTestCase[MinSecondPair.first] === arrayTemp[0] &&
            arrayTestCase[MinSecondPair.second] === arrayTemp[1]) {
            console.log('testcase get second max success');
        }
        else {
            console.log('testcase get seconde min failed!');
        }
    };
    return TestCase_1;
}());
var testCaseDefaut = new TestCase_1();
testCaseDefaut.testCaseGetMinMax();
