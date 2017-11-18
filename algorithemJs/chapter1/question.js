"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 算法导论第二章中的思考题
var utilitytools_1 = require("./utilitytools");
var TestCaseQuestion = /** @class */ (function () {
    function TestCaseQuestion() {
    }
    /////归并排序修改版排序测试----------
    TestCaseQuestion.prototype.testCasemergeSequenceSort = function () {
        var sortNum = utilitytools_1.default.generateRandom(20, 70);
        console.log('zhengwei test testCasemergeSequenceSort', sortNum);
        var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
        var ArrayToSort = ArrayTest.concat([]);
        console.log("orgin sequence is " + ArrayToSort);
        var sortMinK = utilitytools_1.default.generateRandom(2, 7);
        mergeSequenceSort(ArrayToSort, sortMinK);
        console.log("sequence sorted is " + ArrayToSort);
        //utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort);
        console.log('mergeSequenceSort  testcase is ', utilitytools_1.default.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    };
    /////归并排序修改版排序测试----------
    TestCaseQuestion.prototype.testCaseMergeSortMinSeqKWrap = function () {
        var sortNum = utilitytools_1.default.generateRandom(20, 70);
        console.log('zhengwei test testCaseMergeSortMinSeqKWrap', sortNum);
        var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
        var ArrayToSort = ArrayTest.concat([]);
        console.log("orgin sequence is " + ArrayToSort);
        var sortMinK = utilitytools_1.default.generateRandom(2, 7);
        mergeSortMinSeqKWrap(ArrayToSort, sortMinK);
        console.log("sequence sorted is " + ArrayToSort);
        //utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort);
        console.log('testCaseMergeSortMinSeqKWrap  testcase is ', utilitytools_1.default.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    };
    TestCaseQuestion.prototype.runTest = function () {
        this.testCasemergeSequenceSort();
        this.testCaseMergeSortMinSeqKWrap();
    };
    return TestCaseQuestion;
}());
var questionTestCase = new TestCaseQuestion();
exports.default = questionTestCase;
/**
 * 归并排序修改版
 * @param ArrayInput 要排序的输入数组
 * @param subsequenceLen 子串长度
 */
function mergeSequenceSort(ArrayInput, subsequenceLen) {
    var endSequenceNum = Math.floor((ArrayInput.length - 1) / subsequenceLen);
    for (var i = 0; i < endSequenceNum; ++i) {
        insertSort(ArrayInput, i * subsequenceLen, (i + 1) * subsequenceLen);
    }
    insertSort(ArrayInput, endSequenceNum * subsequenceLen, ArrayInput.length - 1);
    mergeSequence(ArrayInput, 0, endSequenceNum, subsequenceLen, ArrayInput.length - 1);
}
// 2-1 在合并排序中对最小数组采用插入排序
/**
 * 对子列表进行排序函数
 * @param ArrayInput
 * @param begin 子列表起始id
 * @param end 子列表结束id
 */
function insertSort(ArrayInput, begin, end) {
    for (var i = 1; i <= end; ++i) {
        var tempx = ArrayInput[i];
        var j = i - 1;
        for (; j >= begin; --j) {
            if (ArrayInput[j] > tempx) {
                ArrayInput[j + 1] = ArrayInput[j];
            }
            else {
                break;
            }
        }
        ArrayInput[j + 1] = tempx;
    }
}
/**
 * 归并排序修改版归并过程
 * @param ArrayInput 要排序的输入数组
 * @param startSequenceId 起始序列号
 * @param endSequenceId 结束序列号
 * @param subsequenceLen 子串长度
 * @param endIndex 尾串结束序列id
 */
function mergeSequence(ArrayInput, startSequenceId, endSequenceId, subsequenceLen, endIndex) {
    if (startSequenceId < endSequenceId) {
        var nMiddleSequenceId = Math.floor((startSequenceId + endSequenceId) / 2);
        mergeSequence(ArrayInput, startSequenceId, nMiddleSequenceId, subsequenceLen, (nMiddleSequenceId + 1) * subsequenceLen - 1);
        mergeSequence(ArrayInput, nMiddleSequenceId + 1, endSequenceId, subsequenceLen, endIndex);
        // 归并
        utilitytools_1.default.merge(ArrayInput, startSequenceId * subsequenceLen, (nMiddleSequenceId + 1) * subsequenceLen - 1, endIndex);
    }
}
/////////////////////////////////////////
/////////归并排序第二版本，在递归排序的过程中
/////////判断子串大小是多少，小于一个上限k则
/////////调用插入排序，排序子串
/////////////////////////////////////////
function mergesortMinSeqK(ArrayInput, startIndex, endIndex, k) {
    if (endIndex - startIndex >= k) {
        var middleNum = Math.floor((startIndex + endIndex) / 2);
        mergesortMinSeqK(ArrayInput, startIndex, middleNum, k);
        mergesortMinSeqK(ArrayInput, middleNum + 1, endIndex, k);
        utilitytools_1.default.merge(ArrayInput, startIndex, middleNum, endIndex);
    }
    else {
        insertSort(ArrayInput, startIndex, endIndex);
    }
}
function mergeSortMinSeqKWrap(ArrayInput, subSequenceNum) {
    mergesortMinSeqK(ArrayInput, 0, ArrayInput.length - 1, subSequenceNum);
}
// const ArrayTest = [6, 4, 1, 35, 1, 6, 7, 9, 12, 56, 78, 9, 0, 12, 8, 15, 32, 7, 9, 5, 7, 8, 9, 15, 24];
// console.log(ArrayTest);
// console.log(ArrayTest.slice(0, ArrayTest.length).sort((a, b) => a - b));
// console.log(ArrayTest);
// mergeSequenceSort(ArrayTest, 7);
// console.log(ArrayTest); 
