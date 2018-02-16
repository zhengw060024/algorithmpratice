import utilityTools from './utilitytools'
function ajustMaxHeapRecur(indexStart: number, arrayHeap: Array<number>) {
    const leftChild = indexStart * 2 + 1;
    const rightChild = indexStart * 2 + 2;
    if (leftChild > arrayHeap.length - 1) {
        return;
    }
    let nNextIndex = leftChild;
    if (rightChild < arrayHeap.length) {
        if (arrayHeap[rightChild] > arrayHeap[leftChild]) {
            nNextIndex = rightChild;
        }
    }
    if (arrayHeap[indexStart] < arrayHeap[nNextIndex]) {
        const temp = arrayHeap[indexStart];
        arrayHeap[indexStart] = arrayHeap[nNextIndex];
        arrayHeap[nNextIndex] = temp;
        ajustMaxHeapRecur(nNextIndex, arrayHeap);
    }
}
function makeMaxHeapRecur(arrayInput: Array<number>) {
    const nStart = Math.floor((arrayInput.length - 2) / 2);
    for (let index = nStart; index >= 0; --index) {
        ajustMaxHeapRecur(index, arrayInput);
    }
}
function ajustMaxHeapNoRecur(indexStart: number, arrayHeap: Array<number>) {

    while (indexStart < arrayHeap.length) {
        const leftChild = indexStart * 2 + 1;
        const rightChild = indexStart * 2 + 2;
        if (leftChild > arrayHeap.length - 1) {
            return;
        }
        let nNextIndex = leftChild;
        if (rightChild < arrayHeap.length) {
            if (arrayHeap[rightChild] > arrayHeap[leftChild]) {
                nNextIndex = rightChild;
            }
        }
        if (arrayHeap[indexStart] < arrayHeap[nNextIndex]) {
            const temp = arrayHeap[indexStart];
            arrayHeap[indexStart] = arrayHeap[nNextIndex];
            arrayHeap[nNextIndex] = temp;
            indexStart = nNextIndex;
        } else {
            return;
        }
    }
}
function makeMaxHeapNoRecur(arrayInput: Array<number>) {
    const nStart = Math.floor((arrayInput.length - 2) / 2);
    for (let index = nStart; index >= 0; --index) {
        ajustMaxHeapNoRecur(index, arrayInput);
    }
}
function checkArrayMinHeap(arrayInput: Array<number>) {
    let indexCheckEnd = Math.floor (arrayInput.length / 2);
    let i = 0;
    for(let i = 0; i < indexCheckEnd - 1; ++i) {
        if(!(arrayInput[i] <= arrayInput[2*i + 1] 
            && arrayInput[i] <= arrayInput[2*i + 2])){
                return false;
            }
    }
    if(indexCheckEnd - 1 >= 0) {
        if(indexCheckEnd * 2 < arrayInput.length) {
            if(arrayInput[indexCheckEnd - 1] > arrayInput[indexCheckEnd * 2]) {
                return false;
            }
        }
        if(arrayInput[indexCheckEnd - 1] > arrayInput[indexCheckEnd * 2 - 1]) {
            return false;
        }
    }
    return true;
    
}
function checkArrayMaxHeap(arrayInput: Array<number>) {
    let indexCheckEnd = Math.floor (arrayInput.length / 2);
    let i = 0;
    for(let i = 0; i < indexCheckEnd - 1; ++i) {
        if(!(arrayInput[i] >= arrayInput[2*i + 1] 
            && arrayInput[i] >= arrayInput[2*i + 2])){
                return false;
            }
    }
    if(indexCheckEnd - 1 >= 0) {
        if(indexCheckEnd * 2 < arrayInput.length) {
            if(arrayInput[indexCheckEnd - 1] < arrayInput[indexCheckEnd * 2]) {
                return false;
            }
        }
        if(arrayInput[indexCheckEnd - 1] < arrayInput[indexCheckEnd * 2 - 1]) {
            return false;
        }
    }
    return true;

}

function ajustMaxHeapForSort(indexStart: number, arrayHeap: Array<number>,endIndex:number) {
    while (indexStart < endIndex + 1) {
        const leftChild = indexStart * 2 + 1;
        const rightChild = indexStart * 2 + 2;
        if (leftChild > endIndex) {
            return;
        }
        let nNextIndex = leftChild;
        if (rightChild < endIndex + 1) {
            if (arrayHeap[rightChild] > arrayHeap[leftChild]) {
                nNextIndex = rightChild;
            }
        }
        if (arrayHeap[indexStart] < arrayHeap[nNextIndex]) {
            const temp = arrayHeap[indexStart];
            arrayHeap[indexStart] = arrayHeap[nNextIndex];
            arrayHeap[nNextIndex] = temp;
            indexStart = nNextIndex;
        } else {
            return;
        }
    }
}
// 堆排序算法
function heapSort(arrayInput:Array<number>) {
    makeMaxHeapNoRecur(arrayInput);
    for (let i = arrayInput.length - 1; i > 0; --i) {
        const Temp = arrayInput[0];
        arrayInput[0] = arrayInput[i];
        arrayInput[i] = Temp;
        ajustMaxHeapForSort(0,arrayInput,i - 1);
    }
}
class HeapTest {
    constructor() {
        
    }
    private runTestIsAheap() {
        const arrayTemp = [23,17,14,12,13,10,1,5,7,6];
        const bResult = checkArrayMaxHeap(arrayTemp);
        if(bResult){
            console.log("this is a heap!");
        } else {
            console.log("this is a not heap!");
        }
    }
    private runTestMakeHeapRecur() {
        const arrayOrgin = utilityTools.generateRandomArray(10,1000,20);
        console.log('原始数组是：')
        console.log(`${arrayOrgin}`);
        const arrayTemp = arrayOrgin.concat();
        makeMaxHeapRecur(arrayTemp);
        const bResult = checkArrayMaxHeap(arrayTemp);
        console.log('新数组是:');
        console.log(`${arrayTemp}`);
        if(bResult) {
            console.log("make the array by recurway to a heap success!");
        } else {
            console.log("make the array by recurway to a heap err!");
        }
    }

    private runTestMakeHeapNoRecur() {
        const arrayOrgin = utilityTools.generateRandomArray(10,1000,20);
        console.log('原始数组是：')
        console.log(`${arrayOrgin}`);
        const arrayTemp = arrayOrgin.concat();
        makeMaxHeapNoRecur(arrayTemp);
        const bResult = checkArrayMaxHeap(arrayTemp);
        console.log('新数组是:');
        console.log(`${arrayTemp}`);
        if(bResult) {
            console.log("make the array by norecurway to a heap success!");
        } else {
            console.log("make the array by norecurway to a heap err!");
        }
    }

    private runTestHeapSort() {
        const arrayOrgin = utilityTools.generateRandomArray(10,1000,20);
        console.log('原始数组是：')
        console.log(`${arrayOrgin}`);
        const arrayTemp = arrayOrgin.concat();
        heapSort(arrayTemp);
        console.log('新数组是:');
        console.log(`${arrayTemp}`);
    }
    runTest() {
        this.runTestIsAheap();
        this.runTestMakeHeapRecur();
        this.runTestMakeHeapNoRecur();
        this.runTestHeapSort();
    }
}
 const heapTestCasedefaut = new HeapTest();
 export default heapTestCasedefaut;
// const arrayTemp = [23,17,14,12,13,10,1,5,7,6];
// const bResult = checkArrayMaxHeap(arrayTemp);
// console.log(bResult);
// heapSort(arrayTemp);
// console.log(arrayTemp);
