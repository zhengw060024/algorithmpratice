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
function quickDepartTemplate<T>(arrayInput: Array<T>, nStartIndex: number, nEndIndex: number,
    cmp: (a: T, b: T) => number) {
        // 假设枢轴为nStartIndex
        let i = nStartIndex, j = nStartIndex + 1, k = nStartIndex;
        for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
            if (cmp(arrayInput[j],arrayInput[i]) < 0) {
                let nTemp = arrayInput[i];
                arrayInput[i] = arrayInput[j];
                arrayInput[j] = arrayInput[++k];
                arrayInput[k] = nTemp;
                ++i;
            } else if(cmp(arrayInput[j],arrayInput[i]) === 0) {
                let nTemp = arrayInput[i];
                arrayInput[i] = arrayInput[j];
                arrayInput[j] = arrayInput[++k];
                arrayInput[k] = nTemp;
            }
        }
        return [i, k];    
}
class TestCase {
    constructor() {

    }
    testDepart() {
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
    testDepartTemplate() {
        const ItemCount = utilityTools.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        const arrayInput = utilityTools.generateRandomArray(1, 10, ItemCount);
        console.log(`orgin array is ${arrayInput}`);
        const arrayToDepart = arrayInput.concat();
        let nReturnTuple = quickDepartTemplate<number>(arrayToDepart, 0, arrayInput.length - 1,(a:number,b:number) => {
            return a - b;
        });
        console.log(`depart index is ${nReturnTuple} `);
        console.log(`departed array is ${arrayToDepart}`);
        const bCheckDepartSuccess = this.checkArrayDepartSuccess(arrayToDepart, arrayInput, nReturnTuple[0], nReturnTuple[1]);
        if (bCheckDepartSuccess) {
            console.log('check depart is success!!!');
        } else {
            console.log('check depart is error!!!')
        }
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
}
const testCaseItem = new TestCase();
testCaseItem.testDepartTemplate();