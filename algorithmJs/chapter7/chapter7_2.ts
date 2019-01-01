//这里的主要是思考题7.2 以及7.6，从本质上来说，其实他们算的上是同一个问题
// 思考题7.2考虑到含有相同元素的划分。
import utilityTools from "./utilitytools";
function quickDepart(arrayInput: Array<number>, nStartIndex: number, nEndIndex: number) {
    // 假设枢轴为nStartIndex
    let i = nStartIndex, j = nStartIndex + 1, k = nStartIndex;
    let nTemp = arrayInput[i];
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (arrayInput[j] < nTemp) {
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++k];
            ++i;
        } else if (arrayInput[j] === nTemp) {
            //arrayInput[k] = arrayInput[j];
            // arrayInput[k] = nTemp;
            arrayInput[j] = arrayInput[++k];
        }
    }
    for (let t = i; t <= k; ++t) {
        arrayInput[t] = nTemp;
    }

    return [i, k];
}
// 算法导论思考题7.6,其本质上就是对有重复数据的排序 。 备注这是我一开始的想法后来才发现这种想法是错误的，
// 因为判断有重合点的range之后并不因为这些range有序，需要使用额外的判断来决定这些range的顺序
// 原因是：对于T类型a，b，c  a- b === 0， b -c ===0 并不能推导出
// a - c === 0,也是就，等号的传递性并不能满足，例如对于区域 a=[1,5],b=[3,9],c=[6,12]可以推导出
// a,b有交集，bc有交集，但是ac确实没有交集的。在这个线性空间内不满足等号的传递性。
function quickDepartTemplate<T>(arrayInput: Array<T>, nStartIndex: number, nEndIndex: number,
    cmp: (c: T, d: T) => number) {
    // 假设枢轴为nStartIndex
    let tempAxis = arrayInput[nStartIndex];
    let i = nStartIndex, j = nStartIndex + 1, k = nStartIndex;
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (cmp(arrayInput[j], arrayInput[i]) < 0) {
            let nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++k];
            // 备注：加上的这些部分是为了保持i始终是枢轴。
            arrayInput[k] = arrayInput[++i];
            arrayInput[i] = nTemp;
        } else if (cmp(arrayInput[j], arrayInput[i]) === 0) {
            let nTemp = arrayInput[++k];
            arrayInput[k] = arrayInput[j];
            arrayInput[j] = nTemp;
        }
    }
    if (tempAxis !== arrayInput[i]) {
        throw new Error('axis changed!!!!');
    }
    return [i, k];
}

function quickSortImp<T>(arrayInput: Array<T>, nStartIndex: number, nEndIndex: number,
    cmp: (a: T, b: T) => number) {
    while (nStartIndex < nEndIndex) {
        const nDepartArray = quickDepartTemplate<T>(arrayInput, nStartIndex, nEndIndex, cmp);
        // 对较短端进行递归
        if (nDepartArray[0] - nStartIndex < nEndIndex - nDepartArray[1]) {
            quickSortImp(arrayInput, nDepartArray[1] + 1, nEndIndex, cmp);
            nEndIndex = nDepartArray[0] - 1;
        } else {
            quickSortImp(arrayInput, nStartIndex, nDepartArray[0] - 1, cmp);
            nStartIndex = nDepartArray[1] + 1;
        }
    }
}
function quickSort<T>(arrayInput: Array<T>, cmp: (a: T, b: T) => number) {
    quickSortImp(arrayInput, 0, arrayInput.length - 1, cmp);
}

