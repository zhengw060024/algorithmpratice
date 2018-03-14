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
var TestCase = /** @class */ (function () {
    function TestCase() {
    }
    TestCase.prototype.testDepart = function () {
        var ItemCount = utilitytools_1.default.generateRandom(5, 20);
        console.log('lenth is ', ItemCount);
        var arrayInput = utilitytools_1.default.generateRandomArray(1, 10, ItemCount);
        console.log("orgin array is " + arrayInput);
        var nReturnTuple = quickDepart(arrayInput, 0, arrayInput.length - 1);
        console.log("depart index is " + nReturnTuple + " ");
        console.log("departed array is " + arrayInput);
    };
    return TestCase;
}());
var testCaseItem = new TestCase();
testCaseItem.testDepart();
