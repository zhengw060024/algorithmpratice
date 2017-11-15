/**
 * 算法导论第一章的算法和习题js实现练习
 * 2017.11.11
 */
import utilityTools from './utilitytools'
/**
 * 排序校验 不使用标准排序方法
 * @param ArrayInput 
 * @param ArrayOutput 
 */
function checkSequence(ArrayInput: Array<number>, ArrayOutput: Array<number>) {
    const objTemp: any = {};
    ArrayInput.forEach((value, indxe) => {
        if (objTemp[value]) {
            ++objTemp[value];
        } else {
            objTemp[value] = 1;
        }
    });
    for (let i = 0; i < ArrayOutput.length - 1; ++i) {
        if (objTemp[ArrayOutput[i]]) {
            --objTemp[ArrayOutput[i]];
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
            return false;
        }
    }
    return true;
}
/**
 * 排序检测，使用标准排序准则
 * @param ArrayInput 
 * @param ArrayOutput 
 */
function checkSeqUseStdSort(ArrayInput: Array<number>, ArrayOutput: Array<number>) {
    if (ArrayInput.length !== ArrayOutput.length) {
        return false;
    }
    const ArrayToSort = ArrayInput.concat([]);
    ArrayToSort.sort();
    for (let i = 0; i < ArrayToSort.length; ++i) {
        if (ArrayToSort[i] !== ArrayOutput[i]) {
            return false;
        }
    }
    return true;
}
///////////////////////////////////////////////////////////////////
////////////插入排序
///////////////////////////////////////////////////////////////////
/**
 * 插入排序非递归
 * @param ArrayInput 
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
/**
 * 插入排序递归
 * @param ArrayInput 
 * @param nNumToSort 要排序的的最后一个关键字的index
 */
function insertSortRecursion(ArrayInput: Array<number>, nNumToSort: number) {
    if (nNumToSort === 0) {
        return;
    }
    insertSortRecursion(ArrayInput, nNumToSort - 1);
    const keyItem = ArrayInput[nNumToSort];
    let i = nNumToSort - 1
    for (; i >= 0; --i) {
        if (ArrayInput[i] > keyItem) {
            ArrayInput[i + 1] = ArrayInput[i];
        } else {
            break;
        }
    }
    ArrayInput[i + 1] = keyItem;
}
//////////////////////////////////////////////////////////
////////////归并排序
//////////////////////////////////////////////////////////
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
 * 归并排序
 * @param ArrayInput 
 * @param start 
 * @param end 
 */
function mergeSort(ArrayInput: Array<number>, start: number, end: number) {
    if (start < end) {
        const middle = Math.floor((start + end) / 2);
        mergeSort(ArrayInput, start, middle);
        mergeSort(ArrayInput, middle + 1, end);
        merge(ArrayInput, start, middle, end);
    }
    return ArrayInput;
}
////////////////////////////////////////////////////////
//////// 二分查找法 
////////////////////////////////////////////////////////
/**
 * 二分查找法迭代
 * @param ArraySorted 
 * @param NumToSearch 
 */
function binarySearchIteration(ArraySorted: Array<number>, NumToSearch: number) {
    let nStart = 0; let nEnd = ArraySorted.length - 1;
    while (nStart < nEnd) {
        let nMiddle = Math.floor((nEnd + nStart) / 2)
        if (ArraySorted[nMiddle] === NumToSearch) {
            return nMiddle;
        }
        if (ArraySorted[nMiddle] < NumToSearch) {
            nStart = nMiddle + 1;
        } else {
            nEnd = nMiddle - 1;
        }
    }
    if (nStart === nEnd) {
        if (ArraySorted[nStart] === NumToSearch) {
            return nStart;
        }
    }
    return - 1;
}
function binarySearchRecursion(ArraySorted: Array<number>, NumberSearch: number,
    nStartIndex: number, nEndIndex: number): number {
    if (nStartIndex < nEndIndex) {
        const nMiddle: number = Math.floor((nEndIndex + nStartIndex) / 2);
        if (ArraySorted[nMiddle] === NumberSearch) {
            return nMiddle;
        }
        if (ArraySorted[nMiddle] > NumberSearch) {
            return binarySearchRecursion(ArraySorted, NumberSearch, nStartIndex, nMiddle - 1);
        } else {
            return binarySearchRecursion(ArraySorted, NumberSearch, nMiddle + 1, nEndIndex);
        }
    } else if (nStartIndex === nEndIndex) {
        if (NumberSearch === ArraySorted[nStartIndex]) {
            return nStartIndex;
        }
        return - 1;
    } else {
        return - 1;
    }
}
////////////////////////////////////////////////////////////////
//////////习题2.3.7在n个整数集合中判断是否有两个数之和等于x的元素
////////////////////////////////////////////////////////////////
///////对于这个问题假设输入序列为a[1-n],则通过min(a[n]) + max(a[n]) 和x的比较
//////如果大于x则排除max(a[n])，如果小于x则排除min(a[n])，只要能序列化的测试
/////排除过数据数组的最大和最小序列对即可。二最方便的测试是将该序列排序，然后测试
//////最大最小，不断排除。算法是o(n) + n*lg(n),至于有没有更好的算法，关键还是在于
//////怎样组织出最大最小测试序列对。

/////测试----------
console.log(insertSort([3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8]));
const ArrayMerge = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];
const ArrayMerge2 = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];

ArrayMerge2.sort((a, b) => {
    return a - b;
});
console.log(`standard sort ${ArrayMerge2}`);
const ArrayMerge3 = [3, 5, 1, 8, 1, 5, 0, 12, 1, 3, 4, 5, 7, 8];
insertSortRecursion(ArrayMerge3, ArrayMerge3.length - 1);
console.log(`insert sort ${ArrayMerge3}`);

mergeSort(ArrayMerge, 0, ArrayMerge.length - 1);
console.log(ArrayMerge);
console.log('binarySearchIteration test', binarySearchIteration(ArrayMerge, 12));
console.log('binarySearchRecursion test', binarySearchRecursion(ArrayMerge, 12, 0, ArrayMerge.length - 1));
function testCaseInsertSort() {
    const ArrayTest = utilityTools.generateRandomArray(1, 100, 20);
    console.log(`orgin sequence is ${ArrayTest}`);
    insertSort(ArrayTest);
    console.log(`sequence sorted is ${ArrayTest}`);
}