class NumRange {
    constructor(start: number, end: number, rangeId: number) {
        if (start > end) {
            throw new Error('illgel ranage');
        }
        this.m_start = start;
        this.m_end = end;
        this.m_rangeID = rangeId;
    }
    m_start: number;
    m_end: number;
    m_rangeID: number;
}
function generateTestRange(nMin: number, nMax: number, rangeNum: number) {
    const arrayTemp: Array<NumRange> = [];
    for (let i = 0; i < rangeNum; ++i) {
        let nStart = utilityTools.generateRandom(nMin, nMax);
        let nEnd = utilityTools.generateRandom(nStart, nMax);
        arrayTemp.push(new NumRange(nStart, nEnd, i));
    }
    return arrayTemp;
}
// 算法导论7-6正确的解法：
function quickDepartRange(arrayInput: Array<NumRange>, nStartIndex: number, nEndIndex: number) {
    // 假设枢轴为nStartIndex
    let cmp1 = (a: NumRange, b: NumRange): number => {
        if (a.m_start <= b.m_start) {
            if (a.m_end >= b.m_start) {
                return 0;
            }
            return -1;
        } else {
            if (b.m_end >= a.m_start) {
                return 0;
            }
            return 1;
        }
    }
    // 这里需要特别注意一下，每一次归并之后都要修改一下枢轴！！！！！！！！！！
    // 这也是为什么不用quickSort的原因所在
    let tempAxis = new NumRange(arrayInput[nStartIndex].m_start,arrayInput[nStartIndex].m_end,
    arrayInput[nStartIndex].m_rangeID);
    let i = nStartIndex, j = nStartIndex + 1, kEnd = nStartIndex;
    let kStart = nStartIndex;
    
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (cmp1(arrayInput[j], tempAxis) < 0) {
            let nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++kEnd];
            // 备注：加上的这些部分是为了保持i始终是枢轴。
            arrayInput[kEnd] = arrayInput[++i];
            arrayInput[i] = nTemp;
        } else if (cmp1(arrayInput[j], tempAxis) === 0) {
            tempAxis.m_end = arrayInput[j].m_end < tempAxis.m_end?arrayInput[j].m_end:tempAxis.m_end;
            tempAxis.m_start = arrayInput[j].m_start < tempAxis.m_start?tempAxis.m_start:arrayInput[j].m_start;
            let nTemp = arrayInput[++kEnd];
            arrayInput[kEnd] = arrayInput[j];
            arrayInput[j] = nTemp;
            
        }
    }
    // if (tempAxis !== arrayInput[i]) {
    //     throw new Error('axis changed!!!!');
    // }
    console.log('划分的枢轴是：',[i,kEnd]);
    return [i, kEnd];
}
function quickSortImpRange(arrayInput: Array<NumRange>, nStartIndex: number, nEndIndex: number) {
    while (nStartIndex < nEndIndex) {
        const nDepartArray = quickDepartRange(arrayInput, nStartIndex, nEndIndex);
        // 对较短端进行递归
        if (nDepartArray[0] - nStartIndex < nEndIndex - nDepartArray[1]) {
            quickSortImpRange(arrayInput, nDepartArray[1] + 1, nEndIndex);
            nEndIndex = nDepartArray[0] - 1;
        } else {
            quickSortImpRange(arrayInput, nStartIndex, nDepartArray[0] - 1);
            nStartIndex = nDepartArray[1] + 1;
        }
    }
}
function quickSortRange(arrayInput: Array<NumRange>) {
    quickSortImpRange(arrayInput, 0, arrayInput.length - 1);
}
class TestCase {
    constructor() {

    }

