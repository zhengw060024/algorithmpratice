// 算法导论第二章中的思考题
class TestCaseQuestion {
    constructor() {

    }
}

// 2-1 在合并排序中对最小数组采用插入排序
/**
 * 归并排序归并过程
 * @param ArrayInput 
 * @param start 
 * @param middle 
 * @param end 
 */
function merge(ArrayInput: Array<number>, start: number, middle: number, end: number) {
    const ArrayFirst = ArrayInput.slice(start, middle + 1);
    const ArraySecond = ArrayInput.slice(middle + 1, end + 1);
    let i = 0, j = 0, k = 0;
    for (; i < ArrayFirst.length && j < ArraySecond.length; ++k) {
        if (ArrayFirst[i] < ArraySecond[j]) {
            ArrayInput[start + k] = ArrayFirst[i];
            ++i;
        } else {
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
        merge(ArrayInput, startSequenceId * subsequenceLen, (nMiddleSequenceId + 1) * subsequenceLen - 1, endIndex);
    }
}
const ArrayTest = [6, 4, 1, 35, 1, 6, 7, 9, 12, 56, 78, 9, 0, 12, 8, 15, 32, 7, 9, 5, 7, 8, 9, 15, 24];
console.log(ArrayTest);
console.log(ArrayTest.slice(0, ArrayTest.length).sort((a, b) => a - b));
console.log(ArrayTest);
mergeSequenceSort(ArrayTest, 5);

console.log(ArrayTest);