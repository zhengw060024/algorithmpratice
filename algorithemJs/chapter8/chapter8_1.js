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
function testnumIndexSort() {
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
}
testnumIndexSort();
