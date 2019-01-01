// 算法导论第二章中的思考题
import utilityTools from './utilitytools'
class TestCaseQuestion {
    constructor() {

    }
    /////归并排序修改版排序测试----------
    testCasemergeSequenceSort() {
        const sortNum = utilityTools.generateRandom(20, 70);
        console.log('zhengwei test testCasemergeSequenceSort', sortNum);
        const ArrayTest = utilityTools.generateRandomArray(1, 100, sortNum);
        const ArrayToSort = ArrayTest.concat([]);
        console.log(`orgin sequence is ${ArrayToSort}`);
        const sortMinK = utilityTools.generateRandom(2, 7);
        mergeSequenceSort(ArrayToSort, sortMinK);
        console.log(`sequence sorted is ${ArrayToSort}`);
        //utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort);
        console.log('mergeSequenceSort  testcase is ', utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    }
    /////归并排序修改版排序测试----------
    testCaseMergeSortMinSeqKWrap() {
        const sortNum = utilityTools.generateRandom(20, 70);
        console.log('zhengwei test testCaseMergeSortMinSeqKWrap', sortNum);
        const ArrayTest = utilityTools.generateRandomArray(1, 100, sortNum);
        const ArrayToSort = ArrayTest.concat([]);
        console.log(`orgin sequence is ${ArrayToSort}`);
        const sortMinK = utilityTools.generateRandom(2, 7);
        mergeSortMinSeqKWrap(ArrayToSort, sortMinK);
        console.log(`sequence sorted is ${ArrayToSort}`);
        //utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort);
        console.log('testCaseMergeSortMinSeqKWrap  testcase is ', utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    }
    ////冒泡排序测试
    testCaseBubbleSort() {
        const sortNum = utilityTools.generateRandom(20, 70);
        console.log('zhengwei test bubbleSort', sortNum);
        const ArrayTest = utilityTools.generateRandomArray(1, 100, sortNum);
        const ArrayToSort = ArrayTest.concat([]);
        console.log(`orgin sequence is ${ArrayToSort}`);
        bubbleSort(ArrayToSort);
        console.log(`sequence sorted is ${ArrayToSort}`);
        console.log('bubbleSort  testcase is ', utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    }
    ////冒泡排序优化版
    testCaseBubbleSortImprove() {
        const sortNum = utilityTools.generateRandom(20, 70);
        console.log('zhengwei test bubbleSortImprove', sortNum);
        const ArrayTest = utilityTools.generateRandomArray(1, 100, sortNum);
        const ArrayToSort = ArrayTest.concat([]);
        console.log(`orgin sequence is ${ArrayToSort}`);
        bubbleSortImprove(ArrayToSort);
        console.log(`sequence sorted is ${ArrayToSort}`);
        console.log('bubbleSortImprove  testcase is ', utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    }
    ////双向冒泡排序
    testCaseShakerSort() {
        const sortNum = utilityTools.generateRandom(20, 70);
        console.log('zhengwei test ShakerSort', sortNum);
        const ArrayTest = utilityTools.generateRandomArray(1, 100, sortNum);
        const ArrayToSort = ArrayTest.concat([]);
        console.log(`orgin sequence is ${ArrayToSort}`);
        ShakerSort(ArrayToSort);
        console.log(`sequence sorted is ${ArrayToSort}`);
        console.log('ShakerSort  testcase is ', utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    }
    ////霍纳多项式计算测试
    testCaseHuona() {
        const ArrayLenth = utilityTools.generateRandom(2, 9);
        const ArrayTest = utilityTools.generateRandomArray(1, 6, ArrayLenth);
        const xNum = utilityTools.generateRandom(1, 6);
        const result1 = polyValueHuona(ArrayTest, xNum);
        const result2 = polyValueNative(ArrayTest, xNum);
        console.log(`Array is ${ArrayTest},x is ${xNum},huo na poly result is ${result1},native poly result is ${result2},testcase is ${result1 === result2}`);
    }
    ////计算逆序数测试
    testCaseInversion(){
        const nNum = utilityTools.generateRandom(20, 70);
        console.log('zhengwei test testCaseInversion', nNum);
        const ArrayTest = utilityTools.generateRandomArray(1, 100, nNum);
        console.log(`orgin sequence is ${ArrayTest}`);
        const ArrayTemp = ArrayTest.concat([]);
        const result1 = inversionNum(ArrayTest);
        const result2 = mergeSortInversionWrap(ArrayTemp);
        console.log(`sorted sequence is ${ArrayTemp}`);
        console.log(`native result is ${result1}, mergeSortInversionWrap result is ${result2},testcase is ${result1 === result2}`);
    }
    runTest() {
        this.testCasemergeSequenceSort();
        this.testCaseMergeSortMinSeqKWrap();
        this.testCaseBubbleSort();
        this.testCaseBubbleSortImprove();
        this.testCaseShakerSort();
        this.testCaseHuona();
        this.testCaseInversion();
    }
}
const questionTestCase = new TestCaseQuestion();
export default questionTestCase;
/**
 * 归并排序修改版
 * @param ArrayInput 要排序的输入数组
 * @param subsequenceLen 子串长度
 */
function mergeSequenceSort(ArrayInput: Array<number>, subsequenceLen: number) {
    const endSequenceNum = Math.floor((ArrayInput.length - 1) / subsequenceLen);
    for (let i = 0; i < endSequenceNum; ++i) {
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
function insertSort(ArrayInput: Array<number>, begin: number, end: number) {
    for (let i = 1; i <= end; ++i) {
        let tempx = ArrayInput[i];
        let j = i - 1
        for (; j >= begin; --j) {
            if (ArrayInput[j] > tempx) {
                ArrayInput[j + 1] = ArrayInput[j];
            } else {
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
function mergeSequence(ArrayInput: Array<number>, startSequenceId: number,
    endSequenceId: number, subsequenceLen: number, endIndex: number) {
    if (startSequenceId < endSequenceId) {
        const nMiddleSequenceId: number = Math.floor((startSequenceId + endSequenceId) / 2);
        mergeSequence(ArrayInput, startSequenceId, nMiddleSequenceId, subsequenceLen, (nMiddleSequenceId + 1) * subsequenceLen - 1);
        mergeSequence(ArrayInput, nMiddleSequenceId + 1, endSequenceId, subsequenceLen, endIndex);
        // 归并
        utilityTools.merge(ArrayInput, startSequenceId * subsequenceLen, (nMiddleSequenceId + 1) * subsequenceLen - 1, endIndex);
    }
}

/////////////////////////////////////////
/////////归并排序第二版本，在递归排序的过程中
/////////判断子串大小是多少，小于一个上限k则
/////////调用插入排序，排序子串
/////////////////////////////////////////
function mergesortMinSeqK(ArrayInput: Array<number>, startIndex: number, endIndex: number, k: number) {
    if (endIndex - startIndex >= k) {
        const middleNum: number = Math.floor((startIndex + endIndex) / 2);
        mergesortMinSeqK(ArrayInput, startIndex, middleNum, k);
        mergesortMinSeqK(ArrayInput, middleNum + 1, endIndex, k);
        utilityTools.merge(ArrayInput, startIndex, middleNum, endIndex);

    } else {
        insertSort(ArrayInput, startIndex, endIndex);
    }
}
function mergeSortMinSeqKWrap(ArrayInput: Array<number>, subSequenceNum: number) {
    mergesortMinSeqK(ArrayInput, 0, ArrayInput.length - 1, subSequenceNum);
}

/////////////////////////////////////////////////////
///////// 冒泡排序算法导论习题2-2
/////////////////////////////////////////////////////
function bubbleSort(ArrayInput: Array<number>) {
    for (let i = 0; i < ArrayInput.length; ++i) {
        for (let j = ArrayInput.length - 1; j > i; --j) {
            if (ArrayInput[j] < ArrayInput[j - 1]) {
                const Temp = ArrayInput[j];
                ArrayInput[j] = ArrayInput[j - 1];
                ArrayInput[j - 1] = Temp;
            }
        }
    }
}
// 对冒泡排序的一个改进，记住上一次最后交换的位置，作为下一次循环的最终点。
// 当在一次循环中没交换时，说明已经排好顺序了，直接退出。
function bubbleSortImprove(ArrayInput: Array<number>) {
    for (let i = 0; i < ArrayInput.length;) {
        let k = -1;
        for (let j = ArrayInput.length - 1; j > i; --j) {
            if (ArrayInput[j] < ArrayInput[j - 1]) {
                const Temp = ArrayInput[j];
                ArrayInput[j] = ArrayInput[j - 1];
                ArrayInput[j - 1] = Temp;
                k = j;
            }
        }
        // 如果在一次循环中没有交换说明已经排好顺序了，直接退出
        if (k === -1) {
            return;
        } else {
            i = k;
        }
    }
}
// 冒泡排序，双向冒泡排序
function ShakerSort(ArrayInput: Array<number>) {
    let left = 0;
    let right = ArrayInput.length - 1;

    while (left < right) {
        let rightCpFlat = -1;
        let leftCpFlat = -1;
        for (let j = left; j < right; ++j) {
            if (ArrayInput[j] > ArrayInput[j + 1]) {
                const Temp = ArrayInput[j];
                ArrayInput[j] = ArrayInput[j + 1];
                ArrayInput[j + 1] = Temp;
                rightCpFlat = j;
            }
        }
        if (rightCpFlat === -1) {
            return;
        }
        right = rightCpFlat;
        for (let j = right; j > left; --j) {
            if (ArrayInput[j - 1] > ArrayInput[j]) {
                const Temp = ArrayInput[j];
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
function polyValueHuona(ArrayPoly: Array<number>, xValue: number) {
    let yResult = 0;
    for (let i = ArrayPoly.length - 1; i >= 0; --i) {
        yResult = yResult * xValue + ArrayPoly[i];
    }
    return yResult;
}
// 朴素多项式计算
function polyValueNative(ArrayPoly: Array<number>, xValue: number) {
    let yResult = 0;
    for (let i = 0; i < ArrayPoly.length; ++i) {
        let xTemp = 1;
        for (let j = 0; j < i; ++j) {
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
function inversionNum(ArrayInput: Array<number>): number {
    let inversionNum: number = 0;
    for (let i = 0; i < ArrayInput.length; ++i) {
        for (let j = i + 1; j < ArrayInput.length; ++j) {
            if (ArrayInput[i] > ArrayInput[j]) {
                ++inversionNum;
            }
        }
    }
    return inversionNum;
}
//逆序队归并算法，在归并排序过程中增加计数器，计算逆序队数目。
function mergeSortInversionWrap(ArrayInput: Array<number>) {
    return mergeSortInversion(ArrayInput, 0, ArrayInput.length - 1);
}
/**
 * 归并排序计算逆序对
 * @param ArrayInput 
 * @param start 
 * @param end 
 */
function mergeSortInversion(ArrayInput: Array<number>, start: number, end: number) {
    let nNumReturn = 0;
    if (start < end) {
        const middle = Math.floor((start + end) / 2);
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
function mergeInversion(ArrayInput: Array<number>, start: number, middle: number, end: number) {
    let nNumInversion = 0;
    const ArrayFirst = ArrayInput.slice(start, middle + 1);
    const ArraySecond = ArrayInput.slice(middle + 1, end + 1);
    let i = 0, j = 0, k = 0;
    for (; i < ArrayFirst.length && j < ArraySecond.length; ++k) {
        if (ArraySecond[j] < ArrayFirst[i]) {
            ArrayInput[start + k] = ArraySecond[j];
            ++j;

        } else {
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