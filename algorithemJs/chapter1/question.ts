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
function inserSort(ArrayInput: Array<number>, begin: number, end: number) {

}
function mergeSequenceSort(ArrayInput: Array<number>, subsequenceLen: number) {
    const endSequenceNum = Math.floor(ArrayInput.length / subsequenceLen);
    mergeSequence(ArrayInput, 0, endSequenceNum, subsequenceLen, ArrayInput.length - 1);
}
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