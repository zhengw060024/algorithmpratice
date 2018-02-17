import utilityTools from './utilitytools'
function defaultCmp<T>(a:T, b:T):boolean {
    return a < b;
}
class PriorityQueue<T> {
    constructor( cmp:(a:T,b:T) => boolean = defaultCmp) {
        this.m_cmp = cmp;
        this.m_arrayHeap = [];
    }
    getQueBufArray():Array<T> {
        return this.m_arrayHeap.concat();
    }
    resetQueFromArray(arrayInput: Array<T>) {
        this.m_arrayHeap = arrayInput.concat();
        // 创建堆
        this.makeArrayHeap();
        // if(this.m_arrayHeap.length <= 1) {
        //     return;
        // }
        // const nStartIndex = Math.floor((this.m_arrayHeap.length - 2) / 2);
        // for(let i = nStartIndex; i >= 0; --i) {
        //     this.ajustHeap(i);
        // }
    }
    private m_arrayHeap:Array<T>;
    private m_cmp :(a:T,b:T) => boolean;
    getQueLength():number {
        return this.m_arrayHeap.length;
    }
    insert(item:T):number {
        this.m_arrayHeap.push(item);
        let nIndexToAjust = this.m_arrayHeap.length - 1;
        if(nIndexToAjust === 0) {
            return nIndexToAjust;
        }
        let nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
        while(nSubIndex >= 0 ) {
            if(this.m_cmp(this.m_arrayHeap[nSubIndex],item)){
                this.m_arrayHeap[nIndexToAjust] = this.m_arrayHeap[nSubIndex];
                this.m_arrayHeap[nSubIndex] = item;
                nIndexToAjust = nSubIndex;
                nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
            }else {
                return nIndexToAjust;
            }
        }
        return nIndexToAjust;
    }
    getTopItem():T {
       return this.m_arrayHeap[0];
    }
    queDeleteByIndex(index:number): T {
        if(index < 0 || index >= this.m_arrayHeap.length) {
            throw new Error('out of queque range!!!');
        } else {
            if(index === 0) {
                return this.popTop();
            } else {
                if(this.m_arrayHeap.length === 1 && index === 0){
                    const tReturn = this.m_arrayHeap[0];
                    this.m_arrayHeap.pop();
                    return tReturn;
                }
                const tReturn = this.m_arrayHeap[index];
                this.m_arrayHeap[index] = this.m_arrayHeap[this.m_arrayHeap.length - 1];
                this.m_arrayHeap.pop();
                this.ajustHeap(index);
                return tReturn;
            }
        }
    }
    popTop():  T{
        if(this.m_arrayHeap.length === 0){
            throw new Error('queque is empty!');
        } else {
            if(this.m_arrayHeap.length === 1){
                const tReturn = this.m_arrayHeap[0];
                this.m_arrayHeap.pop();
                return tReturn;
            } else {
                const tReturn = this.m_arrayHeap[0];
                this.m_arrayHeap[0] = this.m_arrayHeap[this.m_arrayHeap.length - 1];
                this.m_arrayHeap.pop();
                this.ajustHeap(0);
                return tReturn;
            }
        }

    }
    private ajustHeapToTop(nIndexToAjust :number) {
        if(nIndexToAjust < 0 || nIndexToAjust >= this.m_arrayHeap.length){
            throw new Error('out of queque range!!');
        } 
        const item = this.m_arrayHeap[nIndexToAjust];
        if(nIndexToAjust === 0) {
            return nIndexToAjust;
        }
        let nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
        while(nSubIndex >= 0 ) {
            if(this.m_cmp(this.m_arrayHeap[nSubIndex],item)){
                this.m_arrayHeap[nIndexToAjust] = this.m_arrayHeap[nSubIndex];
                nIndexToAjust = nSubIndex;
                nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
            }else {
                this.m_arrayHeap[nIndexToAjust] = item;
                return nIndexToAjust;
            }
        }
        this.m_arrayHeap[nIndexToAjust] = item;

    }
    changeIndexKey(index:number, newItem: T) {
        if(index < 0 || index >= this.m_arrayHeap.length){
            throw new Error('out of queque range!!');
        } else {
            const temp = this.m_arrayHeap[index];
            this.m_arrayHeap[index] = newItem;
            if(this.m_cmp(temp, newItem)) {
                // 向上调整
                this.ajustHeapToTop(index);
            } else {
                // 向下调整
                this.ajustHeap(index);
            }
        }

    }
    private makeArrayHeap() {
        if(this.m_arrayHeap.length <= 1)
            return;
        let nStartIndex = Math.floor((this.m_arrayHeap.length - 2 ) / 2);
        for (let index = nStartIndex; index >= 0; --index) {
            this.ajustHeap(index);
        }
    }
    private ajustHeap(nStartIndex:number) {
        while(nStartIndex < this.m_arrayHeap.length) {
            const nleft = nStartIndex * 2 + 1;
            const nright = nStartIndex * 2 + 2;
            if(nleft >= this.m_arrayHeap.length) {
                return ;
            }
            let nChildMax = nleft;
            if(nright < this.m_arrayHeap.length) {
                if(this.m_cmp(this.m_arrayHeap[nleft],this.m_arrayHeap[nright])) {
                    nChildMax = nright;
                }
            }
            if(this.m_cmp(this.m_arrayHeap[nStartIndex],this.m_arrayHeap[nChildMax])){
                const Temp = this.m_arrayHeap[nStartIndex];
                this.m_arrayHeap[nStartIndex] = this.m_arrayHeap[nChildMax];
                this.m_arrayHeap[nChildMax] = Temp;
                nStartIndex = nChildMax;
            } else {
                return ;
            }

        }
    }
}
class TestCaseItem {
    m_strItem1:string;
    m_strItem2:string;
    m_nNumX:number;
    m_nNumY:number;
    constructor() {
        this.m_strItem1 = '';
        this.m_strItem2 = '';
        this.m_nNumX = utilityTools.generateRandom(1,100);
        this.m_nNumY = utilityTools.generateRandom(50,150);
        const strLength1 = utilityTools.generateRandom(2,15);
        const array1 = utilityTools.generateRandomArray(0,25,strLength1);
        array1.forEach(value => {
            const nTemp1 = value + 'A'.charCodeAt(0);
            this.m_strItem1 += String.fromCharCode(nTemp1);
        });

        const strLength2 = utilityTools.generateRandom(2,15);
        const array2 = utilityTools.generateRandomArray(0,25,strLength2);
        array2.forEach(value => {
            const nTemp1 = value + 'A'.charCodeAt(0);
            this.m_strItem2 += String.fromCharCode(nTemp1);
        });

    }
}
class QueTestCase {
    constructor() {
        
    }
    testCaseContruct() {
        // 测试普通的number构造
        const temp1 =  new PriorityQueue<number>();
        const arrayTemp = utilityTools.generateRandomArray(0,250,10);
        console.log(`原始数组：${arrayTemp}`);
        arrayTemp.forEach(value => {
            temp1.insert(value);
        });
        console.log(`优先级队列中的数据：${temp1.getQueBufArray()}`);
        const arrayOut2 = [];
        while(temp1.getQueLength() !== 0) {
          arrayOut2.push(temp1.popTop());
        }
        console.log(`顺序pop：${arrayOut2}`);
        
    }

