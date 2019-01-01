// 算法导论第6章思考题
// 插入法建堆
import utilityTools from './utilitytools'
function checkArrayMaxHeap(arrayInput: Array<number>) {
    let indexCheckEnd = Math.floor(arrayInput.length / 2);
    let i = 0;
    for (let i = 0; i < indexCheckEnd - 1; ++i) {
        if (!(arrayInput[i] >= arrayInput[2 * i + 1]
            && arrayInput[i] >= arrayInput[2 * i + 2])) {
            return false;
        }
    }
    if (indexCheckEnd - 1 >= 0) {
        if (indexCheckEnd * 2 < arrayInput.length) {
            if (arrayInput[indexCheckEnd - 1] < arrayInput[indexCheckEnd * 2]) {
                return false;
            }
        }
        if (arrayInput[indexCheckEnd - 1] < arrayInput[indexCheckEnd * 2 - 1]) {
            return false;
        }
    }
    return true;
}

function buildMaxHeap(arrayInput: Array<number>) {
    for (let i = 1; i < arrayInput.length; ++i) {
        ajustHeapItemToTop(arrayInput, i);
    }
}
function ajustHeapItemToTop(arrayInput: Array<number>, itemIndex: number) {
    // itemIndex这一项
    // 注意对于c和c++代码，需要考虑临界点条件
    let nStartIndex = Math.floor((itemIndex - 1) / 2);
    const temp = arrayInput[itemIndex];
    while (nStartIndex >= 0) {
        if (arrayInput[nStartIndex] < temp) {
            arrayInput[itemIndex] = arrayInput[nStartIndex];
            itemIndex = nStartIndex;
            nStartIndex = Math.floor((itemIndex - 1) / 2);
        } else {
            break;
        }
    }
    arrayInput[itemIndex] = temp;
}

// 算法导论思考题6-2（对 d叉堆的分析）
function buildCrossHeap(arrayInput: Array<number>, dCross: number) {
    if (dCross < 2) {
        throw new Error('illegal dcross number!');
    }
    let nStartIndex = Math.floor((arrayInput.length - 2) / dCross);
    for (let i = nStartIndex; i >= 0; --i) {
        ajustdCrossItem(arrayInput, i, dCross);
    }
}
function ajustdCrossItem(arrayInput: Array<number>, itemIndex: number, dCross: number) {
    let checkStartIndex = itemIndex * dCross + 1;
    const nTemp = arrayInput[itemIndex];
    while (checkStartIndex < arrayInput.length) {
        // let nTempEnd = itemIndex * dCross + dCross;
        let checkEndIndex = Math.min(itemIndex * dCross + dCross, arrayInput.length - 1);
        let nTempMaxIndex = checkStartIndex
        for (let i = checkStartIndex; i <= checkEndIndex; ++i) {
            if (arrayInput[nTempMaxIndex] < arrayInput[i]) {
                nTempMaxIndex = i;
            }
        }
        if (nTemp < arrayInput[nTempMaxIndex]) {
            arrayInput[itemIndex] = arrayInput[nTempMaxIndex];
            itemIndex = nTempMaxIndex;
            checkStartIndex = itemIndex * dCross + 1;
        } else {
            break;
        }
    }
    arrayInput[itemIndex] = nTemp;
    return itemIndex;
}
function helpCheckdCrossHeapLegal(arrayInput: Array<number>, dCross: number) {
    let nStartIndex = Math.floor((arrayInput.length - 2) / dCross);
    for (let i = nStartIndex; i >= 0; --i) {
        for (let j = nStartIndex * dCross + 1;
            j <= nStartIndex * dCross + dCross && j < arrayInput.length; ++j) {
            if (arrayInput[j] > arrayInput[i]) {
                console.log("this is not a dcross heap!!!")
                return false;
            }
        }
    }
    console.log('this is a dcross heap!!!')
    return true;
}
function popMaxItemdCrossHeap(arrayInput: Array<number>, dCross: number) {
    if (arrayInput.length === 0) {
        throw new Error('the heap is empty');
    }
    if (arrayInput.length === 1) {
        return arrayInput.pop();
    } else {
        const temp = arrayInput[0];
        arrayInput[0] = arrayInput[arrayInput.length - 1];
        arrayInput.pop();
        ajustdCrossItem(arrayInput, 0, dCross);
        return temp;
    }
}
// 向dcrossheap 中插入数据
function insertItemTodCrossHeap(arrayInput: Array<number>, dCross: number, itemInsert: number): number {
    arrayInput.push(itemInsert);
    return ajustdCrossItemToTop(arrayInput, arrayInput.length - 1, dCross);
}

