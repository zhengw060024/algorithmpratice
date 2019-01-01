"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 算法导论第一章的算法和习题js实现练习
 * 2017.11.11
 */
var utilitytools_1 = require("./utilitytools");
var sortProgramTest = /** @class */ (function () {
    function sortProgramTest() {
    }
    sortProgramTest.prototype.runTest = function () {
        testCaseBinarySearch();
        testCaseInsertSort();
        testCaseInsertSortRecur();
        testCaseMergeSort();
        testCaseSumSearch();
    };
    return sortProgramTest;
}());
var sortProgramRunTest = new sortProgramTest();
exports.default = sortProgramRunTest;
///////////////////////////////////////////////////////////////////
////////////插入排序
///////////////////////////////////////////////////////////////////
/**
 * 插入排序非递归
 * @param ArrayInput
 */
function insertSort(ArrayInput) {
    for (var i = 1; i < ArrayInput.length; ++i) {
        var keyNum = ArrayInput[i];
        var j = i - 1;
        for (; j >= 0; --j) {
            if (ArrayInput[j] > keyNum) {
                ArrayInput[j + 1] = ArrayInput[j];
            }
            else {
                break;
            }
        }
        ArrayInput[j + 1] = keyNum;
    }
    return ArrayInput;
}
/**
 * 插入排序递归
 * @param ArrayInput
 * @param nNumToSort 要排序的的最后一个关键字的index
 */
function insertSortRecursion(ArrayInput, nNumToSort) {
    if (nNumToSort === 0) {
        return;
    }
    insertSortRecursion(ArrayInput, nNumToSort - 1);
    var keyItem = ArrayInput[nNumToSort];
    var i = nNumToSort - 1;
    for (; i >= 0; --i) {
        if (ArrayInput[i] > keyItem) {
            ArrayInput[i + 1] = ArrayInput[i];
        }
        else {
            break;
        }
    }
    ArrayInput[i + 1] = keyItem;
}
//////////////////////////////////////////////////////////
////////////归并排序
//////////////////////////////////////////////////////////
/**
 * 归并排序
 * @param ArrayInput
 * @param start
 * @param end
 */
function mergeSort(ArrayInput, start, end) {
    if (start < end) {
        var middle = Math.floor((start + end) / 2);
        mergeSort(ArrayInput, start, middle);
        mergeSort(ArrayInput, middle + 1, end);
        utilitytools_1.default.merge(ArrayInput, start, middle, end);
    }
    return ArrayInput;
}
////////////////////////////////////////////////////////
//////// 二分查找法 
////////////////////////////////////////////////////////
/**
 * 二分查找法迭代
 * @param ArraySorted
 * @param NumToSearch
 */
