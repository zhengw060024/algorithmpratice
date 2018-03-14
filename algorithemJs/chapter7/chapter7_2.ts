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
    for(let t = i; t <= k; ++t) {
        arrayInput[t] = nTemp;
    }
    
    return [i, k];
}
class TestCase {
    constructor() {

    }
    testDepart() {
        const ItemCount = utilityTools.generateRandom(5, 20);
        console.log('lenth is ' ,ItemCount);
        const arrayInput = utilityTools.generateRandomArray(1, 10, ItemCount);
        console.log(`orgin array is ${arrayInput}`);
        let nReturnTuple = quickDepart(arrayInput, 0, arrayInput.length - 1);
        console.log(`depart index is ${nReturnTuple} `);
        console.log(`departed array is ${arrayInput}`);

    }
}
const testCaseItem = new TestCase();
testCaseItem.testDepart();