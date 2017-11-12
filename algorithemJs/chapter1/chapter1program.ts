/**
 * 算法导论第一章的算法和习题js实现练习
 * 2017.11.11
 */
import utilityTools from './utilitytools'

function checkSequence(ArrayInput: Array<number>) {
    for (let i = 0; i < ArrayInput.length - 1; ++i) {
        if (ArrayInput[i] > ArrayInput[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * 插入排序
 */
function insertSort(ArrayInput: Array<number>) {

    for (let i = 1; i < ArrayInput.length; ++i) {
        const keyNum = ArrayInput[i];
        let j = i - 1
        for (; j >= 0; --j) {
            if (ArrayInput[j] > keyNum) {
                ArrayInput[j + 1] = ArrayInput[j];
            } else {
                break;
            }
        }
        ArrayInput[j + 1] = keyNum;
    }
    return ArrayInput;
}
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
function mergeSort(ArrayInput: Array<number>, start: number, end: number) {
    if (start < end) {
        const middle = Math.floor((start + end) / 2);
        mergeSort(ArrayInput, start, middle);
        mergeSort(ArrayInput, middle + 1, end);
        merge(ArrayInput, start, middle, end);
    }
    return ArrayInput;
}

console.log(insertSort([3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8]));
const ArrayMerge = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];
mergeSort(ArrayMerge, 0, ArrayMerge.length - 1);
console.log(ArrayMerge);
function testCaseInsertSort() {
    const ArrayTest = utilityTools.generateRandomArray(1,100,20);
    console.log(`orgin sequence is ${ArrayTest}`);
    insertSort(ArrayTest);
    console.log(`sequence sorted is ${ArrayTest}`);
}