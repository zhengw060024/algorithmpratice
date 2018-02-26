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
// 练习7.1-2修改partition使得元素都相同时返回中间的id
// 思路同时从两端向中间推进。
// 这个需要注意边界条件！！！
function quickDepartMiddle(arrayInput, startIndex, endIndex) {
    var i = startIndex;
    var j = endIndex - 1;
    while (true) {
        // 找到第一个大于等于枢轴的数据就停下
        // 这里不用添加边界测试，因为枢轴数据就在最右侧。
        while (arrayInput[i] < arrayInput[endIndex]) {
            ++i;
        }
        // 找到第一个小于等于枢轴的数据
        // 注意，这里需要添加边界测试
        while (arrayInput[j] > arrayInput[endIndex] && j >= startIndex) {
            --j;
        }
        // 将i和endIndex对换
        if (!(i < j)) {
            var nTemp_2 = arrayInput[i];
            arrayInput[i] = arrayInput[endIndex];
            arrayInput[endIndex] = nTemp_2;
            return i;
        }
        var nTemp = arrayInput[i];
        arrayInput[i] = arrayInput[j];
        arrayInput[j] = nTemp;
        ++i;
        --j;
    }
}
// 这里使用新的depart函数做的快排
function quickSort2Imp(arrayInput, startIndex, endIndex) {
    if (startIndex < endIndex) {
        var middleIndex = quickDepartMiddle(arrayInput, startIndex, endIndex);
        quickSort2Imp(arrayInput, startIndex, middleIndex - 1);
        quickSort2Imp(arrayInput, middleIndex + 1, endIndex);
    }
}
function quickSort2(arrayInput) {
    quickSort2Imp(arrayInput, 0, arrayInput.length - 1);
}
// 习题7.1-4 以非递增方式排序
function quickSortByCmp(arrayInput, cmp) {
    quickSortByCmpImp(arrayInput, 0, arrayInput.length - 1, cmp);
}
function quickSortByCmpImp(arrayInput, startIndex, endIndex, cmp) {
    if (startIndex < endIndex) {
        var nMiddle = quickSortDepartByCmp(arrayInput, startIndex, endIndex, cmp);
        quickSortByCmpImp(arrayInput, startIndex, nMiddle - 1, cmp);
        quickSortByCmpImp(arrayInput, nMiddle + 1, endIndex, cmp);
    }
}
function quickSortDepartByCmp(arrayInput, startIndex, endIndex, cmp) {
    var i = startIndex;
    var j = endIndex - 1;
    while (true) {
        // 找到第一个大于等于枢轴的数据就停下
        // 这里不用添加边界测试，因为枢轴数据就在最右侧。
        while (cmp(arrayInput[i], arrayInput[endIndex])) {
            ++i;
        }
        // 找到第一个小于等于枢轴的数据
        // 注意，这里需要添加边界测试
        while (cmp(arrayInput[endIndex], arrayInput[j]) && j >= startIndex) {
            --j;
        }
        // 将i和endIndex对换
        if (!(i < j)) {
            var nTemp_3 = arrayInput[i];
            arrayInput[i] = arrayInput[endIndex];
            arrayInput[endIndex] = nTemp_3;
            return i;
        }
        var nTemp = arrayInput[i];
        arrayInput[i] = arrayInput[j];
        arrayInput[j] = nTemp;
        ++i;
        --j;
    }
}
// 
// 测试代码是否正确
var quickSortTest = /** @class */ (function () {
    function quickSortTest() {
    }
    // 算法导论中的quicksort测试验证
    quickSortTest.prototype.checkSortResult = function (arrayInput, arrayToCheck, cmpDefault) {
        if (cmpDefault === void 0) { cmpDefault = function (a, b) {
            return a - b;
        }; }
        // 检查排序后的数组是否合法
        var arraySortRight = arrayInput.concat().sort(cmpDefault);
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
    quickSortTest.prototype.testQSort2 = function () {
        var arrayNum = utilitytools_1.default.generateRandom(1, 1000);
        console.log("arrayNum is " + arrayNum);
        var arrayTest = utilitytools_1.default.generateRandomArray(1, 1000, arrayNum);
        console.log("array to sort is " + arrayTest);
        var arrayToSort = arrayTest.concat();
        quickSort2(arrayToSort);
        console.log("array quickSort2 quicksorted si " + arrayToSort);
        var testResult = this.checkSortResult(arrayTest, arrayToSort);
        if (testResult) {
            console.log('quicksort2 is right!!!');
        }
    };
    quickSortTest.prototype.testQSort3 = function () {
        var arrayNum = utilitytools_1.default.generateRandom(1, 1000);
        console.log("arrayNum is " + arrayNum);
        var arrayTest = utilitytools_1.default.generateRandomArray(1, 1000, arrayNum);
        console.log("array to sort is " + arrayTest);
        var arrayToSort = arrayTest.concat();
        quickSortByCmp(arrayToSort, function (a, b) {
            return a > b;
        });
        console.log("array quickSort3 quicksorted si " + arrayToSort);
        var testResult = this.checkSortResult(arrayTest, arrayToSort, function (a, b) {
            return b - a;
        });
        if (testResult) {
            console.log('quicksort3 is right!!!');
        }
    };
    return quickSortTest;
}());
var qSortTestCase = new quickSortTest();
qSortTestCase.testQSort1();
qSortTestCase.testQSort2();
qSortTestCase.testQSort3();
//const arrayTemp = utilityTools.generateRandomArray(1,12,utilityTools.generateRandom(10,30));
//console.log(`${arrayTemp}`);
//console.log(quickDepartMiddle(arrayTemp,0,arrayTemp.length - 1));
//console.log(`${arrayTemp}`);
// quickDepartMiddle(arrayTemp,0,arrayTemp.length - 1); 
