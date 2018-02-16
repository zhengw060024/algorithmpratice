"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitytools_1 = require("./utilitytools");
function ajustMaxHeapRecur(indexStart, arrayHeap) {
    var leftChild = indexStart * 2 + 1;
    var rightChild = indexStart * 2 + 2;
    if (leftChild > arrayHeap.length - 1) {
        return;
    }
    var nNextIndex = leftChild;
    if (rightChild < arrayHeap.length) {
        if (arrayHeap[rightChild] > arrayHeap[leftChild]) {
            nNextIndex = rightChild;
        }
    }
    if (arrayHeap[indexStart] < arrayHeap[nNextIndex]) {
        var temp = arrayHeap[indexStart];
        arrayHeap[indexStart] = arrayHeap[nNextIndex];
        arrayHeap[nNextIndex] = temp;
        ajustMaxHeapRecur(nNextIndex, arrayHeap);
    }
}
function makeMaxHeapRecur(arrayInput) {
    var nStart = Math.floor((arrayInput.length - 2) / 2);
    for (var index = nStart; index >= 0; --index) {
        ajustMaxHeapRecur(index, arrayInput);
    }
}
function ajustMaxHeapNoRecur(indexStart, arrayHeap) {
    while (indexStart < arrayHeap.length) {
        var leftChild = indexStart * 2 + 1;
        var rightChild = indexStart * 2 + 2;
        if (leftChild > arrayHeap.length - 1) {
            return;
        }
        var nNextIndex = leftChild;
        if (rightChild < arrayHeap.length) {
            if (arrayHeap[rightChild] > arrayHeap[leftChild]) {
                nNextIndex = rightChild;
            }
        }
        if (arrayHeap[indexStart] < arrayHeap[nNextIndex]) {
            var temp = arrayHeap[indexStart];
            arrayHeap[indexStart] = arrayHeap[nNextIndex];
            arrayHeap[nNextIndex] = temp;
            indexStart = nNextIndex;
        }
        else {
            return;
        }
    }
}
function makeMaxHeapNoRecur(arrayInput) {
    var nStart = Math.floor((arrayInput.length - 2) / 2);
    for (var index = nStart; index >= 0; --index) {
        ajustMaxHeapNoRecur(index, arrayInput);
    }
}
function checkArrayMinHeap(arrayInput) {
    var indexCheckEnd = Math.floor(arrayInput.length / 2);
    var i = 0;
    for (var i_1 = 0; i_1 < indexCheckEnd - 1; ++i_1) {
        if (!(arrayInput[i_1] <= arrayInput[2 * i_1 + 1]
            && arrayInput[i_1] <= arrayInput[2 * i_1 + 2])) {
            return false;
        }
    }
    if (indexCheckEnd - 1 >= 0) {
        if (indexCheckEnd * 2 < arrayInput.length) {
            if (arrayInput[indexCheckEnd - 1] > arrayInput[indexCheckEnd * 2]) {
                return false;
            }
        }
        if (arrayInput[indexCheckEnd - 1] > arrayInput[indexCheckEnd * 2 - 1]) {
            return false;
        }
    }
    return true;
}
function checkArrayMaxHeap(arrayInput) {
    var indexCheckEnd = Math.floor(arrayInput.length / 2);
    var i = 0;
    for (var i_2 = 0; i_2 < indexCheckEnd - 1; ++i_2) {
        if (!(arrayInput[i_2] >= arrayInput[2 * i_2 + 1]
            && arrayInput[i_2] >= arrayInput[2 * i_2 + 2])) {
            return false;
        }
    }
    if (indexCheckEnd - 1 >= 0) {
        if (indexCheckEnd * 2 < arrayInput.length) {
            if (arrayInput[indexCheckEnd - 1] < arrayInput[indexCheckEnd * 2]) {
                return false;
            }
        }
        if (arrayInput[indexCheckEnd - 1] < arrayInput[indexCheckEnd * 2 - 1]) {
            return false;
        }
    }
    return true;
}
function ajustMaxHeapForSort(indexStart, arrayHeap, endIndex) {
    while (indexStart < endIndex + 1) {
        var leftChild = indexStart * 2 + 1;
        var rightChild = indexStart * 2 + 2;
        if (leftChild > endIndex) {
            return;
        }
        var nNextIndex = leftChild;
        if (rightChild < endIndex + 1) {
            if (arrayHeap[rightChild] > arrayHeap[leftChild]) {
                nNextIndex = rightChild;
            }
        }
        if (arrayHeap[indexStart] < arrayHeap[nNextIndex]) {
            var temp = arrayHeap[indexStart];
            arrayHeap[indexStart] = arrayHeap[nNextIndex];
            arrayHeap[nNextIndex] = temp;
            indexStart = nNextIndex;
        }
        else {
            return;
        }
    }
}
// 堆排序算法
function heapSort(arrayInput) {
    makeMaxHeapNoRecur(arrayInput);
    for (var i = arrayInput.length - 1; i > 0; --i) {
        var Temp = arrayInput[0];
        arrayInput[0] = arrayInput[i];
        arrayInput[i] = Temp;
        ajustMaxHeapForSort(0, arrayInput, i - 1);
    }
}
var HeapTest = /** @class */ (function () {
    function HeapTest() {
    }
    HeapTest.prototype.runTestIsAheap = function () {
        var arrayTemp = [23, 17, 14, 12, 13, 10, 1, 5, 7, 6];
        var bResult = checkArrayMaxHeap(arrayTemp);
        if (bResult) {
            console.log("this is a heap!");
        }
        else {
            console.log("this is a not heap!");
        }
    };
    HeapTest.prototype.runTestMakeHeapRecur = function () {
        var arrayOrgin = utilitytools_1.default.generateRandomArray(10, 1000, 20);
        console.log('原始数组是：');
        console.log("" + arrayOrgin);
        var arrayTemp = arrayOrgin.concat();
        makeMaxHeapRecur(arrayTemp);
        var bResult = checkArrayMaxHeap(arrayTemp);
        console.log('新数组是:');
        console.log("" + arrayTemp);
        if (bResult) {
            console.log("make the array by recurway to a heap success!");
        }
        else {
            console.log("make the array by recurway to a heap err!");
        }
    };
    HeapTest.prototype.runTestMakeHeapNoRecur = function () {
        var arrayOrgin = utilitytools_1.default.generateRandomArray(10, 1000, 20);
        console.log('原始数组是：');
        console.log("" + arrayOrgin);
        var arrayTemp = arrayOrgin.concat();
        makeMaxHeapNoRecur(arrayTemp);
        var bResult = checkArrayMaxHeap(arrayTemp);
        console.log('新数组是:');
        console.log("" + arrayTemp);
        if (bResult) {
            console.log("make the array by norecurway to a heap success!");
        }
        else {
            console.log("make the array by norecurway to a heap err!");
        }
    };
    HeapTest.prototype.runTestHeapSort = function () {
        var arrayOrgin = utilitytools_1.default.generateRandomArray(10, 1000, 20);
        console.log('原始数组是：');
        console.log("" + arrayOrgin);
        var arrayTemp = arrayOrgin.concat();
        heapSort(arrayTemp);
        console.log('新数组是:');
        console.log("" + arrayTemp);
    };
    HeapTest.prototype.runTest = function () {
        this.runTestIsAheap();
        this.runTestMakeHeapRecur();
        this.runTestMakeHeapNoRecur();
        this.runTestHeapSort();
    };
    return HeapTest;
}());
var heapTestCasedefaut = new HeapTest();
exports.default = heapTestCasedefaut;
// const arrayTemp = [23,17,14,12,13,10,1,5,7,6];
// const bResult = checkArrayMaxHeap(arrayTemp);
// console.log(bResult);
// heapSort(arrayTemp);
// console.log(arrayTemp);
