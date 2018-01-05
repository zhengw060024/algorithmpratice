
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
        ajustMaxHeapRecur(nStart, arrayInput);
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
        ajustMaxHeapNoRecur(nStart, arrayInput);
    }
}