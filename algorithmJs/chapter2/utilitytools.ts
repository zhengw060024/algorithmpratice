function generateRandom(min: number, max: number) {
    const range = max - min;
    const randNum = Math.floor(Math.random() * (1+range)) + min;
    return randNum;
}
// 这种写法是错误的，因为，以0，到10 为例子，0-0.4999999999之间产生的都是0，
// 9.5-到10之间的数值只有 8.5-9.5之间的一半，所以用这种方法产生的随机数
// 首尾只有普通数字的一半
function generateRandomOldErr(min: number, max: number) {
    const range = max - min;
    const randNum = Math.round(Math.random() * range) + min;
    return randNum;
}
function generateRandomArray(min: number, max: number, itemNum: number) {
    const ArrayRandom: Array<number> = [];
    for (let i = 0; i < itemNum; ++i) {
        ArrayRandom.push(generateRandom(min, max));
    }
    return ArrayRandom;
}

/**
 * 排序校验 不使用标准排序方法
 * @param ArrayInput 原始输入数组
 * @param ArrayOutput 待校验的排序完成数组
 */
function checkSequence(ArrayInput: Array<number>, ArrayOutput: Array<number>) {
    const objTemp: any = {};

    ArrayInput.forEach((value, index) => {
        if (objTemp[value]) {
            ++objTemp[value];
        } else {
            objTemp[value] = 1;
        }
    });
    for (let i = 0; i < ArrayOutput.length; ++i) {
        if (objTemp[ArrayOutput[i]]) {
            objTemp[ArrayOutput[i]] = objTemp[ArrayOutput[i]] - 1;
        } else {
            return false;
        }
    }
    for (let key in objTemp) {
        if (objTemp[key] !== 0) {
            return false;
        }
    }

    // 检查是否从小到大
    for (let i = 0; i < ArrayOutput.length - 1; ++i) {
        if (ArrayOutput[i] > ArrayOutput[i + 1]) {
            console.log('!!!!!!333')
            return false;
        }
    }
    return true;
}
/**
 * 排序检测，使用标准排序准则
 * @param ArrayInput 原始输入数组
 * @param ArrayOutput 待校验的排序完成数组
 */
function checkSeqUseStdSort(ArrayInput: Array<number>, ArrayOutput: Array<number>) {
    if (ArrayInput.length !== ArrayOutput.length) {
        return false;
    }
    const ArrayToSort = ArrayInput.concat([]);
    ArrayToSort.sort((a, b) => (a - b));
    for (let i = 0; i < ArrayToSort.length; ++i) {
        if (ArrayToSort[i] !== ArrayOutput[i]) {
            return false;
        }
    }
    return true;
}
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
interface utilityTools {
    generateRandom: (min: number, max: number) => number;
    generateRandomArray: (min: number, max: number, itemNum: number) => Array<number>;
    checkSequence: (ArrayInput: Array<number>, ArrayOutput: Array<number>) => boolean;
    checkSeqUseStdSort: (ArrayInput: Array<number>, ArrayOutput: Array<number>) => boolean;
    merge: (ArrayInput: Array<number>, start: number, middle: number, end: number) => void;
}
const utilityTools: utilityTools = {
    generateRandom: generateRandom,
    generateRandomArray: generateRandomArray,
    checkSequence: checkSequence,
    checkSeqUseStdSort: checkSeqUseStdSort,
    merge: merge
};
export default utilityTools;