function ajustdCrossItemToTop(arrayInput: Array<number>, posIndex: number, dCross: number): number {
    const nTemp = arrayInput[posIndex];
    while (posIndex > 0) {
        let parentPos = Math.floor((posIndex - 1) / dCross);
        if (arrayInput[parentPos] < arrayInput[posIndex]) {
            arrayInput[posIndex] = arrayInput[parentPos];
            posIndex = parentPos;
        } else {
            break;
        }
    }
    arrayInput[posIndex] = nTemp;
    return posIndex;
}
function increasedCrossHeapItemById(arrayInput: Array<number>, posIndex: number,
    newItem: number, dCross: number): number {
    if (newItem < arrayInput[posIndex]) {
        // console.log('no need to insert Item!!!');
        arrayInput[posIndex] = newItem;
        return ajustdCrossItem(arrayInput, posIndex, dCross);
    } else {
        arrayInput[posIndex] = newItem;
        return ajustdCrossItemToTop(arrayInput, posIndex, dCross);
    }
}
class YoungTableau {
    constructor(m: number, n: number) {
        this.m_row = m;
        this.m_col = n;
        this.m_dataBuff = [];
        for (let i = 0; i < this.m_row; ++i) {
            const arrayTemp = [];
            for (let j = 0; j < this.m_col; ++j) {
                arrayTemp.push(Number.MAX_VALUE);
            }
            this.m_dataBuff.push(arrayTemp);
        }
    }
    isFull() {
        return this.m_dataBuff[this.m_row - 1][this.m_col - 1] !== Number.MAX_VALUE;
    }
    isEmpty() {
        return this.m_dataBuff[0][0] === Number.MAX_VALUE;
    }
    insertItem(item: number) {
        if (!this.isFull()) {
            let i = this.m_row - 1; let j = this.m_col - 1;
            while (true) {
                if (i === 0 && j === 0) {
                    break;
                } else if (i === 0) {
                    if (this.m_dataBuff[i][j - 1] > item) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i][j - 1]
                        j = j - 1;
                    } else {
                        break;
                    }

                } else if (j === 0) {
                    if (this.m_dataBuff[i - 1][j] > item) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i - 1][j];
                        i = i - 1;
                    } else {
                        break;
                    }

                } else {
                    if (this.m_dataBuff[i - 1][j] < this.m_dataBuff[i][j - 1]) {
                        if (this.m_dataBuff[i][j - 1] > item) {
                            this.m_dataBuff[i][j] = this.m_dataBuff[i][j - 1]
                            j = j - 1;
                        } else {
                            break;
                        }
                    } else {
                        if (this.m_dataBuff[i - 1][j] > item) {
                            this.m_dataBuff[i][j] = this.m_dataBuff[i - 1][j];
                            i = i - 1;
                        } else {
                            break;
                        }
                    }
                }
            }
            this.m_dataBuff[i][j] = item;
            return [i, j];
        } else {
            throw new Error("table is full!!!");
        }
    }
    private adjustItemToStart(i: number, j: number) {
        const item = this.m_dataBuff[i][j];
        while (true) {
            if (i === 0 && j === 0) {
                break;
            } else if (i === 0) {
                if (this.m_dataBuff[i][j - 1] > item) {
                    this.m_dataBuff[i][j] = this.m_dataBuff[i][j - 1]
                    j = j - 1;
                } else {
                    break;
                }

            } else if (j === 0) {
                if (this.m_dataBuff[i - 1][j] > item) {
                    this.m_dataBuff[i][j] = this.m_dataBuff[i - 1][j];
                    i = i - 1;
                } else {
                    break;
                }

            } else {
                if (this.m_dataBuff[i - 1][j] < this.m_dataBuff[i][j - 1]) {
                    if (this.m_dataBuff[i][j - 1] > item) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i][j - 1]
                        j = j - 1;
                    } else {
                        break;
                    }
                } else {
                    if (this.m_dataBuff[i - 1][j] > item) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i - 1][j];
                        i = i - 1;
                    } else {
                        break;
                    }
                }
            }
        }
        this.m_dataBuff[i][j] = item;
        return [i, j];
    }
    private adjustItemToEnd(i: number, j: number) {
        const nTempToInsert = this.m_dataBuff[i][j];
        while (true) {
            if (i === this.m_row - 1 && j === this.m_col - 1) {
                break;
            } else if (i === this.m_row - 1) {
                if (this.m_dataBuff[i][j + 1] < nTempToInsert) {
                    this.m_dataBuff[i][j] = this.m_dataBuff[i][j + 1];
                    j = j + 1;
                } else {
                    break;
                }
            } else if (j === this.m_col - 1) {
                if (this.m_dataBuff[i + 1][j] < nTempToInsert) {
                    this.m_dataBuff[i][j] = this.m_dataBuff[i + 1][j];
                    i = i + 1;
                } else {
                    break;
                }
            } else {
                if (this.m_dataBuff[i + 1][j] < this.m_dataBuff[i][j + 1]) {
                    if (this.m_dataBuff[i + 1][j] < nTempToInsert) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i + 1][j];
                        i = i + 1;
                    } else {
                        break;
                    }
                } else {
                    if (this.m_dataBuff[i][j + 1] < nTempToInsert) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i][j + 1];
                        j = j + 1;
                    } else {
                        break;
                    }
                }
            }
        }
        this.m_dataBuff[i][j] = nTempToInsert;
        return [i, j];
    }
    resetIndexItem(i:number, j:number,newItem:number) {
        if(  i < this.m_row && i >= 0 && j >= 0 && j < this.m_col)  {
            if(newItem === this.m_dataBuff[i][j]) {
                return [i,j];
            }
            const oldData = this.m_dataBuff[i][j];
            this.m_dataBuff[i][j] = newItem;
            if(newItem < oldData) {
                
                return this.adjustItemToStart(i,j);
            } else {
                return this.adjustItemToEnd(i,j);
            }
        }
    }
    popMinItem(): number {
        if (this.isEmpty()) {
            throw new Error("table is empty!!!");
            //return Number.MAX_VALUE;
        } else {
            const nTemp = this.m_dataBuff[0][0];
            const nTempToInsert = this.m_dataBuff[this.m_row - 1][this.m_col - 1];
            this.m_dataBuff[this.m_row - 1][this.m_col - 1] = Number.MAX_VALUE;
            let i = 0; let j = 0;
            while (true) {
                if (i === this.m_row - 1 && j === this.m_col - 1) {
                    break;
                } else if (i === this.m_row - 1) {
                    if (this.m_dataBuff[i][j + 1] < nTempToInsert) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i][j + 1];
                        j = j + 1;
                    } else {
                        break;
                    }
                } else if (j === this.m_col - 1) {
                    if (this.m_dataBuff[i + 1][j] < nTempToInsert) {
                        this.m_dataBuff[i][j] = this.m_dataBuff[i + 1][j];
                        i = i + 1;
                    } else {
                        break;
                    }
                } else {
                    if (this.m_dataBuff[i + 1][j] < this.m_dataBuff[i][j + 1]) {
                        if (this.m_dataBuff[i + 1][j] < nTempToInsert) {
                            this.m_dataBuff[i][j] = this.m_dataBuff[i + 1][j];
                            i = i + 1;
                        } else {
                            break;
                        }
                    } else {
                        if (this.m_dataBuff[i][j + 1] < nTempToInsert) {
                            this.m_dataBuff[i][j] = this.m_dataBuff[i][j + 1];
                            j = j + 1;
                        } else {
                            break;
                        }
                    }
                }
            }
            this.m_dataBuff[i][j] = nTempToInsert;
            return nTemp;
        }
    }
    findItem(numToFind: number): [number, number] {
        let i = 0; let j = this.m_col - 1;
        while (true) {
            if (this.m_dataBuff[i][j] === numToFind) {
                return [i, j];
            }
            if (i === this.m_row - 1 && j === 0) {
                return [-1, -1];
            } else if (i === this.m_row - 1) {
                if (this.m_dataBuff[i][j] < numToFind) {
                    return [-1, -1];
                } else {
                    --j;
                }
            } else if (j === 0) {
                if (this.m_dataBuff[i][j] > numToFind) {
                    return [-1, -1];
                } else {
                    ++i;
                }
            } else {
                if (this.m_dataBuff[i][j] > numToFind) {
                    --j;
                } else {
                    ++i;
                }

            }
        }
        // return [-1, -1];
    }
    checkIsAYoungTab() {
        for (let i = 0; i < this.m_row; ++i) {
            for (let j = 0; j < this.m_col; ++j) {
                if (i === this.m_row - 1 && j === this.m_col - 1) {
                    return true;
                } else if (i === this.m_row - 1) {
                    if (this.m_dataBuff[i][j + 1] < this.m_dataBuff[i][j]) {
                        return false;
                    }
                } else if (j === this.m_col - 1) {
                    if (this.m_dataBuff[i + 1][j] < this.m_dataBuff[i][j]) {
                        return false;
                    }
                } else {
                    if (this.m_dataBuff[i][j + 1] < this.m_dataBuff[i][j] ||
                        this.m_dataBuff[i + 1][j] < this.m_dataBuff[i][j]) {
                        return false;
                    }
                }
            }
        }
    }
    printYoungTable() {
        for (let i = 0; i < this.m_row; ++i) {
            let str = '';
            for (let j = 0; j < this.m_col; ++j) {
                if (this.m_dataBuff[i][j] === Number.MAX_VALUE) {
                    let strTemp = '';
                    str += ' * '
                } else {
                    if(this.m_dataBuff[i][j] / 10 >= 1) {
                        str = str + ' ' + this.m_dataBuff[i][j].toString();
                    }else {
                        str = str + ' ' + this.m_dataBuff[i][j].toString() + ' ';
                    }
                }
            }
            console.log(str);
        }
    }
    private m_dataBuff: Array<Array<number>>;
    private m_row: number;
    private m_col: number;
}
function sortNNNumsByYoungTableau(n:number) {
    const helpYoung = new YoungTableau(n,n);
    const arrayOrign = utilityTools.generateRandomArray(1,1000,n* n);
    const arraySortRight = arrayOrign.concat().sort((a,b) => {
        return a - b;
    });
    console.log(`orgin array is ${arrayOrign}`);
    const arraySortResultYoung = [];
    for(let i = 0; i < arrayOrign.length; ++i){
        helpYoung.insertItem(arrayOrign[i]);
    }
    while(!helpYoung.isEmpty()) {
        arraySortResultYoung.push(helpYoung.popMinItem());
    }
    console.log(`sorted array is ${arraySortResultYoung}`);
    if(arraySortResultYoung.length !== arraySortRight.length){
        console.log('error ,young sorted failed!!!');
        return ;
    }
    for(let i = 0; i < arraySortResultYoung.length; ++i ){
        if(arraySortResultYoung[i] !== arraySortRight[i]) {
            console.log('error ,young sorted failed, numbers not match!!!');
            return;
        }
    }
    console.log('Young sort success!!!');
}
class TestCaseQuestion {
    constructor() {
    }
    private testCaseYoungTableau() {
        const arrayInput = [9, 16, 3, 2, 4, 8, 5, 14, 12];
        const youngTestCase1 = new YoungTableau(4,4);
        arrayInput.forEach(data => {
            youngTestCase1.insertItem(data);
        });
        youngTestCase1.printYoungTable();
        if(youngTestCase1.checkIsAYoungTab()) {
            console.log('this is a youngTable');
        } else {
            console.log('create young table error!');
        }
        const nItemToGen = utilityTools.generateRandom(16,35);
        const arrayOrgin = utilityTools.generateRandomArray(1,99,nItemToGen);
        const youngTestCase2 = new YoungTableau(5,7);
        arrayOrgin.forEach(data => {
            youngTestCase2.insertItem(data);
        });
        youngTestCase2.printYoungTable();
        if(youngTestCase2.checkIsAYoungTab()) {
            console.log('this is a youngTable');
        } else {
            console.log('create young table error!');
        }
        console.log(youngTestCase2.popMinItem());
        if(youngTestCase2.checkIsAYoungTab()) {
            console.log('this is a youngTable');
        } else {
            console.log('create young table error!');
        }
        youngTestCase2.printYoungTable();
        const itemToFind = utilityTools.generateRandom(1,99);
        console.log(itemToFind);
        console.log( youngTestCase2.findItem(itemToFind));
        console.log(youngTestCase1.findItem(8));
        const iRow = utilityTools.generateRandom(0,4);
        const iCol = utilityTools.generateRandom(0,6);
        const itemToChange = utilityTools.generateRandom(1,99);

        console.log(`old pos is ${[iRow,iCol]},new data is ${itemToChange}`);
        console.log(youngTestCase2.resetIndexItem(iRow,iCol,itemToChange));
        youngTestCase2.printYoungTable();
        // youngTestCase2.
        const sortItemsNum = utilityTools.generateRandom(5,15);
        sortNNNumsByYoungTableau(sortItemsNum);
        
    }
    private testCaseDCrossHeap() {
        const arrayOrgin = utilityTools.generateRandomArray(1, 1000, 30);
        console.log(`Orgin array is ${arrayOrgin}`);
        const arrayTest = arrayOrgin.concat();
        // 秩为2为普通的堆
        buildCrossHeap(arrayTest, 2);
        console.log(`new heap array is ${arrayTest}`);
        if (checkArrayMaxHeap(arrayTest)) {
            console.log('this  is a max heap by dCrossHeapTest!');
        } else {
            console.log('this is not max heap by dCrossHeapTest,some error happened!')
        }
        //
        const dCross = utilityTools.generateRandom(2, 30);
        const arrayTest2 = arrayOrgin.concat();
        console.log(`dcross is ${dCross}`);
        buildCrossHeap(arrayTest2, dCross);
        if (helpCheckdCrossHeapLegal(arrayTest2, dCross)) {
            console.log('dcross testcase right!!!');
        }
        console.log(`dCrossHeap is ${arrayTest2}`);
        const nRemoveItem = popMaxItemdCrossHeap(arrayTest2, dCross)
        console.log('the max num in the heap is :', nRemoveItem);
        console.log(`after remove max ,dCrossHeap is ${arrayTest2}`);
        if (helpCheckdCrossHeapLegal(arrayTest2, dCross) && (<number>nRemoveItem) >= arrayTest2[0]) {
            console.log('remove op is success!');
        } else {
            console.log('remove op is failed!!!');
        }
        const nInsertNum = utilityTools.generateRandom(10, 4000);
        console.log('The number to insert is :', nInsertNum);
        const nInsertPos = insertItemTodCrossHeap(arrayTest2, dCross, nInsertNum)
        console.log('The insert pos is :', nInsertPos);
        if (nInsertNum === arrayTest2[nInsertPos] && helpCheckdCrossHeapLegal(arrayTest2, dCross)) {
            console.log('insert op is ok');
        } else {
            console.log('insert op is failed!!!');
        }
        console.log(`after insert item ,dCrossHeap is ${arrayTest2}`);

        // 修改heap中的某项的值
        const nItemIndexChange = utilityTools.generateRandom(0, arrayTest2.length - 1);
        const nOldData = arrayTest2[nItemIndexChange];
        const nNewNum = utilityTools.generateRandom(0, 1000);
        const nNewItemIndex = increasedCrossHeapItemById(arrayTest2, nItemIndexChange, nNewNum, dCross);
        console.log(`the old data is ${nOldData}, the old index is ${nItemIndexChange}`);
        console.log(`the new data is ${nNewNum}, the new index is ${nNewItemIndex}`);
        console.log(`after item change ,dCrossHeap is ${arrayTest2}`);
        if (nNewNum === arrayTest2[nNewItemIndex] && helpCheckdCrossHeapLegal(arrayTest2, dCross)) {
            console.log('change item testcase success!!!')
        } else {
            console.log('change indexed item testcase failed');
        }
    }
    private testCaseInsertBuildHeap() {
        const arrayOrgin = utilityTools.generateRandomArray(1, 1000, 30);
        console.log(`Orgin array is ${arrayOrgin}`);
        const arrayTest = arrayOrgin.concat();
        buildMaxHeap(arrayTest);
        console.log(`new heap array is ${arrayTest}`);
        if (checkArrayMaxHeap(arrayTest)) {
            console.log('this  is a max heap!');
        } else {
            console.log('this is not max heap ,some error happened!')
        }
    }
    runTestCase() {
        this.testCaseInsertBuildHeap();
        this.testCaseDCrossHeap();
        this.testCaseYoungTableau();
    }
}
const TestItem = new TestCaseQuestion();
export default TestItem;
// testItem.testCaseInsertBuildHeap();

// console.log(10000 < Number.MAX_VALUE);
