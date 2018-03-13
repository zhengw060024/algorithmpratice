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
    // 快速排序优化测试，在js代码中计时其实是没有意义的，有空写个c的代码来比较下实际运行速度。
    quickSortTest.prototype.testQSort4 = function () {
        var arrayNum = utilitytools_1.default.generateRandom(12000, 15000);
        console.log("arrayNum is " + arrayNum);
        var arrayTest = utilitytools_1.default.generateRandomArray(1, 1000, arrayNum);
        console.log("array to sort is " + arrayTest);
        var arrayTemp2 = arrayTest.concat();
        console.time('zhengwei2');
        arrayTemp2.sort(function (a, b) {
            return b - a;
        });
        console.timeEnd('zhengwei2');
        var arrayToSort = arrayTest.concat();
        console.time('zhengwei');
        quickSort123(arrayToSort, function (a, b) {
            return a > b;
        });
        console.timeEnd('zhengwei');
        // console.log(`array quickSort3 quicksorted is ${arrayToSort}`);
        // console.log(`array quickSort3 quicksorted si ${arrayTemp2}`);
        var testResult = this.checkSortResult(arrayTest, arrayToSort, function (a, b) {
            return b - a;
        });
        if (testResult) {
            console.log('quicksort123 is right!!!');
        }
    };
    // 测试intro排序，其实在js代码中计时是没有什么意义的，有空的时候可以写一个c++的代码来测试。
    quickSortTest.prototype.testQSort5 = function () {
        var arrayNum = utilitytools_1.default.generateRandom(12000, 15000);
        console.log("arrayNum is " + arrayNum);
        var arrayTest = utilitytools_1.default.generateRandomArray(1, 1000, arrayNum);
        console.log("array to sort is " + arrayTest);
        var cmpTemp = function (a, b) {
            return a > b;
        };
        var arrayToSort2 = arrayTest.concat();
        console.time('zhengwei');
        quickSort123(arrayToSort2, cmpTemp);
        console.timeEnd('zhengwei');
        var arrayToSort = arrayTest.concat();
        console.log('zhengwei test');
        console.time('zhengwei3');
        introsort(arrayToSort, cmpTemp);
        console.timeEnd('zhengwei3');
        // console.log(`array quickSort3 quicksorted si ${arrayToSort}`);
        // console.log(`array quickSort3 quicksorted si ${arrayTemp2}`);
        var testResult = this.checkSortResult(arrayTest, arrayToSort, function (a, b) {
            return b - a;
        });
        if (testResult) {
            console.log('introsort is right!!!');
        }
    };
    quickSortTest.prototype.runTestCase = function () {
        this.testQSort1();
        this.testQSort2();
        this.testQSort3();
        this.testQSort4();
        this.testQSort5();
    };
    return quickSortTest;
}());
// 关于快速排序的一些优化
// 1:当快速排序将整个待排序数组排序到近似有序时，使用插入排序方法将整个数组重新排序。
// 2: 对快速排序做尾递归优化，可以减少内存和函数递归调用堆栈操作。
// 3: 使用三点取中法取中值，即取头尾中央三个位置的中间的中值作为枢轴。
// 4: 使用内省式排序，当分割行为有恶化为二次的倾向时，转而采用heapsort （introsort采用的就是这种方式）
// 一些通用的辅助函数
// 最短分割长度
var CONST_MIN_DEPARTLEN = 16;
// 插入排序：这里有个小优化，首先判断首节点是否比待插入的节点小，如果
// 比首节点大就直接插入，否则不需要判断是否需要越界。
function insertSortImp(arrayInput, startIndex, endIndex, cmp) {
    if (startIndex === endIndex) {
        return;
    }
    for (var i = startIndex + 1; i <= endIndex; ++i) {
        var nTemp = arrayInput[i];
        if (cmp(nTemp, arrayInput[startIndex])) {
            for (var j = i; j > startIndex; --j) {
                arrayInput[j] = arrayInput[j - 1];
            }
            arrayInput[startIndex] = nTemp;
        }
        else {
            // 这样处理可以减少一次对j有效性的判断
            var j = i - 1;
            while (cmp(nTemp, arrayInput[j])) {
                arrayInput[j + 1] = arrayInput[j];
                --j;
            }
            arrayInput[j + 1] = nTemp;
        }
    }
}
function insertSortUnguard(arrayInput, startIndex, endIndex, cmp) {
    for (var i = startIndex + 1; i <= endIndex; ++i) {
        var nTemp = arrayInput[i];
        // 这样处理可以减少一次对j有效性的判断
        var j = i - 1;
        while (cmp(nTemp, arrayInput[j])) {
            arrayInput[j + 1] = arrayInput[j];
            --j;
        }
        arrayInput[j + 1] = nTemp;
    }
}
function insertLineSortFinal(arrayInput, startIndex, endIndex, cmp) {
    // console.log(`array input is ${arrayInput}`);
    if (endIndex - startIndex + 1 > CONST_MIN_DEPARTLEN) {
        insertSortImp(arrayInput, startIndex, startIndex + CONST_MIN_DEPARTLEN - 1, cmp);
        // 这里注意下，需要从 startIndex 到endIndex，而不是[ startIndex + CONST_MIN_DEPARTLEN,endIndex]
        insertSortUnguard(arrayInput, startIndex, endIndex, cmp);
    }
    else {
        insertSortImp(arrayInput, startIndex, endIndex, cmp);
    }
}
function getMidItem(a, b, c) {
    if (a < b) {
        if (c < a) {
            return a;
        }
        else if (c < b) {
            return c;
        }
        else {
            return b;
        }
    }
    else {
        if (c < b) {
            return b;
        }
        else if (c < a) {
            return c;
        }
        else {
            return a;
        }
    }
}
//假设返回值为nIndex，则[startIndex, nIndex- 1] 均小于[nIndex,endIndex]
function quickSortDepartNoMidIndex(arrayInput, startIndex, endIndex, cmp) {
    var nTemp = 0;
    var midIndex = Math.floor((startIndex + endIndex) / 2);
    nTemp = getMidItem(arrayInput[startIndex], arrayInput[midIndex], arrayInput[endIndex]);
    // if (arrayInput[startIndex] < arrayInput[endIndex]) {
    //     if (midIndex < arrayInput[startIndex]) {
    //     }
    // } else {
    // }
    // console.log('depart num is :',nTemp);
    var i = startIndex;
    var j = endIndex;
    while (true) {
        while (cmp(arrayInput[i], nTemp)) {
            ++i;
        }
        ;
        while (cmp(nTemp, arrayInput[j])) {
            --j;
        }
        ;
        if (i < j) {
            var nTempChange = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = nTempChange;
            ++i;
            --j;
        }
        else {
            return i;
        }
    }
}
// 使用1，2,3条来优化
function quicksortBetterImp(arrayInput, startIndex, endIndex, cmp) {
    while (endIndex - startIndex >= CONST_MIN_DEPARTLEN) {
        var nDepartIndex = quickSortDepartNoMidIndex(arrayInput, startIndex, endIndex, cmp);
        // console.log('zhengwei test!!',nDepartIndex,startIndex,endIndex);
        // console.log(`array output is ${arrayInput}`);
        // 对较短端进行递归处理
        if (nDepartIndex - startIndex - 1 > endIndex - nDepartIndex) {
            quicksortBetterImp(arrayInput, nDepartIndex, endIndex, cmp);
            // 这里注意不能是 endIndex = nDepartIndex！！！
            endIndex = nDepartIndex - 1;
        }
        else {
            //  // 这里注意这里是nDepartIndex - 1
            quicksortBetterImp(arrayInput, startIndex, nDepartIndex - 1, cmp);
            startIndex = nDepartIndex;
        }
    }
}
function quickSort123(arrayInput, cmp) {
    if (cmp === void 0) { cmp = function (a, b) {
        return a < b;
    }; }
    if (arrayInput.length > 0) {
        quicksortBetterImp(arrayInput, 0, arrayInput.length - 1, cmp);
        // console.log('zhengwei test!!');
        insertLineSortFinal(arrayInput, 0, arrayInput.length - 1, cmp);
    }
}
// 获取最大的k使得2的k次幂小于n
function getMaxK(n) {
    var k = 0;
    var nTemp = 2;
    do {
        k++;
        nTemp *= nTemp;
    } while (nTemp <= n);
    return k;
}
// heapsort堆排序，对序列从nStart和nEnd进行堆排序
function heapSortImp(arrayInput, nStart, nEnd, cmp) {
    makeHeap(arrayInput, nStart, nEnd, cmp);
    while (nStart < nEnd) {
        var nTemp = arrayInput[nEnd];
        arrayInput[nEnd] = arrayInput[nStart];
        arrayInput[nStart] = nTemp;
        ajustHeap(arrayInput, nStart, --nEnd, cmp);
    }
}
// 对序列nStart 到nEnd创建堆，实际从（nEnd - 1） / 2 开始调整堆
function makeHeap(arrayInput, nStart, nEnd, cmp) {
    var nAjustStart = Math.floor((nEnd - 1) / 2);
    for (var i = nAjustStart; i >= nStart; --i) {
        ajustHeap(arrayInput, nStart, nEnd, cmp);
    }
}
function ajustHeap(arrayInput, nStart, nEnd, cmp) {
    var nTemp = arrayInput[nStart];
    while (nStart < nEnd) {
        var nLeft = nStart * 2 + 1;
        var nRight = nEnd * 2 + 2;
        // 其实这个判断是没有必要的，对于在makeHeap中调用这个函数
        if (nLeft > nEnd) {
            break;
        }
        //////////////////////////
        var nMaxIndex = nLeft;
        // 这里防止越界，先比较左右节点，用左右节点的最大值和父节点比较
        if (nRight <= nEnd) {
            if (cmp(arrayInput[nLeft], arrayInput[nRight])) {
                nMaxIndex = nRight;
            }
        }
        if (cmp(nTemp, arrayInput[nMaxIndex])) {
            arrayInput[nStart] = arrayInput[nMaxIndex];
            nStart = nMaxIndex;
        }
        else {
            break;
        }
    }
    arrayInput[nStart] = nTemp;
}
// introsort排序
function introsort(arrayInput, cmp) {
    if (cmp === void 0) { cmp = function (a, b) {
        return a < b;
    }; }
    if (arrayInput.length > 1) {
        introsortLoop(arrayInput, 0, arrayInput.length - 1, 4 * getMaxK(arrayInput.length), cmp);
        insertLineSortFinal(arrayInput, 0, arrayInput.length - 1, cmp);
    }
}
function introsortLoop(arrayInput, nStartIndex, nEndIndex, nMaxDepartNum, cmp) {
    while (nEndIndex - nStartIndex >= CONST_MIN_DEPARTLEN) {
        if (nMaxDepartNum === 0) {
            // 这里可以使用一个策略，当元素个数大于某个限制时使用堆排序，否则使用插入排序
            // 这个参数取决于普通排序和堆排序速度对比峰值。
            if (nEndIndex - nStartIndex > 128) {
                heapSortImp(arrayInput, nStartIndex, nEndIndex, cmp);
                // console.log('分割恶化使用堆',nEndIndex - nStartIndex);
            }
            else {
                insertSortImp(arrayInput, nStartIndex, nEndIndex, cmp);
            }
            // ++nCountFengeEhua;
            return;
        }
        --nMaxDepartNum;
        var nMidIndex = quickSortDepartNoMidIndex(arrayInput, nStartIndex, nEndIndex, cmp);
        // 对较小段端进行递归，这里必须特别注意边界条件
        if (nMidIndex - 1 - nStartIndex > nEndIndex - nMidIndex) {
            introsortLoop(arrayInput, nMidIndex, nEndIndex, nMaxDepartNum, cmp);
            nEndIndex = nMidIndex - 1;
        }
        else {
            // 注意边界条件
            introsortLoop(arrayInput, nStartIndex, nMidIndex - 1, nMaxDepartNum, cmp);
            nStartIndex = nMidIndex;
        }
    }
}
var nCountFengeEhua = 0;
var qSortTestCase = new quickSortTest();
// qSortTestCase.testQSort1();
// qSortTestCase.testQSort2();
// qSortTestCase.testQSort3();
// qSortTestCase.testQSort4();
// qSortTestCase.testQSort5();
// console.log(nCountFengeEhua);
// console.log(getMidItem(1, 5, 7));
// console.log(getMidItem(5, 1, 7));
// console.log(getMidItem(12, 4, 7));
exports.default = qSortTestCase;
//const arrayTemp = utilityTools.generateRandomArray(1,12,utilityTools.generateRandom(10,30));
//console.log(`${arrayTemp}`);
//console.log(quickDepartMiddle(arrayTemp,0,arrayTemp.length - 1));
//console.log(`${arrayTemp}`);
// quickDepartMiddle(arrayTemp,0,arrayTemp.length - 1); 
