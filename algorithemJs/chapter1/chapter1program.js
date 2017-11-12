"use strict";
/**
 * 算法导论第一章的算法和习题js实现练习
 * 2017.11.11
 */
function generateRandomArray(min, max, itemNum) {
}
/**
 * 插入排序
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
function mergeSort(ArrayInput, start, end) {
    if (start < end) {
        var middle = Math.floor((start + end) / 2);
        mergeSort(ArrayInput, start, middle);
        mergeSort(ArrayInput, middle + 1, end);
        merge(ArrayInput, start, middle, end);
    }
    return ArrayInput;
}
console.log(insertSort([3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8]));
var ArrayMerge = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];
mergeSort(ArrayMerge, 0, ArrayMerge.length - 1);
console.log(ArrayMerge);
function testCaseInsertSort() {
}