    private testCase7_6() {
        const arrayNum = utilityTools.generateRandom(500, 700);
        const arrayInput = generateTestRange(1, 2000, arrayNum);
        console.log(`arrayNum is ${arrayNum}`);
        const arrayToSort = arrayInput.concat();

        quickSortRange(arrayToSort);
        // console.log(arrayToSort);
        const arrayToCheck = arrayInput.concat();
        let checkResult = this.checkRangeSort(arrayToSort,arrayToCheck);
        if(checkResult) {
            console.log('range sort right!!!');
        }
    }
    private checkRangeSort(arrayToSort:Array<NumRange>,arrayToCheck:Array<NumRange>) {
        // 检测顺序是否正确。
        let cmp1 = (a: NumRange, b: NumRange): number => {
            if (a.m_start <= b.m_start) {
                if (a.m_end >= b.m_start) {
                    return 0;
                }
                return -1;
            } else {
                if (b.m_end >= a.m_start) {
                    return 0;
                }
                return 1;
            }
        }
        for(let i = 0; i < arrayToSort.length; ++i) {
            for(let j = i + 1; j < arrayToSort.length; ++j) {
                if(cmp1(arrayToSort[i],arrayToSort[j]) > 0) {
                    console.log('sequence order is not right!!!',i,j);
                    return false;
                } 
            }
        }
        let cmp2 = (a:NumRange,b:NumRange) => {
            return a.m_rangeID - b.m_rangeID;
        }
        let arrayTemp = arrayToSort.concat();
        if(arrayTemp.length !== arrayToCheck.length) {
            console.log('sequece number is not right!!!');
            return false;
        }
        arrayTemp.sort(cmp2);
        arrayToCheck.sort(cmp2);
        for(let i = 0; i< arrayTemp.length; ++i) {
            if((arrayTemp[i].m_rangeID !== arrayToCheck[i].m_rangeID )||
            (arrayTemp[i].m_end !== arrayToCheck[i].m_end) || 
            (arrayTemp[i].m_start !== arrayToCheck[i].m_start)) {
                console.log('sequence item changed!!!');
                return false;
            }
        }
        return true;
    }
    private testDepart() {
        const ItemCount = utilityTools.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        const arrayInput = utilityTools.generateRandomArray(1, 10, ItemCount);
        console.log(`orgin array is ${arrayInput}`);
        const arrayToDepart = arrayInput.concat();
        let nReturnTuple = quickDepart(arrayToDepart, 0, arrayInput.length - 1);
        console.log(`depart index is ${nReturnTuple} `);
        console.log(`departed array is ${arrayToDepart}`);
        const bCheckDepartSuccess = this.checkArrayDepartSuccess(arrayToDepart, arrayInput, nReturnTuple[0], nReturnTuple[1]);
        if (bCheckDepartSuccess) {
            console.log('check depart is success!!!');
        } else {
            console.log('check depart is error!!!')
        }
    }
    private testDepartTemplate() {
        const ItemCount = utilityTools.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        const arrayInput = utilityTools.generateRandomArray(1, 10, ItemCount);
        console.log(`orgin array is ${arrayInput}`);
        const arrayToDepart = arrayInput.concat();
        let cmp = (a: number, b: number) => {
            return a - b;
        };
        let nReturnTuple = quickDepartTemplate<number>(arrayToDepart, 0, arrayInput.length - 1, cmp);
        console.log(`depart index is ${nReturnTuple} `);
        console.log(`departed array is ${arrayToDepart}`);
        const bCheckDepartSuccess = this.checkArrayDepartSuccessTemplate<number>(arrayToDepart, arrayInput, nReturnTuple[0], nReturnTuple[1], cmp);
        if (bCheckDepartSuccess) {
            console.log('check depart is success!!!');
        } else {
            console.log('check depart is error!!!')
        }
    }
    private testCaseQickSort() {
        const ItemCount = utilityTools.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        const arrayInput = utilityTools.generateRandomArray(1, 1000, ItemCount);
        console.log(`orgin array is ${arrayInput}`);
        const arrayToSort = arrayInput.concat();
        let cmp = (a: number, b: number) => {
            return b - a;
        };
        quickSort(arrayToSort, cmp);
        const arrayToCheck = arrayInput.concat().sort(cmp);
        // 检查排序合法性
        if (arrayToSort.length !== arrayToCheck.length) {
            console.log('quicksort failed!!!');
            return;
        }
        console.log(`quick sort result is ${arrayToSort}`);
        console.log(`right sequence is ${arrayToCheck}`);
        for (let i = 0; i < arrayToCheck.length; ++i) {
            if (cmp(arrayToCheck[i], arrayToSort[i]) !== 0) {
                console.log('quicksort failed!!!,some item sequence is not right');
                return;
            }
        }
        console.log('quickSort is right!!!');

    }
    private checkArrayDepartSuccess(arrayInput: Array<number>, arrayOrgin: Array<number>
        , rangeSameStart: number, rangeSameEnd: number) {
        if (arrayInput.length !== arrayOrgin.length) {
            return false;
        }
        for (let i = 0; i < rangeSameStart; ++i) {
            if (arrayInput[i] >= arrayInput[rangeSameStart]) {
                return false;
            }
        }
        for (let j = rangeSameEnd + 1; j < arrayInput.length; ++j) {
            if (arrayInput[j] <= arrayInput[rangeSameEnd]) {
                return false;
            }
        }
        for (let i = rangeSameStart; i <= rangeSameEnd; ++i) {
            if (arrayInput[i] != arrayInput[rangeSameStart]) {
                return false;
            }
        }
        const arrayInputTemp = arrayInput.sort((a: number, b: number) => {
            return a - b;
        });
        const arrayOrginTemp = arrayInput.sort((a: number, b: number) => {
            return a - b;
        });
        for (let i = 0; i < arrayInputTemp.length; ++i) {
            if (arrayInputTemp[i] !== arrayOrginTemp[i]) {
                return false;
            }
        }
        return true;
    }
    private checkArrayDepartSuccessTemplate<T>(arrayInput: Array<T>, arrayOrgin: Array<T>
        , rangeSameStart: number, rangeSameEnd: number, cmp: (a: T, b: T) => number) {
        if (arrayInput.length !== arrayOrgin.length) {
            return false;
        }
        for (let i = 0; i < rangeSameStart; ++i) {
            if (cmp(arrayInput[i], arrayInput[rangeSameStart]) >= 0) {
                return false;
            }
        }
        for (let j = rangeSameEnd + 1; j < arrayInput.length; ++j) {
            if (cmp(arrayInput[j], arrayInput[rangeSameEnd]) <= 0) {
                return false;
            }
        }
        for (let i = rangeSameStart; i <= rangeSameEnd; ++i) {
            if (cmp(arrayInput[i], arrayInput[rangeSameStart]) !== 0) {
                return false;
            }
        }
        const arrayInputTemp = arrayInput.sort(cmp);
        const arrayOrginTemp = arrayInput.sort(cmp);
        for (let i = 0; i < arrayInputTemp.length; ++i) {
            if (arrayInputTemp[i] !== arrayOrginTemp[i]) {
                return false;
            }
        }
        return true;
    }
    runTestCase() {
        this.testDepart();
        this.testDepartTemplate();
        this.testCaseQickSort();
        this.testCase7_6();
    }
}
const testCaseItem = new TestCase();
export default testCaseItem;
//testCaseItem.runTestCase();