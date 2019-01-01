"use strict";
exports.__esModule = true;
var utilitytools_1 = require("./utilitytools");
//#计数排序
function numIndexSort(arrayInput, nRangeMin, nRangeMax) {
    var arrayTemp = [];
    var arrayOut = [];
    var nRange = nRangeMax - nRangeMin + 1;
    for (var i = 0; i < nRange; ++i) {
        arrayTemp.push(0);
    }
    for (var i = 0; i < arrayInput.length; ++i) {
        arrayTemp[arrayInput[i] - nRangeMin] += 1;
    }
    for (var i = 0; i < nRange - 1; ++i) {
        arrayTemp[i + 1] += arrayTemp[i];
    }
    console.log("" + arrayTemp);
    for (var i = arrayInput.length; i >= 0; --i) {
        // arrayOut[i + 1] = arrayOut[i];
        arrayOut[arrayTemp[arrayInput[i] - nRangeMin] - 1] = arrayInput[i];
        arrayTemp[arrayInput[i] - nRangeMin] -= 1;
    }
    return arrayOut;
}
//基数排序：
function getArrayHelp(arrayInput, nRadix) {
    var arrayOut1 = [];
    var arrayOut2 = [];
    for (var i = 0; i < arrayInput.length; ++i) {
        var nTemp = Math.floor(arrayInput[i] / nRadix);
        arrayOut1.push(nTemp);
        arrayOut2.push(arrayInput[i] - nTemp * nRadix);
    }
    return [arrayOut1, arrayOut2];
}
function radixSort(arrayInput, nRadix, nD) {
    var arrayHelp = arrayInput.concat();
    for (var i = 0; i < nD; ++i) {
        var Temp = getArrayHelp(arrayHelp, nRadix);
        var arrayHead = Temp[0];
        var arrayTail = Temp[1];
        var arrayTemp2 = radixSortHelp(arrayInput, arrayHead, arrayTail, 0, nRadix - 1);
        arrayInput = arrayTemp2[0];
        arrayHelp = arrayTemp2[1];
    }
    return arrayInput;
}
function radixSortHelp(arrayInputTemp, arrayHelpSave, arrayInput, nRangeMin, nRangeMax) {
    var arrayTemp = [];
    var arrayOut = [];
    var nRange = nRangeMax - nRangeMin + 1;
    for (var i = 0; i < nRange; ++i) {
        arrayTemp.push(0);
    }
    for (var i = 0; i < arrayInput.length; ++i) {
        arrayTemp[arrayInput[i] - nRangeMin] += 1;
    }
    for (var i = 0; i < nRange - 1; ++i) {
        arrayTemp[i + 1] += arrayTemp[i];
    }
    console.log("" + arrayTemp);
    var arrayOut2 = [];
    for (var i = arrayInput.length; i >= 0; --i) {
        // arrayOut[i + 1] = arrayOut[i];
        arrayOut2[arrayTemp[arrayInput[i] - nRangeMin] - 1] = arrayHelpSave[i];
        arrayOut[arrayTemp[arrayInput[i] - nRangeMin] - 1] = arrayInputTemp[i];
        arrayTemp[arrayInput[i] - nRangeMin] -= 1;
    }
    return [arrayOut, arrayOut2];
}
var CommonSortTestCase = /** @class */ (function () {
    function CommonSortTestCase() {
    }
    CommonSortTestCase.prototype.testRadixSort = function () {
        var arrayInput = utilitytools_1["default"].generateRandomArray(1, 999, 20);
        console.log("" + arrayInput);
        var arraySorted = radixSort(arrayInput, 10, 3);
        console.log("" + arraySorted);
        this.checkSortRight(arraySorted, arrayInput);
    };
    CommonSortTestCase.prototype.testnumIndexSort = function () {
        var arrayInput = utilitytools_1["default"].generateRandomArray(10, 20, 100);
        console.log("" + arrayInput);
        var arrayOut = numIndexSort(arrayInput, 10, 20);
        var arrayCheck = arrayInput.concat().sort(function (a, b) {
            return a - b;
        });
        console.log("" + arrayOut);
        if (arrayCheck.length !== arrayOut.length) {
            console.log('sort failed!!!');
            return false;
        }
        else {
            for (var i = 0; i < arrayCheck.length; ++i) {
                if (arrayCheck[i] !== arrayOut[i]) {
                    console.log('sort failed!!!');
                    return false;
                }
            }
        }
        console.log('sort right!!');
        return true;
    };
    CommonSortTestCase.prototype.checkSortRight = function (arraySorted, arrayOgin) {
        var arrayToCheck = arrayOgin.concat().sort(function (a, b) {
            return a - b;
        });
        if (arraySorted.length !== arrayToCheck.length) {
            console.log('array sorted num is not right!');
            return false;
        }
        for (var i = 0; i < arraySorted.length; ++i) {
            if (arraySorted[i] !== arrayToCheck[i]) {
                console.log('array sorted error!!!');
                return false;
            }
        }
        console.log('array sort right!');
        return true;
    };
    return CommonSortTestCase;
}());
var testCase = new CommonSortTestCase();
testCase.testRadixSort();
// testnumIndexSort();
// testRadixSort(); 
