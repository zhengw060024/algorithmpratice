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
    runTest() {
        this.testCasemergeSequenceSort();
        this.testCaseMergeSortMinSeqKWrap();
        this.testCaseBubbleSort();
        this.testCaseBubbleSortImprove();
        this.testCaseShakerSort();
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
    let rightCpFlat = -1;
    let leftCpFlat = -1;
    while (left < right) {
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