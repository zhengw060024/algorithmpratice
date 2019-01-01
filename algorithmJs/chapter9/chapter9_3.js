"use strict";
exports.__esModule = true;
var utilitytools_1 = require("./utilitytools");
/**
 *
 * @param arrayInput
 * @param begin
 * @param end
 */
function insertSort(arrayInput, begin, end) {
    for (var i = begin; i < end; ++i) {
        var j = i + 1;
        if (arrayInput[begin] > arrayInput[j]) {
            var nTemp = arrayInput[j];
            while (j > begin) {
                arrayInput[j] = arrayInput[j - 1];
                --j;
            }
            arrayInput[j] = nTemp;
        }
        else {
            var nTemp = arrayInput[j];
            while (arrayInput[j - 1] > nTemp) {
                arrayInput[j] = arrayInput[j - 1];
                --j;
            }
            arrayInput[j] = nTemp;
        }
    }
}
function checkArraySame(arrayInput, arrayTest) {
    if (arrayInput.length === arrayTest.length) {
        for (var i = 0; i < arrayTest.length; ++i) {
            if (arrayInput[i] !== arrayTest[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
var arrayToTest = utilitytools_1["default"].generateRandomArray(0, 10, 20);
var arrayToCheck = arrayToTest.concat();
insertSort(arrayToCheck, 0, 19);
console.log(arrayToCheck);
var checkResult = checkArraySame(arrayToTest.concat().sort(function (a, b) {
    return a - b;
}), arrayToCheck);
console.log(checkResult);
//线性时间的中位数查找算法
function findKItem(arrayInput, nIndex) {
}
