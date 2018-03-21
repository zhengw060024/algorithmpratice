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
//基数排序：
function getArrayHelp(arrayInput:Array<number>,nRadix:number){
    const arrayOut1 = [];
    const arrayOut2 = [];
    for(let i = 0; i< arrayInput.length; ++i) {
        const nTemp = Math.floor(arrayInput[i] / nRadix)
        arrayOut1.push(nTemp);
        arrayOut2.push(arrayInput[i] - nTemp * nRadix);
    }
    return [arrayOut1,arrayOut2];
}
function radixSort(arrayInput:Array<number>,nRadix:number,nD:number) {
    let arrayHelp = arrayInput.concat();
    for(let i = 0; i < nD; ++i) {
        const Temp = getArrayHelp(arrayHelp,nRadix);
        let arrayHead = Temp[0];
        let arrayTail = Temp[1];
        const arrayTemp2 =  radixSortHelp(arrayInput,arrayHead ,arrayTail,0,nRadix - 1);
        arrayInput = arrayTemp2[0];
        arrayHelp = arrayTemp2[1] ;
    }
    return arrayInput;

}

function radixSortHelp(arrayInputTemp:Array<number>,arrayHelpSave:Array<number>,arrayInput: Array<number>,
     nRangeMin: number, nRangeMax: number) {
    const arrayTemp:Array<number> = [];
    const arrayOut:Array<number> = [];
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
    const arrayOut2 = []; 
    for(let i = arrayInput.length; i >= 0; --i) {
        // arrayOut[i + 1] = arrayOut[i];
        arrayOut2[arrayTemp[arrayInput[i] - nRangeMin] - 1] = arrayHelpSave[i];

        arrayOut[arrayTemp[arrayInput[i] - nRangeMin] - 1] = arrayInputTemp[i];
        arrayTemp[arrayInput[i] - nRangeMin] -= 1
    }
    return [arrayOut,arrayOut2];
}
class CommonSortTestCase {

    testRadixSort() {
        const arrayInput = utilityTools.generateRandomArray(1,999,20);
        console.log(`${arrayInput}`);
        const arraySorted = radixSort(arrayInput,10,3);
        console.log(`${arraySorted}`);
        this.checkSortRight(arraySorted,arrayInput);
    }
    testnumIndexSort() {
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
    private checkSortRight(arraySorted:Array<number>, arrayOgin:Array<number>) {
        const arrayToCheck = arrayOgin.concat().sort((a:number,b:number) => {
            return a - b;
        });
        if(arraySorted.length !== arrayToCheck.length) {
            console.log('array sorted num is not right!');
            return false;
        }
        for(let i = 0; i < arraySorted.length ; ++i) {
            if(arraySorted[i] !== arrayToCheck[i]) {
                console.log('array sorted error!!!');
                return false;
            }
        }
        console.log('array sort right!');
        return true;
    }

}
const testCase = new CommonSortTestCase();
testCase.testRadixSort();
// testnumIndexSort();
// testRadixSort();