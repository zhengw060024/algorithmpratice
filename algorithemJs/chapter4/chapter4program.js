"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitytools_1 = require("./utilitytools");
/**
 * 暴力搜索法 n* n,计算所有的组合，因为之前计算的子数组的信息可以用来
 * 计算当前子数组，所以
 * @param arrayInput
 */
function getMaxSubSequenceBrute(arrayInput) {
    var TempResult = {
        minIndex: 0,
        maxIndex: 0,
        maxSubSum: arrayInput[0]
    };
    for (var i = 0; i < arrayInput.length; ++i) {
        var temp = 0;
        // 计算所有以i为起始的子串
        for (var j = i; j < arrayInput.length; ++j) {
            temp = temp + arrayInput[j];
            if (temp > TempResult.maxSubSum) {
                TempResult.maxSubSum = temp;
                TempResult.minIndex = i;
                TempResult.maxIndex = j;
            }
        }
    }
    return TempResult;
}
/**
 * 分治法
 * @param arrayInput
 */
function getMaxSubSequenceDivide(arrayInput) {
    return getMaxSubSequenceDivideRecur(arrayInput, 0, arrayInput.length - 1);
}
function getMaxSubSequenceDivideRecur(arrayInput, startIndex, endIndex) {
    if (startIndex === endIndex) {
        return {
            minIndex: startIndex,
            maxIndex: endIndex,
            maxSubSum: arrayInput[startIndex]
        };
    }
    else {
        var nMiddle = Math.floor((startIndex + endIndex) / 2);
        var first = getMaxSubSequenceDivideRecur(arrayInput, startIndex, nMiddle);
        var second = getMaxSubSequenceDivideRecur(arrayInput, nMiddle + 1, endIndex);
        // 计算中间的最大子串从 middle 向两边扩展。
        var tempLeftMax = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        };
        var tempRightMax = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        };
        var templeft = arrayInput[nMiddle];
        for (var i = nMiddle - 1; i >= startIndex; --i) {
            templeft = templeft + arrayInput[i];
            if (templeft > tempLeftMax.maxSubSum) {
                tempLeftMax.maxSubSum = templeft;
                tempLeftMax.minIndex = i;
            }
        }
        var tempRight = arrayInput[nMiddle];
        for (var j = nMiddle + 1; j <= endIndex; ++j) {
            tempRight = tempRight + arrayInput[j];
            if (tempRight > tempRightMax.maxSubSum) {
                tempRightMax.maxSubSum = tempRight;
                tempRightMax.maxIndex = j;
            }
        }
        var third = {
            minIndex: tempLeftMax.minIndex,
            maxIndex: tempRightMax.maxIndex,
            maxSubSum: tempRightMax.maxSubSum + tempLeftMax.maxSubSum - arrayInput[nMiddle]
        };
        if (first.maxSubSum < second.maxSubSum) {
            if (second.maxSubSum < third.maxSubSum) {
                return third;
            }
            return second;
        }
        else {
            if (first.maxSubSum < third.maxSubSum) {
                return third;
            }
            return first;
        }
    }
}
////////////////在nend - nstart  < n 时使用暴力搜索法
/**
 * nMinLength 需要大于0
 * @param arrayInput
 * @param nMinLength nMinLenth 需要大于0
 */
