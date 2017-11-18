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
    ////冒泡排序测试
    TestCaseQuestion.prototype.testCaseBubbleSort = function () {
        var sortNum = utilitytools_1.default.generateRandom(20, 70);
        console.log('zhengwei test bubbleSort', sortNum);
        var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
        var ArrayToSort = ArrayTest.concat([]);
        console.log("orgin sequence is " + ArrayToSort);
        bubbleSort(ArrayToSort);
        console.log("sequence sorted is " + ArrayToSort);
        console.log('bubbleSort  testcase is ', utilitytools_1.default.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    };
    ////冒泡排序优化版
    TestCaseQuestion.prototype.testCaseBubbleSortImprove = function () {
        var sortNum = utilitytools_1.default.generateRandom(20, 70);
        console.log('zhengwei test bubbleSortImprove', sortNum);
        var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
        var ArrayToSort = ArrayTest.concat([]);
        console.log("orgin sequence is " + ArrayToSort);
        bubbleSortImprove(ArrayToSort);
        console.log("sequence sorted is " + ArrayToSort);
        console.log('bubbleSortImprove  testcase is ', utilitytools_1.default.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    };
    ////双向冒泡排序
    TestCaseQuestion.prototype.testCaseShakerSort = function () {
        var sortNum = utilitytools_1.default.generateRandom(20, 70);
        console.log('zhengwei test ShakerSort', sortNum);
        var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, sortNum);
        var ArrayToSort = ArrayTest.concat([]);
        console.log("orgin sequence is " + ArrayToSort);
        ShakerSort(ArrayToSort);
        console.log("sequence sorted is " + ArrayToSort);
        console.log('ShakerSort  testcase is ', utilitytools_1.default.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    };
    ////霍纳多项式计算测试
    TestCaseQuestion.prototype.testCaseHuona = function () {
        var ArrayLenth = utilitytools_1.default.generateRandom(2, 9);
        var ArrayTest = utilitytools_1.default.generateRandomArray(1, 6, ArrayLenth);
        var xNum = utilitytools_1.default.generateRandom(1, 6);
        var result1 = polyValueHuona(ArrayTest, xNum);
        var result2 = polyValueNative(ArrayTest, xNum);
        console.log("Array is " + ArrayTest + ",x is " + xNum + ",huo na poly result is " + result1 + ",native poly result is " + result2 + ",testcase is " + (result1 === result2));
    };
    ////计算逆序数测试
    TestCaseQuestion.prototype.testCaseInversion = function () {
        var nNum = utilitytools_1.default.generateRandom(20, 70);
        console.log('zhengwei test testCaseInversion', nNum);
        var ArrayTest = utilitytools_1.default.generateRandomArray(1, 100, nNum);
        console.log("orgin sequence is " + ArrayTest);
        var ArrayTemp = ArrayTest.concat([]);
        var result1 = inversionNum(ArrayTest);
        var result2 = mergeSortInversionWrap(ArrayTemp);
        console.log("sorted sequence is " + ArrayTemp);
        console.log("native result is " + result1 + ", mergeSortInversionWrap result is " + result2 + ",testcase is " + (result1 === result2));
    };
    TestCaseQuestion.prototype.runTest = function () {
        this.testCasemergeSequenceSort();
        this.testCaseMergeSortMinSeqKWrap();
        this.testCaseBubbleSort();
        this.testCaseBubbleSortImprove();
        this.testCaseShakerSort();
        this.testCaseHuona();
        this.testCaseInversion();
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
/////////////////////////////////////////////////////
///////// 冒泡排序算法导论习题2-2
/////////////////////////////////////////////////////
function bubbleSort(ArrayInput) {
    for (var i = 0; i < ArrayInput.length; ++i) {
        for (var j = ArrayInput.length - 1; j > i; --j) {
            if (ArrayInput[j] < ArrayInput[j - 1]) {
                var Temp = ArrayInput[j];
                ArrayInput[j] = ArrayInput[j - 1];
                ArrayInput[j - 1] = Temp;
            }
        }
    }
}
// 对冒泡排序的一个改进，记住上一次最后交换的位置，作为下一次循环的最终点。
// 当在一次循环中没交换时，说明已经排好顺序了，直接退出。
function bubbleSortImprove(ArrayInput) {
    for (var i = 0; i < ArrayInput.length;) {
        var k = -1;
        for (var j = ArrayInput.length - 1; j > i; --j) {
            if (ArrayInput[j] < ArrayInput[j - 1]) {
                var Temp = ArrayInput[j];
                ArrayInput[j] = ArrayInput[j - 1];
                ArrayInput[j - 1] = Temp;
                k = j;
            }
        }
        // 如果在一次循环中没有交换说明已经排好顺序了，直接退出
        if (k === -1) {
            return;
        }
        else {
            i = k;
        }
    }
}
// 冒泡排序，双向冒泡排序
function ShakerSort(ArrayInput) {
    var left = 0;
    var right = ArrayInput.length - 1;
    while (left < right) {
        var rightCpFlat = -1;
        var leftCpFlat = -1;
        for (var j = left; j < right; ++j) {
            if (ArrayInput[j] > ArrayInput[j + 1]) {
                var Temp = ArrayInput[j];
                ArrayInput[j] = ArrayInput[j + 1];
                ArrayInput[j + 1] = Temp;
                rightCpFlat = j;
            }
        }
        if (rightCpFlat === -1) {
            return;
        }
        right = rightCpFlat;
        for (var j = right; j > left; --j) {
            if (ArrayInput[j - 1] > ArrayInput[j]) {
                var Temp = ArrayInput[j];
                ArrayInput[j] = ArrayInput[j - 1];
                ArrayInput[j - 1] = Temp;
                leftCpFlat = j;
            }
        }
        if (leftCpFlat === -1) {
            return;
        }
        left = leftCpFlat;
    }
}
//////////////////////////////////////
////霍纳规则计算多项式
//////////////////////////////////////
function polyValueHuona(ArrayPoly, xValue) {
    var yResult = 0;
    for (var i = ArrayPoly.length - 1; i >= 0; --i) {
        yResult = yResult * xValue + ArrayPoly[i];
    }
    return yResult;
}
// 朴素多项式计算
function polyValueNative(ArrayPoly, xValue) {
    var yResult = 0;
    for (var i = 0; i < ArrayPoly.length; ++i) {
        var xTemp = 1;
        for (var j = 0; j < i; ++j) {
            xTemp *= xValue;
        }
        yResult += ArrayPoly[i] * xTemp;
    }
    return yResult;
}
// const ArrayTest2 = [27,14,92,83,61,80,95,11,7,46,44,60,67,14,86,96,25,55,29,59,48,64,58];
// ShakerSort(ArrayTest2);
// console.log(`sequence sorted is ${ArrayTest2}`);
//////////////////////////////////////
//// 逆序对 算法导论2-4
//////////////////////////////////////
//逆序对原始算法
function inversionNum(ArrayInput) {
    var inversionNum = 0;
    for (var i = 0; i < ArrayInput.length; ++i) {
        for (var j = i + 1; j < ArrayInput.length; ++j) {
            if (ArrayInput[i] > ArrayInput[j]) {
                ++inversionNum;
            }
        }
    }
    return inversionNum;
}
//逆序队归并算法，在归并排序过程中增加计数器，计算逆序队数目。
function mergeSortInversionWrap(ArrayInput) {
    return mergeSortInversion(ArrayInput, 0, ArrayInput.length - 1);
}
/**
 * 归并排序计算逆序对
 * @param ArrayInput
 * @param start
 * @param end
 */
function mergeSortInversion(ArrayInput, start, end) {
    var nNumReturn = 0;
    if (start < end) {
        var middle = Math.floor((start + end) / 2);
        nNumReturn += mergeSortInversion(ArrayInput, start, middle);
        nNumReturn += mergeSortInversion(ArrayInput, middle + 1, end);
        nNumReturn += mergeInversion(ArrayInput, start, middle, end);
    }
    return nNumReturn;
}
/**
 * 归并排序归并过程,并计算逆序数
 * @param ArrayInput
 * @param start
 * @param middle
 * @param end
 */
function mergeInversion(ArrayInput, start, middle, end) {
    var nNumInversion = 0;
    var ArrayFirst = ArrayInput.slice(start, middle + 1);
    var ArraySecond = ArrayInput.slice(middle + 1, end + 1);
    var i = 0, j = 0, k = 0;
    for (; i < ArrayFirst.length && j < ArraySecond.length; ++k) {
        if (ArraySecond[j] < ArrayFirst[i]) {
            ArrayInput[start + k] = ArraySecond[j];
            ++j;
        }
        else {
            // 当插入ArrayFirst的数据时，判断当前有多少逆序
            // 被插入的数据中含有j个比当前ArrayFirst[i]小的数据
            ArrayInput[start + k] = ArrayFirst[i];
            ++i;
            nNumInversion = nNumInversion + j;
        }
    }
    if (i < ArrayFirst.length) {
        for (; i < ArrayFirst.length; ++i) {
            ArrayInput[start + k] = ArrayFirst[i];
            //ArrayFirst i之后的每一个值对ArraySecond来说都是逆序
            nNumInversion += ArraySecond.length;
            ++k;
        }
    }
    if (j < ArraySecond.length) {
        for (; j < ArraySecond.length; ++j) {
            ArrayInput[start + k] = ArraySecond[j];
            ++k;
        }
    }
    return nNumInversion;
}
// const ArrayTest1 = [27, 14, 92, 7, 7, 61, 80, 95, 11, 7, 46, 44, 60, 67, 14, 86, 96, 25, 155, 29, 59, 48, 64, 58];
// const ArrayTest1 = [1,1,1,1,1,1,1,1,1];
// console.log(inversionNum(ArrayTest1));
// console.log(mergeSortInversionWrap(ArrayTest1.splice(0, ArrayTest1.length))); 
