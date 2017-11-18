// 算法导论第二章中的思考题
import utilityTools from './utilitytools'
class TestCaseQuestion {
    constructor() {

    }
    /////归并排序修改版排序测试----------
    testCasemergeSequenceSort() {
        const sortNum = utilityTools.generateRandom(20, 70);
        console.log('zhengwei test testCasemergeSequenceSort',sortNum);
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
        console.log('zhengwei test testCaseMergeSortMinSeqKWrap',sortNum);
        const ArrayTest = utilityTools.generateRandomArray(1, 100, sortNum);
        const ArrayToSort = ArrayTest.concat([]);
        console.log(`orgin sequence is ${ArrayToSort}`);
        const sortMinK = utilityTools.generateRandom(2, 7);
        mergeSortMinSeqKWrap(ArrayToSort, sortMinK);
        console.log(`sequence sorted is ${ArrayToSort}`);
        //utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort);
        console.log('testCaseMergeSortMinSeqKWrap  testcase is ', utilityTools.checkSeqUseStdSort(ArrayTest, ArrayToSort));
    }
    runTest() {
        this.testCasemergeSequenceSort();
        this.testCaseMergeSortMinSeqKWrap();
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

// const ArrayTest = [6, 4, 1, 35, 1, 6, 7, 9, 12, 56, 78, 9, 0, 12, 8, 15, 32, 7, 9, 5, 7, 8, 9, 15, 24];
// console.log(ArrayTest);
// console.log(ArrayTest.slice(0, ArrayTest.length).sort((a, b) => a - b));
// console.log(ArrayTest);
// mergeSequenceSort(ArrayTest, 7);

// console.log(ArrayTest);