function binarySearchIteration(ArraySorted, NumToSearch) {
    var nStart = 0;
    var nEnd = ArraySorted.length - 1;
    while (nStart < nEnd) {
        var nMiddle = Math.floor((nEnd + nStart) / 2);
        if (ArraySorted[nMiddle] === NumToSearch) {
            return nMiddle;
        }
        if (ArraySorted[nMiddle] < NumToSearch) {
            nStart = nMiddle + 1;
        }
        else {
            nEnd = nMiddle - 1;
        }
    }
    if (nStart === nEnd) {
        if (ArraySorted[nStart] === NumToSearch) {
            return nStart;
        }
    }
    return -1;
}
function binarySearchRecursion(ArraySorted, NumberSearch, nStartIndex, nEndIndex) {
    if (nStartIndex < nEndIndex) {
        var nMiddle = Math.floor((nEndIndex + nStartIndex) / 2);
        if (ArraySorted[nMiddle] === NumberSearch) {
            return nMiddle;
        }
        if (ArraySorted[nMiddle] > NumberSearch) {
            return binarySearchRecursion(ArraySorted, NumberSearch, nStartIndex, nMiddle - 1);
        }
        else {
            return binarySearchRecursion(ArraySorted, NumberSearch, nMiddle + 1, nEndIndex);
        }
    }
    else if (nStartIndex === nEndIndex) {
        if (NumberSearch === ArraySorted[nStartIndex]) {
            return nStartIndex;
        }
        return -1;
    }
    else {
        return -1;
    }
}
function testCaseBinarySearch() {
    var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, 20);
    console.log("testCaseBinarySearch Orgin ArrayTest = " + ArrayTest);
    ArrayTest.sort(function (value1, value2) {
        return value1 - value2;
    });
    console.log("testCaseBinarySearch sorted ArrayTest = " + ArrayTest);
    var testNum = utilitytools_1.default.generateRandom(1, 100);
    var index1 = binarySearchIteration(ArrayTest, testNum);
    var index2 = binarySearchRecursion(ArrayTest, testNum, 0, ArrayTest.length - 1);
    var bErr1 = false;
    var bErr2 = false;
    if (index1 === -1) {
        for (var i = 0; i < ArrayTest.length - 1; ++i) {
            if (ArrayTest[i] === testNum) {
                bErr1 = true;
                break;
            }
        }
    }
    else {
        if (ArrayTest[index1] !== testNum) {
            bErr1 = true;
        }
    }
    if (bErr1) {
        console.log('testCaseBinarySearch  binarySearchIteration error!!!!!!');
    }
    else {
        console.log('testCaseBinarySearch  binarySearchIteration success!!!!!!');
    }
    if (index2 === -1) {
        for (var i = 0; i < ArrayTest.length - 1; ++i) {
            if (ArrayTest[i] === testNum) {
                bErr2 = true;
                break;
            }
        }
    }
    else {
        if (ArrayTest[index2] !== testNum) {
            bErr2 = true;
        }
    }
    if (bErr2) {
        console.log('testCaseBinarySearch  binarySearchIteration error!!!!!!');
    }
    else {
        console.log('testCaseBinarySearch  binarySearchIteration success!!!!!!');
    }
}
////////////////////////////////////////////////////////////////
//////////习题2.3.7在n个整数集合中判断是否有两个数之和等于x的元素
////////////////////////////////////////////////////////////////
///////对于这个问题假设输入序列为a[1-n],则通过min(a[n]) + max(a[n]) 和x的比较
//////如果大于x则排除max(a[n])，如果小于x则排除min(a[n])，只要能序列化的测试
/////排除过数据数组的最大和最小序列对即可。二最方便的测试是将该序列排序，然后测试
//////最大最小，不断排除。算法是o(n) + n*lg(n),至于有没有更好的算法，关键还是在于
//////怎样组织出最大最小测试序列对。
function checkArraySum(ArrayInput, sumX) {
    mergeSort(ArrayInput, 0, ArrayInput.length - 1);
    console.log('sorted array is', ArrayInput);
    var i = 0, j = ArrayInput.length - 1;
    var temp = 0;
    while (i < j) {
        temp = ArrayInput[i] + ArrayInput[j];
        if (temp < sumX) {
            // 排除a[i],如果有a[i] 则其他任何一个a[k](k < j,a[k] < a[j]),
            // a[i] + a[k] < a[i] + a[j] < sumX
            ++i;
        }
        else if (temp > sumX) {
            --j;
        }
        else {
            return {
                minIndex: i,
                maxIndex: j,
                firstNum: ArrayInput[i],
                secondNum: ArrayInput[j]
            };
        }
    }
    return {
        minIndex: -1,
        maxIndex: -1,
        firstNum: 0,
        secondNum: 0
    };
}
//////////////////////////////////////////////
///////暴搜寻找
//////////////////////////////////////////////
function checkArraySumBrute(ArrayInput, sumX) {
    for (var i = 0; i < ArrayInput.length - 1; ++i) {
        for (var j = i + 1; j < ArrayInput.length - 1; ++j) {
            if (ArrayInput[i] + ArrayInput[j] === sumX) {
                return {
                    minIndex: i,
                    maxIndex: j,
                    firstNum: ArrayInput[i],
                    secondNum: ArrayInput[j]
                };
            }
        }
    }
    return {
        minIndex: -1,
        maxIndex: -1,
        firstNum: 0,
        secondNum: 0
    };
}
function testCaseSumSearch() {
    var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, 20);
    console.log("testCaseSum Orgin ArrayTest = " + ArrayTest);
    var testSum = utilitytools_1.default.generateRandom(1, 200);
    var result = checkArraySum(ArrayTest.concat([]), testSum);
    console.log('testCaseSumSearch  get', result, testSum);
    if (result.minIndex !== -1) {
        var bResult = result.firstNum + result.secondNum === testSum;
        console.log("checkArraySum is " + bResult);
    }
    else {
        var result2 = checkArraySumBrute(ArrayTest, testSum);
        if (result2.maxIndex !== -1) {
            console.log('checkArraySum is false');
        }
        else {
            console.log('checkArraySum is true');
        }
    }
}
/////排序测试----------
function testCaseInsertSort() {
    var sortNum = utilitytools_1.default.generateRandom(20, 70);
    var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
    var ArrayToSort = ArrayTest.concat([]);
    console.log("orgin sequence is " + ArrayToSort);
    insertSort(ArrayToSort);
    console.log("sequence sorted is " + ArrayToSort);
    //utilityTools.checkSequence(ArrayTest, ArrayToSort);
    console.log('insertsort  testcase is ', utilitytools_1.default.checkSequence(ArrayTest, ArrayToSort));
}
function testCaseInsertSortRecur() {
    var sortNum = utilitytools_1.default.generateRandom(20, 70);
    var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
    var ArrayToSort = ArrayTest.concat([]);
    console.log("orgin sequence is " + ArrayToSort);
    insertSortRecursion(ArrayToSort, ArrayToSort.length - 1);
    console.log("sequence sorted is " + ArrayToSort);
    //utilityTools.checkSequence(ArrayTest, ArrayToSort);
    console.log('InsertSortRecur  testcase is ', utilitytools_1.default.checkSequence(ArrayTest, ArrayToSort));
}
function testCaseMergeSort() {
    var sortNum = utilitytools_1.default.generateRandom(20, 70);
    var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
    var ArrayToSort = ArrayTest.concat([]);
    console.log("orgin sequence is " + ArrayToSort);
    mergeSort(ArrayToSort, 0, ArrayToSort.length - 1);
    console.log("sequence sorted is " + ArrayToSort);
    //utilityTools.checkSequence(ArrayTest, ArrayToSort);
    console.log('mergesort  testcase is ', utilitytools_1.default.checkSequence(ArrayTest, ArrayToSort));
}