    testCaseContruct2() {
        // 测试普通number带比较构造参数的测试
        const temp1 =  new PriorityQueue<number>((data1,data2)=> {
            return data1 > data2;
        });
        const arrayTemp = utilityTools.generateRandomArray(0,250,10);
        console.log(`原始数组：${arrayTemp}`);
        arrayTemp.forEach(value => {
            temp1.insert(value);
        });
        console.log(`优先级队列中的数据：${temp1.getQueBufArray()}`);
        const arrayOut2 = [];
        while(temp1.getQueLength() !== 0) {
          arrayOut2.push(temp1.popTop());
        }
        console.log(`顺序pop：${arrayOut2}`);
    }
    testCaseConstruct3() {
        const temp1 = new PriorityQueue<TestCaseItem>((data1,data2) => {
            //return data1.m_nNumX < data2.m_nNumX; 
            // return data1.m_nNumY < data2.m_nNumY;
            // return data1.m_strItem1 < data2.m_strItem1;
            return data1.m_strItem2 < data2.m_strItem2;
        });
        const arrayTemp1 = [];
        for(let i = 0; i < 8; ++i){
            const tempxx = new TestCaseItem();
            console.log(`${i + 1}:`);
            console.log(tempxx);
            temp1.insert(tempxx);
            // arrayTemp1.push();
        }
        console.log('pop start:')
        let nIndex = 0;
        while(temp1.getQueLength() !== 0) {
            console.log(`${++nIndex}:`);
            console.log(temp1.popTop());
        }
    }
    testCaseChange() {
        const temp1 =  new PriorityQueue<number>((data1,data2)=> {
            return data1 > data2;
        });
        const arrayTemp = utilityTools.generateRandomArray(0,250,10);
        console.log(`原始数组：${arrayTemp}`);
        arrayTemp.forEach(value => {
            temp1.insert(value);
        });
        console.log(`优先级队列中的数据：${temp1.getQueBufArray()}`);
        // let nTemp = utilityTools.generateRandom(0,250);
        let nTemp = 0;
        console.log(nTemp);
        temp1.changeIndexKey(8,nTemp);
        console.log(`优先级队列中的数据2：${temp1.getQueBufArray()}`);
        const arrayOut2 = [];
        while(temp1.getQueLength() !== 0) {
          arrayOut2.push(temp1.popTop());
        }
        console.log(`顺序pop：${arrayOut2}`);
    }
    testCaseDeleteItem() 
    {
        const temp1 =  new PriorityQueue<number>((data1,data2)=> {
            return data1 > data2;
        });
        const arrayTemp = utilityTools.generateRandomArray(0,250,10);
        console.log(`原始数组：${arrayTemp}`);
        arrayTemp.forEach(value => {
            temp1.insert(value);
        });
        console.log(`优先级队列中的数据：${temp1.getQueBufArray()}`);
        let nIndex = utilityTools.generateRandom(0,9);
        console.log(`需要删除的数据为：id ${nIndex}, value ${ temp1.queDeleteByIndex(nIndex)}`);
        console.log(`删除之后，优先级队列中的数据：${temp1.getQueBufArray()}`);
        const arrayOut2 = [];
        while(temp1.getQueLength() !== 0) {
            arrayOut2.push(temp1.popTop());
        }
        console.log(`顺序pop：${arrayOut2}`);
    }
    private testCaseStack() {
        const stackTest = new CommonStackByPriQue<number>();
        const arrayToTest = utilityTools.generateRandomArray(10,1000,100);
        console.log(`${arrayToTest}`);
        
        arrayToTest.forEach(value => {
             stackTest.push(value);
        });
        const arrayOut = [];
        while(!stackTest.isEmpty()) {
            arrayOut.push(stackTest.pop());
        }
        console.log(`${arrayOut}`);
        stackTest.push(1);
        stackTest.push(9);
        stackTest.push(12);
        stackTest.push(2);
        stackTest.push(3);
        stackTest.push(21);
        stackTest.push(5);
        stackTest.push(4);
        stackTest.push(40);
        stackTest.pop();
        stackTest.pop();
        stackTest.pop();
        stackTest.push(50);
        stackTest.push(24);
        stackTest.push(20);
        stackTest.push(21);
        const arrayOut2 = [];
        while(!stackTest.isEmpty()) {
            arrayOut2.push(stackTest.pop());
        }
        console.log(`${arrayOut2}`);
        
        
        const arrayPutToStack = [];
        const arrayStackItem = [];
        const arrayOutFromStack = [];
        for(let i = 0; i < 100; ++i) {
            let flag = utilityTools.generateRandom(0,3);
            if(flag === 0 ) {
                if(!stackTest.isEmpty()) {
                    arrayOutFromStack.push(stackTest.pop());
                    arrayStackItem.pop();
                    // arrayPutToStack.pop(); 
                }
            } else {
                const nTemp = utilityTools.generateRandom(0,1000);
                stackTest.push(nTemp);
                arrayPutToStack.push(nTemp);
                arrayStackItem.push(nTemp);
            }
        }
        console.log(`Input stackArray is ${arrayPutToStack}`);
        console.log(`Out from stackarray is ${arrayOutFromStack}`);
        console.log(`True put to Array ${arrayStackItem}`);
        const arrayOut3 = [];
        while(!stackTest.isEmpty()) {
            arrayOut3.push(stackTest.pop());
        }
        console.log(`out put stack is ${arrayOut3}`);
    }
    private testCommonQue() {
        const quequeTest = new CommonQueByPriQue<number>();
        const arrayToTest = utilityTools.generateRandomArray(10,1000,100);
        console.log(`${arrayToTest}`);
        
        arrayToTest.forEach(value => {
            quequeTest.push(value);
        });
        const arrayOut = [];
        while(!quequeTest.isEmpty()) {
            arrayOut.push(quequeTest.removeFront());
        }
        console.log(`${arrayOut}`);
        quequeTest.printCurrentIndex();

        const arrayPutToQueque= [];
     
        const arrayOutFromQueque = [];
        for(let i = 0; i < 150; ++i) {
            let flag = utilityTools.generateRandom(0,3);
            if(flag === 0 ) {
                if(!quequeTest.isEmpty()) {
                    arrayOutFromQueque.push(quequeTest.removeFront());
                    // arrayPutToStack.pop(); 
                }
            } else {
                const nTemp = utilityTools.generateRandom(0,1000);
                quequeTest.push(nTemp);
                arrayPutToQueque.push(nTemp);
            }
        }
        console.log(`item put to queque is ${arrayPutToQueque}`);
        console.log(` item remove from queque is ${arrayOutFromQueque}`);
        quequeTest.printCurrentIndex();
        
    }
    runTestCase() {
        this.testCaseContruct();
        this.testCaseContruct2();
        this.testCaseConstruct3();
        this.testCaseChange();
        this.testCaseDeleteItem();
        this.testCaseStack();
        this.testCommonQue();
    }
}
// 使用优先队列实现栈和队列
// 对于队列需要注意操作数的范围，防止越界。
interface itemPriQue<T> {
    m_key:number;
    m_value:T;
}
class CommonStackByPriQue<T> {
    constructor() {
        this.m_priQue = new PriorityQueue<itemPriQue<T>>((data1,data2) => {
            return data1.m_key < data2.m_key;
        });
    }
    push(item:T) {
        this.m_priQue.insert({
            m_key:this.m_priQue.getQueLength(),
            m_value:item
        });
    }
    pop() {
        if(this.m_priQue.getQueLength() !== 0) {
            const temp = this.m_priQue.popTop();
            return temp.m_value;
        }
    }
    isEmpty() :boolean{
        return this.m_priQue.getQueLength() === 0;
    }
    private m_priQue:PriorityQueue<itemPriQue<T>>;
}
class QueKeyItem {
    constructor() {
        this.m_array = [];
        this.m_array.push(0);
    }
    m_array:Array<number>;
    addOne() {
        let nToNext = true;
        let i = 0;
        for(i = 0; i < this.m_array.length; ++i) {
            if(this.m_array[i] === 9 ){
                this.m_array[i] = 0;
            }else {
                break;
            }
        }
        if(nToNext) {
            if(i === this.m_array.length){
                this.m_array.push(1);
            } else {
                this.m_array[i] = this.m_array[i] + 1;
            }
        } 
    }
    cloneNewOne():QueKeyItem {
        const temp = new QueKeyItem();
        temp.m_array = this.m_array.concat();
        return temp;
    }
}
function cmp_temp(temp1:QueKeyItem,temp2:QueKeyItem) {
    if(temp1.m_array.length === temp2.m_array.length) {
        for(let i = temp1.m_array.length - 1; i >=0; --i ) {
            if(temp1.m_array[i] !== temp2.m_array[i]) {
                return temp1.m_array[i] > temp2.m_array[i];
            }
        }
        return false;
    } else {
        return temp1.m_array.length > temp2.m_array.length;
    }
}
interface CommonQueItem2<T> {
    m_key:QueKeyItem;
    m_value:T;
}
class CommonQueByPriQue<T> {
    constructor() {
        this.m_currentKey = new QueKeyItem();
        this.m_priQue = new PriorityQueue<CommonQueItem2<T>>((data1,data2) => {
            return cmp_temp(data1.m_key , data2.m_key);
        });
    }
    push(item:T) {
        this.m_currentKey.addOne();
        this.m_priQue.insert({
            m_key:this.m_currentKey.cloneNewOne(),
            m_value: item
        });
    }
    removeFront():T {
        const Temp = this.m_priQue.popTop();
        return Temp.m_value;
    }
    isEmpty() {
        return this.m_priQue.getQueLength() === 0;
    }
    printCurrentIndex() {
        console.log(`${this.m_currentKey.m_array}`);
    }
    private m_priQue:PriorityQueue<CommonQueItem2<T>>;
    private m_currentKey:QueKeyItem ;
}

const QueTestCaseDefault = new QueTestCase();
export default QueTestCaseDefault;