"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 算法导论第一章的算法和习题js实现练习
 * 2017.11.11
 */
var utilitytools_1 = require("./utilitytools");
/**
 * 排序校验 不使用标准排序方法
 * @param ArrayInput
 * @param ArrayOutput
 */
function checkSequence(ArrayInput, ArrayOutput) {
    var objTemp = {};
    ArrayInput.forEach(function (value, indxe) {
        if (objTemp[value]) {
            ++objTemp[value];
        }
        else {
            objTemp[value] = 1;
        }
    });
    for (var i = 0; i < ArrayOutput.length - 1; ++i) {
        if (objTemp[ArrayOutput[i]]) {
            --objTemp[ArrayOutput[i]];
        }
        else {
            return false;
        }
    }
    for (var key in objTemp) {
        if (objTemp[key] !== 0) {
            return false;
        }
    }
    // 检查是否从小到大
    for (var i = 0; i < ArrayOutput.length - 1; ++i) {
        if (ArrayOutput[i] > ArrayOutput[i + 1]) {
            return false;
        }
    }
    return true;
}
/**
 * 排序检测，使用标准排序准则
 * @param ArrayInput
 * @param ArrayOutput
 */
function checkSeqUseStdSort(ArrayInput, ArrayOutput) {
    if (ArrayInput.length !== ArrayOutput.length) {
        return false;
    }
    var ArrayToSort = ArrayInput.concat([]);
    ArrayToSort.sort();
    for (var i = 0; i < ArrayToSort.length; ++i) {
        if (ArrayToSort[i] !== ArrayOutput[i]) {
            return false;
        }
    }
    return true;
}
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
 * 归并排序归并过程
 * @param ArrayInput
 * @param start
 * @param middle
 * @param end
 */
function merge(ArrayInput, start, middle, end) {
    var ArrayFirst = ArrayInput.slice(start, middle + 1);
    var ArraySecond = ArrayInput.slice(middle + 1, end + 1);
    var i = 0, j = 0, k = 0;
    for (; i < ArrayFirst.length && j < ArraySecond.length; ++k) {
        if (ArrayFirst[i] < ArraySecond[j]) {
            ArrayInput[start + k] = ArrayFirst[i];
            ++i;
        }
        else {
            ArrayInput[start + k] = ArraySecond[j];
            ++j;
        }
    }
    if (i < ArrayFirst.length) {
        for (; i < ArrayFirst.length; ++i) {
            ArrayInput[start + k] = ArrayFirst[i];
            ++k;
        }
    }
    if (j < ArraySecond.length) {
        for (; j < ArraySecond.length; ++j) {
            ArrayInput[start + k] = ArraySecond[j];
            ++k;
        }
    }
}
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
        merge(ArrayInput, start, middle, end);
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
/////
/////测试----------
console.log(insertSort([3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8]));
var ArrayMerge = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];
var ArrayMerge2 = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];
ArrayMerge2.sort(function (a, b) {
    return a - b;
});
console.log("standard sort " + ArrayMerge2);
var ArrayMerge3 = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];
insertSortRecursion(ArrayMerge3, ArrayMerge3.length - 1);
console.log("insert sort " + ArrayMerge3);
mergeSort(ArrayMerge, 0, ArrayMerge.length - 1);
console.log(ArrayMerge);
console.log('binarySearchIteration test', binarySearchIteration(ArrayMerge, 12));
console.log('binarySearchRecursion test', binarySearchRecursion(ArrayMerge, 12, 0, ArrayMerge.length - 1));
function testCaseInsertSort() {
    var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, 20);
    console.log("orgin sequence is " + ArrayTest);
    insertSort(ArrayTest);
    console.log("sequence sorted is " + ArrayTest);
}
