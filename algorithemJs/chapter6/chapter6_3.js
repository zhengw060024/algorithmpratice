"use strict";
exports.__esModule = true;
// 算法导论第6章思考题
// 插入法建堆
var utilitytools_1 = require("./utilitytools");
function checkArrayMaxHeap(arrayInput) {
    var indexCheckEnd = Math.floor(arrayInput.length / 2);
    var i = 0;
    for (var i_1 = 0; i_1 < indexCheckEnd - 1; ++i_1) {
        if (!(arrayInput[i_1] >= arrayInput[2 * i_1 + 1]
            && arrayInput[i_1] >= arrayInput[2 * i_1 + 2])) {
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
function buildMaxHeap(arrayInput) {
    for (var i = 1; i < arrayInput.length; ++i) {
        ajustHeapItemToTop(arrayInput, i);
    }
}
function ajustHeapItemToTop(arrayInput, itemIndex) {
    // itemIndex这一项
    // 注意对于c和c++代码，需要考虑临界点条件
    var nStartIndex = Math.floor((itemIndex - 1) / 2);
    var temp = arrayInput[itemIndex];
    while (nStartIndex >= 0) {
        if (arrayInput[nStartIndex] < temp) {
            arrayInput[itemIndex] = arrayInput[nStartIndex];
            itemIndex = nStartIndex;
            nStartIndex = Math.floor((itemIndex - 1) / 2);
        }
        else {
            break;
        }
    }
    arrayInput[itemIndex] = temp;
}
// 算法导论思考题6-2（对 d叉堆的分析）
function buildCrossHeap(arrayInput, dCross) {
    if (dCross < 2) {
        throw new Error('illegal dcross number!');
    }
    var nStartIndex = Math.floor((arrayInput.length - 2) / dCross);
    for (var i = nStartIndex; i >= 0; --i) {
        ajustdCrossItem(arrayInput, i, dCross);
    }
}
function ajustdCrossItem(arrayInput, itemIndex, dCross) {
    var checkStartIndex = itemIndex * dCross + 1;
    var nTemp = arrayInput[itemIndex];
    while (checkStartIndex < arrayInput.length) {
        // let nTempEnd = itemIndex * dCross + dCross;
        var checkEndIndex = Math.min(itemIndex * dCross + dCross, arrayInput.length - 1);
        var nTempMaxIndex = checkStartIndex;
        for (var i = checkStartIndex; i <= checkEndIndex; ++i) {
            if (arrayInput[nTempMaxIndex] < arrayInput[i]) {
                nTempMaxIndex = i;
            }
        }
        if (nTemp < arrayInput[nTempMaxIndex]) {
            arrayInput[itemIndex] = arrayInput[nTempMaxIndex];
            itemIndex = nTempMaxIndex;
            checkStartIndex = itemIndex * dCross + 1;
        }
        else {
            break;
        }
    }
    arrayInput[itemIndex] = nTemp;
    return itemIndex;
}
function helpCheckdCrossHeapLegal(arrayInput, dCross) {
    var nStartIndex = Math.floor((arrayInput.length - 2) / dCross);
    for (var i = nStartIndex; i >= 0; --i) {
        for (var j = nStartIndex * dCross + 1; j <= nStartIndex * dCross + dCross && j < arrayInput.length; ++j) {
            if (arrayInput[j] > arrayInput[i]) {
                console.log("this is not a dcross heap!!!");
                return false;
            }
        }
    }
    console.log('this is a dcross heap!!!');
    return true;
}
function popMaxItemdCrossHeap(arrayInput, dCross) {
    if (arrayInput.length === 0) {
        throw new Error('the heap is empty');
    }
    if (arrayInput.length === 1) {
        return arrayInput.pop();
    }
    else {
        var temp = arrayInput[0];
        arrayInput[0] = arrayInput[arrayInput.length - 1];
        arrayInput.pop();
        ajustdCrossItem(arrayInput, 0, dCross);
        return temp;
    }
}
// 向dcrossheap 中插入数据
function insertItemTodCrossHeap(arrayInput, dCross, itemInsert) {
    arrayInput.push(itemInsert);
    return ajustdCrossItemToTop(arrayInput, arrayInput.length - 1, dCross);
}
function ajustdCrossItemToTop(arrayInput, posIndex, dCross) {
    var nTemp = arrayInput[posIndex];
    while (posIndex > 0) {
        var parentPos = Math.floor((posIndex - 1) / dCross);
        if (arrayInput[parentPos] < arrayInput[posIndex]) {
            arrayInput[posIndex] = arrayInput[parentPos];
            posIndex = parentPos;
        }
        else {
            break;
        }
    }
    arrayInput[posIndex] = nTemp;
    return posIndex;
}
function increasedCrossHeapItemById(arrayInput, posIndex, newItem, dCross) {
    if (newItem < arrayInput[posIndex]) {
        // console.log('no need to insert Item!!!');
        arrayInput[posIndex] = newItem;
        return ajustdCrossItem(arrayInput, posIndex, dCross);
    }
    else {
        arrayInput[posIndex] = newItem;
        return ajustdCrossItemToTop(arrayInput, posIndex, dCross);
    }
}
var TestCaseQuestion = /** @class */ (function () {
    function TestCaseQuestion() {
    }
    TestCaseQuestion.prototype.testCaseDCrossHeap = function () {
        var arrayOrgin = utilitytools_1["default"].generateRandomArray(1, 1000, 30);
        console.log("Orgin array is " + arrayOrgin);
        var arrayTest = arrayOrgin.concat();
        // 秩为2为普通的堆
        buildCrossHeap(arrayTest, 2);
        console.log("new heap array is " + arrayTest);
        if (checkArrayMaxHeap(arrayTest)) {
            console.log('this  is a max heap by dCrossHeapTest!');
        }
        else {
            console.log('this is not max heap by dCrossHeapTest,some error happened!');
        }
        //
        var dCross = utilitytools_1["default"].generateRandom(2, 30);
        var arrayTest2 = arrayOrgin.concat();
        console.log("dcross is " + dCross);
        buildCrossHeap(arrayTest2, dCross);
        if (helpCheckdCrossHeapLegal(arrayTest2, dCross)) {
            console.log('dcross testcase right!!!');
        }
        console.log("dCrossHeap is " + arrayTest2);
        var nRemoveItem = popMaxItemdCrossHeap(arrayTest2, dCross);
        console.log('the max num in the heap is :', nRemoveItem);
        console.log("after remove max ,dCrossHeap is " + arrayTest2);
        if (helpCheckdCrossHeapLegal(arrayTest2, dCross) && nRemoveItem >= arrayTest2[0]) {
            console.log('remove op is success!');
        }
        else {
            console.log('remove op is failed!!!');
        }
        var nInsertNum = utilitytools_1["default"].generateRandom(10, 4000);
        console.log('The number to insert is :', nInsertNum);
        var nInsertPos = insertItemTodCrossHeap(arrayTest2, dCross, nInsertNum);
        console.log('The insert pos is :', nInsertPos);
        if (nInsertNum === arrayTest2[nInsertPos] && helpCheckdCrossHeapLegal(arrayTest2, dCross)) {
            console.log('insert op is ok');
        }
        else {
            console.log('insert op is failed!!!');
        }
        console.log("after insert item ,dCrossHeap is " + arrayTest2);
        // 修改heap中的某项的值
        var nItemIndexChange = utilitytools_1["default"].generateRandom(0, arrayTest2.length - 1);
        var nOldData = arrayTest2[nItemIndexChange];
        var nNewNum = utilitytools_1["default"].generateRandom(0, 1000);
        var nNewItemIndex = increasedCrossHeapItemById(arrayTest2, nItemIndexChange, nNewNum, dCross);
        console.log("the old data is " + nOldData + ", the old index is " + nItemIndexChange);
        console.log("the new data is " + nNewNum + ", the new index is " + nNewItemIndex);
        console.log("after item change ,dCrossHeap is " + arrayTest2);
        if (nNewNum === arrayTest2[nNewItemIndex] && helpCheckdCrossHeapLegal(arrayTest2, dCross)) {
            console.log('change item testcase success!!!');
        }
        else {
            console.log('change indexed item testcase failed');
        }
    };
    TestCaseQuestion.prototype.testCaseInsertBuildHeap = function () {
        var arrayOrgin = utilitytools_1["default"].generateRandomArray(1, 1000, 30);
        console.log("Orgin array is " + arrayOrgin);
        var arrayTest = arrayOrgin.concat();
        buildMaxHeap(arrayTest);
        console.log("new heap array is " + arrayTest);
        if (checkArrayMaxHeap(arrayTest)) {
            console.log('this  is a max heap!');
        }
        else {
            console.log('this is not max heap ,some error happened!');
        }
    };
    return TestCaseQuestion;
}());
var testItem = new TestCaseQuestion();
// testItem.testCaseInsertBuildHeap();
testItem.testCaseDCrossHeap();
console.log(10000 < Number.MAX_VALUE);