function getMaxSubSequenceDivideByK(arrayInput, nMinLength) {
    return getMaxSubSequenceDivideRecurByK(arrayInput, 0, arrayInput.length - 1, nMinLength);
}
function getMaxSubSequenceBrutebyK(arrayInput, nStartIndex, nEndIndex) {
    var TempResult = {
        minIndex: nStartIndex,
        maxIndex: nStartIndex,
        maxSubSum: arrayInput[nStartIndex]
    };
    for (var i = nStartIndex; i <= nEndIndex; ++i) {
        // 计算以i为起始的所有子串
        var nTemp = 0;
        for (var j = i; j <= nEndIndex; ++j) {
            nTemp += arrayInput[j];
            if (nTemp > TempResult.maxSubSum) {
                TempResult.maxSubSum = nTemp;
                TempResult.minIndex = i;
                TempResult.maxIndex = j;
            }
        }
    }
    return TempResult;
}
function getMaxSubSequenceDivideRecurByK(arrayInput, startIndex, endIndex, nMinLength) {
    if (endIndex - startIndex <= nMinLength) {
        return getMaxSubSequenceBrutebyK(arrayInput, startIndex, endIndex);
    }
    else {
        var nMiddle = Math.floor((startIndex + endIndex) / 2);
        var first = getMaxSubSequenceDivideRecurByK(arrayInput, startIndex, nMiddle, nMinLength);
        var second = getMaxSubSequenceDivideRecurByK(arrayInput, nMiddle + 1, endIndex, nMinLength);
        // 计算中间的最大子串从 middle 向两边扩展。
        var tempLeftMax = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        };
        var tempRightMax = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        };
        var templeft = arrayInput[nMiddle];
        for (var i = nMiddle - 1; i >= startIndex; --i) {
            templeft = templeft + arrayInput[i];
            if (templeft > tempLeftMax.maxSubSum) {
                tempLeftMax.maxSubSum = templeft;
                tempLeftMax.minIndex = i;
            }
        }
        var tempRight = arrayInput[nMiddle];
        for (var j = nMiddle + 1; j <= endIndex; ++j) {
            tempRight = tempRight + arrayInput[j];
            if (tempRight > tempRightMax.maxSubSum) {
                tempRightMax.maxSubSum = tempRight;
                tempRightMax.maxIndex = j;
            }
        }
        var third = {
            minIndex: tempLeftMax.minIndex,
            maxIndex: tempRightMax.maxIndex,
            maxSubSum: tempRightMax.maxSubSum + tempLeftMax.maxSubSum - arrayInput[nMiddle]
        };
        if (first.maxSubSum < second.maxSubSum) {
            if (second.maxSubSum < third.maxSubSum) {
                return third;
            }
            return second;
        }
        else {
            if (first.maxSubSum < third.maxSubSum) {
                return third;
            }
            return first;
        }
    }
}
//////////////////////////////
/////////////////////////////
//动态规划算法：若已知A[1..j]的最大子数组，A[1..j+1]的最大子数组要么是
//A[1..j]的最大子数组，要么是某个子数组A[i..j+1],假定A[1..j]最大子数组
//为sumMax[j],对以j为结尾的最大子数组为b[j],则sumMax[j + 1] = b[j + 1]> sumMax[j] ? b[j+1]:sumMax[j],
//而对于b[j+1]有b[j + 1] = b[j] > 0 ? b[j] + A[j + 1] : A[j + 1];
function getMaxSubSequenceDynamic(arrayInput) {
    var TempResult = {
        minIndex: 0,
        maxIndex: 0,
        maxSubSum: arrayInput[0] //当前最大子数组和
    };
    // 以i为结尾的最大子串，起始值
    var tempB = {
        minIndex: 0,
        maxIndex: 0,
        maxSubSum: arrayInput[0] //当前最大子数组和
    };
    for (var i = 1; i < arrayInput.length; ++i) {
        //先计算b[i],并会写到tempB中，因为b[i]只依赖b[i-1],因而我们不需要记录i-1之前的b数组数据
        if (tempB.maxSubSum > 0) {
            tempB.maxIndex = i;
            tempB.maxSubSum = tempB.maxSubSum + arrayInput[i];
        }
        else {
            tempB.minIndex = i;
            tempB.maxIndex = i;
            tempB.maxSubSum = arrayInput[i];
        }
        //计算最大子串信息
        if (tempB.maxSubSum > TempResult.maxSubSum) {
            TempResult.minIndex = tempB.minIndex;
            TempResult.maxIndex = tempB.maxIndex;
            TempResult.maxSubSum = tempB.maxSubSum;
        }
    }
    return TempResult;
}
// 允许空数组返回
function getMaxSubSequenceMayEmptyWrap(arrayInput) {
    var TempResult = {
        minIndex: -1,
        maxIndex: -1,
        maxSubSum: 0 //当前最大子数组和
    };
    var TempResultNoEmpty = getMaxSubSequenceDynamic(arrayInput);
    if (TempResultNoEmpty.maxSubSum < TempResult.maxSubSum) {
        return TempResult;
    }
    else {
        return TempResultNoEmpty;
    }
}
// 最大子串测试用例
var MaxSubDSequenceSum = /** @class */ (function () {
    function MaxSubDSequenceSum() {
        var itemCount = utilitytools_1.default.generateRandom(40, 100);
        this.m_arrayToTest = utilitytools_1.default.generateRandomArray(-100, 40, itemCount);
        console.log("array item count is " + itemCount + ", origin array is " + this.m_arrayToTest);
        this.m_expectResult = getMaxSubSequenceBrute(this.m_arrayToTest);
        console.log("expect result is ", this.m_expectResult);
    }
    MaxSubDSequenceSum.prototype.testCaseDivide = function () {
        var tempMaxsub = getMaxSubSequenceDivide(this.m_arrayToTest);
        var testResult = tempMaxsub.maxSubSum === this.m_expectResult.maxSubSum;
        console.log("testResult is " + testResult + ",divide result is ", tempMaxsub);
    };
    MaxSubDSequenceSum.prototype.testCaseDynamic = function () {
        var tempMaxsub = getMaxSubSequenceDynamic(this.m_arrayToTest);
        var testResult = tempMaxsub.maxSubSum === this.m_expectResult.maxSubSum;
        console.log("testResult is " + testResult + ",dynamic result is ", tempMaxsub);
    };
    MaxSubDSequenceSum.prototype.testCaseDevideByK = function () {
        var numMinSeq = utilitytools_1.default.generateRandom(1, 10);
        var tempMaxsub = getMaxSubSequenceDivideByK(this.m_arrayToTest, numMinSeq);
        var testResult = tempMaxsub.maxSubSum === this.m_expectResult.maxSubSum;
        console.log("divideK minSeqNum is " + numMinSeq + ", testResult is " + testResult + ",divideK result is ", tempMaxsub);
    };
    MaxSubDSequenceSum.prototype.runTest = function () {
        this.testCaseDivide();
        this.testCaseDevideByK();
        this.testCaseDynamic();
    };
    return MaxSubDSequenceSum;
}());
var MaxSubSeqSum = new MaxSubDSequenceSum();
exports.default = MaxSubSeqSum;
