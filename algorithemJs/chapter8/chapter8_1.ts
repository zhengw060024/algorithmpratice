import utilityTools from "./utilitytools";
import testCaseItem from '../chapter7/chapter7_2';
//#计数排序
function numIndexSort(arrayInput: Array<number>, nRangeMin: number, nRangeMax: number) {
    const arrayTemp = [];
    const arrayOut = [];
    const nRange = nRangeMax - nRangeMin + 1;
    for (let i = 0; i < nRange; ++i) {
        arrayTemp.push(0);
    }

    for (let i = 0; i < arrayInput.length; ++i) {
        arrayTemp[arrayInput[i] - nRangeMin] += 1;
    }

    for(let i = 0; i < nRange - 1; ++i) {
        arrayTemp[i + 1] += arrayTemp[i];
    }
    console.log(`${arrayTemp}`);
    for(let i = arrayInput.length; i >= 0; --i) {
        // arrayOut[i + 1] = arrayOut[i];
        arrayOut[arrayTemp[arrayInput[i] - nRangeMin] - 1] = arrayInput[i];
        arrayTemp[arrayInput[i] - nRangeMin] -= 1
    }
    return arrayOut;
}

function  testnumIndexSort() {
    const arrayInput = utilityTools.generateRandomArray(10,20,100);
    console.log(`${arrayInput}`);
    const arrayOut = numIndexSort(arrayInput,10,20);
    const arrayCheck = arrayInput.concat().sort((a:number, b:number) => {
        return a - b;
    });
    console.log(`${arrayOut}`);
    if(arrayCheck.length !== arrayOut.length) {
        console.log( 'sort failed!!!');
        return false;
    }else {
        for(let i = 0; i< arrayCheck.length; ++i) {
            if(arrayCheck[i] !== arrayOut[i]) {
                console.log('sort failed!!!')
                return false;
            }
        }
    }
    console.log('sort right!!');
    return true;
}
testnumIndexSort();