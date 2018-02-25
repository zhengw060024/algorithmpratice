"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitytools_1 = require("./utilitytools");
// 算法导论第7章第一节
// 书中的快速排序实现ts
function quicksort(arrayInput) {
    quicksortImp(arrayInput, 0, arrayInput.length - 1);
}
function quicksortImp(arrayInput, startIndex, endIndex) {
    if (startIndex < endIndex) {
        var nMiddleIndex = quickDepartByEndIndex(arrayInput, startIndex, endIndex);
        quicksortImp(arrayInput, startIndex, nMiddleIndex - 1);
        quicksortImp(arrayInput, nMiddleIndex + 1, endIndex);
    }
}
// 以末尾元素作为分割元素
function quickDepartByEndIndex(arrayInput, startIndex, endIndex) {
    var i = startIndex;
    var j = startIndex;
    // const nTemp = arrayInput[endIndex];
    // i 表示第一个可能大于分割枢轴index（未校验）
    for (; j < endIndex; ++j) {
        if (arrayInput[j] < arrayInput[endIndex]) {
            // 交换 arrayInput[j] 和 arrayInput[i]
            var nTemp_1 = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = nTemp_1;
            ++i;
        }
    }
    var nTemp = arrayInput[i];
    arrayInput[i] = arrayInput[endIndex];
    arrayInput[endIndex] = nTemp;
    return i;
}
// 测试代码是否正确
var quickSortTest = /** @class */ (function () {
    function quickSortTest() {
    }
    // 算法导论中的quicksort测试验证
    quickSortTest.prototype.checkSortResult = function (arrayInput, arrayToCheck) {
        // 检查排序后的数组是否合法
        var arraySortRight = arrayInput.concat().sort(function (a, b) {
            return a - b;
        });
        if (arrayToCheck.length !== arraySortRight.length) {
            console.log('quick sort failed ,items number is not equal!!!');
            return false;
        }
        else {
            for (var i = 0; i < arrayToCheck.length; ++i) {
                if (arrayToCheck[i] !== arraySortRight[i]) {
                    console.log('quick sort failed!!!');
                    return false;
                }
            }
        }
        return true;
    };
    quickSortTest.prototype.testQSort1 = function () {
        var arrayNum = utilitytools_1.default.generateRandom(1, 1000);
        console.log("arrayNum is " + arrayNum);
        var arrayTest = utilitytools_1.default.generateRandomArray(1, 1000, arrayNum);
        console.log("array to sort is " + arrayTest);
        var arrayToSort = arrayTest.concat();
        quicksort(arrayToSort);
        console.log("array quicksorted si " + arrayToSort);
        var testResult = this.checkSortResult(arrayTest, arrayToSort);
        if (testResult) {
            console.log('quick sort is right!!!');
        }
    };
    return quickSortTest;
}());
var qSortTestCase = new quickSortTest();
qSortTestCase.testQSort1();
