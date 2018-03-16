"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//这里的主要是思考题7.2 以及7.6，从本质上来说，其实他们算的上是同一个问题
// 思考题7.2考虑到含有相同元素的划分。
var utilitytools_1 = require("./utilitytools");
function quickDepart(arrayInput, nStartIndex, nEndIndex) {
    // 假设枢轴为nStartIndex
    var i = nStartIndex, j = nStartIndex + 1, k = nStartIndex;
    var nTemp = arrayInput[i];
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (arrayInput[j] < nTemp) {
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++k];
            ++i;
        }
        else if (arrayInput[j] === nTemp) {
            //arrayInput[k] = arrayInput[j];
            // arrayInput[k] = nTemp;
            arrayInput[j] = arrayInput[++k];
        }
    }
    for (var t = i; t <= k; ++t) {
        arrayInput[t] = nTemp;
    }
    return [i, k];
}
function quickDepartTemplate(arrayInput, nStartIndex, nEndIndex, cmp) {
    // 假设枢轴为nStartIndex
    var i = nStartIndex, j = nStartIndex + 1, k = nStartIndex;
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (cmp(arrayInput[j], arrayInput[i]) < 0) {
            var nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++k];
            arrayInput[k] = nTemp;
            ++i;
        }
        else if (cmp(arrayInput[j], arrayInput[i]) === 0) {
            var nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++k];
            arrayInput[k] = nTemp;
        }
    }
    return [i, k];
}
var TestCase = /** @class */ (function () {
    function TestCase() {
    }
    TestCase.prototype.testDepart = function () {
        var ItemCount = utilitytools_1.default.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        var arrayInput = utilitytools_1.default.generateRandomArray(1, 10, ItemCount);
        console.log("orgin array is " + arrayInput);
        var arrayToDepart = arrayInput.concat();
        var nReturnTuple = quickDepart(arrayToDepart, 0, arrayInput.length - 1);
        console.log("depart index is " + nReturnTuple + " ");
        console.log("departed array is " + arrayToDepart);
        var bCheckDepartSuccess = this.checkArrayDepartSuccess(arrayToDepart, arrayInput, nReturnTuple[0], nReturnTuple[1]);
        if (bCheckDepartSuccess) {
            console.log('check depart is success!!!');
        }
        else {
            console.log('check depart is error!!!');
        }
    };
    TestCase.prototype.testDepartTemplate = function () {
        var ItemCount = utilitytools_1.default.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        var arrayInput = utilitytools_1.default.generateRandomArray(1, 10, ItemCount);
        console.log("orgin array is " + arrayInput);
        var arrayToDepart = arrayInput.concat();
        var nReturnTuple = quickDepartTemplate(arrayToDepart, 0, arrayInput.length - 1, function (a, b) {
            return a - b;
        });
        console.log("depart index is " + nReturnTuple + " ");
        console.log("departed array is " + arrayToDepart);
        var bCheckDepartSuccess = this.checkArrayDepartSuccess(arrayToDepart, arrayInput, nReturnTuple[0], nReturnTuple[1]);
        if (bCheckDepartSuccess) {
            console.log('check depart is success!!!');
        }
        else {
            console.log('check depart is error!!!');
        }
    };
    TestCase.prototype.checkArrayDepartSuccess = function (arrayInput, arrayOrgin, rangeSameStart, rangeSameEnd) {
        if (arrayInput.length !== arrayOrgin.length) {
            return false;
        }
        for (var i = 0; i < rangeSameStart; ++i) {
            if (arrayInput[i] >= arrayInput[rangeSameStart]) {
                return false;
            }
        }
        for (var j = rangeSameEnd + 1; j < arrayInput.length; ++j) {
            if (arrayInput[j] <= arrayInput[rangeSameEnd]) {
                return false;
            }
        }
        for (var i = rangeSameStart; i <= rangeSameEnd; ++i) {
            if (arrayInput[i] != arrayInput[rangeSameStart]) {
                return false;
            }
        }
        var arrayInputTemp = arrayInput.sort(function (a, b) {
            return a - b;
        });
        var arrayOrginTemp = arrayInput.sort(function (a, b) {
            return a - b;
        });
        for (var i = 0; i < arrayInputTemp.length; ++i) {
            if (arrayInputTemp[i] !== arrayOrginTemp[i]) {
                return false;
            }
        }
        return true;
    };
    return TestCase;
}());
var testCaseItem = new TestCase();
testCaseItem.testDepartTemplate();
