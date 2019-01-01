import utilityTools from './utilitytools'
/**
 * 最大子数组问题，已知数组
 * a[n],求i，j 使得a[i] 到 a[j]为a[n] 最大
 * 子串和。
 */
interface MaxSumSubSeqIndexPair {

    minIndex: number;
    maxIndex: number;
    maxSubSum: number;
}
/**
 * 暴力搜索法 n* n,计算所有的组合，因为之前计算的子数组的信息可以用来
 * 计算当前子数组，所以
 * @param arrayInput 
 */
function getMaxSubSequenceBrute(arrayInput: Array<number>): MaxSumSubSeqIndexPair {
    const TempResult: MaxSumSubSeqIndexPair = {
        minIndex: 0,
        maxIndex: 0,
        maxSubSum: arrayInput[0]
    }
    for (let i = 0; i < arrayInput.length; ++i) {
        let temp = 0;
        // 计算所有以i为起始的子串
        for (let j = i; j < arrayInput.length; ++j) {
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
function getMaxSubSequenceDivide(arrayInput: Array<number>): MaxSumSubSeqIndexPair {
    return getMaxSubSequenceDivideRecur(arrayInput, 0, arrayInput.length - 1);
}
function getMaxSubSequenceDivideRecur(arrayInput: Array<number>, startIndex: number, endIndex: number): MaxSumSubSeqIndexPair {
    if (startIndex === endIndex) {
        return {
            minIndex: startIndex,
            maxIndex: endIndex,
            maxSubSum: arrayInput[startIndex]
        }
    }
    else {
        const nMiddle = Math.floor((startIndex + endIndex) / 2);
        const first = getMaxSubSequenceDivideRecur(arrayInput, startIndex, nMiddle);
        const second = getMaxSubSequenceDivideRecur(arrayInput, nMiddle + 1, endIndex);
        // 计算中间的最大子串从 middle 向两边扩展。
        const tempLeftMax: MaxSumSubSeqIndexPair = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        };
        const tempRightMax: MaxSumSubSeqIndexPair = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        }
        let templeft = arrayInput[nMiddle];
        for (let i = nMiddle - 1; i >= startIndex; --i) {
            templeft = templeft + arrayInput[i];
            if (templeft > tempLeftMax.maxSubSum) {
                tempLeftMax.maxSubSum = templeft;
                tempLeftMax.minIndex = i;
            }
        }
        let tempRight = arrayInput[nMiddle];
        for (let j = nMiddle + 1; j <= endIndex; ++j) {
            tempRight = tempRight + arrayInput[j];
            if (tempRight > tempRightMax.maxSubSum) {
                tempRightMax.maxSubSum = tempRight;
                tempRightMax.maxIndex = j;
            }
        }
        const third: MaxSumSubSeqIndexPair = {
            minIndex: tempLeftMax.minIndex,
            maxIndex: tempRightMax.maxIndex,
            maxSubSum: tempRightMax.maxSubSum + tempLeftMax.maxSubSum - arrayInput[nMiddle]
        }
        if (first.maxSubSum < second.maxSubSum) {
            if (second.maxSubSum < third.maxSubSum) {
                return third;
            }
            return second;
        } else {
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
function getMaxSubSequenceDivideByK(arrayInput: Array<number>, nMinLength: number): MaxSumSubSeqIndexPair {
    return getMaxSubSequenceDivideRecurByK(arrayInput, 0, arrayInput.length - 1, nMinLength);
}

function getMaxSubSequenceBrutebyK(arrayInput: Array<number>, nStartIndex: number, nEndIndex: number) {
    const TempResult = {
        minIndex: nStartIndex,
        maxIndex: nStartIndex,
        maxSubSum: arrayInput[nStartIndex]
    }
    for (let i = nStartIndex; i <= nEndIndex; ++i) {
        // 计算以i为起始的所有子串
        let nTemp = 0;
        for (let j = i; j <= nEndIndex; ++j) {
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


function getMaxSubSequenceDivideRecurByK(arrayInput: Array<number>, startIndex: number, endIndex: number, nMinLength: number): MaxSumSubSeqIndexPair {
    if (endIndex - startIndex <= nMinLength) {
        return getMaxSubSequenceBrutebyK(arrayInput, startIndex, endIndex);
    }
    else {
        const nMiddle = Math.floor((startIndex + endIndex) / 2);
        const first = getMaxSubSequenceDivideRecurByK(arrayInput, startIndex, nMiddle, nMinLength);
        const second = getMaxSubSequenceDivideRecurByK(arrayInput, nMiddle + 1, endIndex, nMinLength);
        // 计算中间的最大子串从 middle 向两边扩展。
        const tempLeftMax: MaxSumSubSeqIndexPair = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        };
        const tempRightMax: MaxSumSubSeqIndexPair = {
            minIndex: nMiddle,
            maxIndex: nMiddle,
            maxSubSum: arrayInput[nMiddle]
        }
        let templeft = arrayInput[nMiddle];
        for (let i = nMiddle - 1; i >= startIndex; --i) {
            templeft = templeft + arrayInput[i];
            if (templeft > tempLeftMax.maxSubSum) {
                tempLeftMax.maxSubSum = templeft;
                tempLeftMax.minIndex = i;
            }
        }
        let tempRight = arrayInput[nMiddle];
        for (let j = nMiddle + 1; j <= endIndex; ++j) {
            tempRight = tempRight + arrayInput[j];
            if (tempRight > tempRightMax.maxSubSum) {
                tempRightMax.maxSubSum = tempRight;
                tempRightMax.maxIndex = j;
            }
        }
        const third: MaxSumSubSeqIndexPair = {
            minIndex: tempLeftMax.minIndex,
            maxIndex: tempRightMax.maxIndex,
            maxSubSum: tempRightMax.maxSubSum + tempLeftMax.maxSubSum - arrayInput[nMiddle]
        }
        if (first.maxSubSum < second.maxSubSum) {
            if (second.maxSubSum < third.maxSubSum) {
                return third;
            }
            return second;
        } else {
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
function getMaxSubSequenceDynamic(arrayInput: Array<number>): MaxSumSubSeqIndexPair {
    const TempResult: MaxSumSubSeqIndexPair = {
        minIndex: 0,
        maxIndex: 0,
        maxSubSum: arrayInput[0] //当前最大子数组和
    }
    // 以i为结尾的最大子串，起始值
    let tempB: MaxSumSubSeqIndexPair = {
        minIndex: 0,
        maxIndex: 0,
        maxSubSum: arrayInput[0] //当前最大子数组和
    }
    for (let i = 1; i < arrayInput.length; ++i) {
        //先计算b[i],并会写到tempB中，因为b[i]只依赖b[i-1],因而我们不需要记录i-1之前的b数组数据
        if (tempB.maxSubSum > 0) {
            tempB.maxIndex = i;
            tempB.maxSubSum = tempB.maxSubSum + arrayInput[i];
        } else {
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
function getMaxSubSequenceMayEmptyWrap(arrayInput: Array<number>): MaxSumSubSeqIndexPair {
    const TempResult: MaxSumSubSeqIndexPair = {
        minIndex: -1,
        maxIndex: -1,
        maxSubSum: 0 //当前最大子数组和
    }
    const TempResultNoEmpty = getMaxSubSequenceDynamic(arrayInput);
    if (TempResultNoEmpty.maxSubSum < TempResult.maxSubSum) {
        return TempResult;
    } else {
        return TempResultNoEmpty;
    }
}

// 最大子串测试用例
class MaxSubDSequenceSum {
    private m_expectResult: MaxSumSubSeqIndexPair;
    private m_arrayToTest: Array<number>;
    constructor() {
        const itemCount = utilityTools.generateRandom(40, 100);
        this.m_arrayToTest = utilityTools.generateRandomArray(-100, 40, itemCount);
        console.log(`array item count is ${itemCount}, origin array is ${this.m_arrayToTest}`);
        this.m_expectResult = getMaxSubSequenceBrute(this.m_arrayToTest);
        console.log(`expect result is `,this.m_expectResult);
    }

    private testCaseDivide() {
        const tempMaxsub = getMaxSubSequenceDivide(this.m_arrayToTest);
        const testResult = tempMaxsub.maxSubSum === this.m_expectResult.maxSubSum;
        console.log(`testResult is ${testResult},divide result is `, tempMaxsub);

    }
    private testCaseDynamic() {
        const tempMaxsub = getMaxSubSequenceDynamic(this.m_arrayToTest);
        const testResult = tempMaxsub.maxSubSum === this.m_expectResult.maxSubSum;
        console.log(`testResult is ${testResult},dynamic result is `,tempMaxsub);
    }
    private testCaseDevideByK() {
        const numMinSeq = utilityTools.generateRandom(1,10);
        const tempMaxsub = getMaxSubSequenceDivideByK(this.m_arrayToTest,numMinSeq);
        const testResult = tempMaxsub.maxSubSum === this.m_expectResult.maxSubSum;
        console.log(`divideK minSeqNum is ${numMinSeq}, testResult is ${testResult},divideK result is `,tempMaxsub);

    }
    runTest() {
        this.testCaseDivide();
        this.testCaseDevideByK();
        this.testCaseDynamic();
    }
}
const MaxSubSeqSum = new MaxSubDSequenceSum();
export default MaxSubSeqSum;

