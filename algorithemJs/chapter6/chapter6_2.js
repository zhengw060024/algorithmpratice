"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitytools_1 = require("./utilitytools");
function defaultCmp(a, b) {
    return a < b;
}
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(cmp) {
        if (cmp === void 0) { cmp = defaultCmp; }
        this.m_cmp = cmp;
        this.m_arrayHeap = [];
    }
    PriorityQueue.prototype.getQueBufArray = function () {
        return this.m_arrayHeap.concat();
    };
    PriorityQueue.prototype.resetQueFromArray = function (arrayInput) {
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
    };
    PriorityQueue.prototype.getQueLength = function () {
        return this.m_arrayHeap.length;
    };
    PriorityQueue.prototype.insert = function (item) {
        this.m_arrayHeap.push(item);
        var nIndexToAjust = this.m_arrayHeap.length - 1;
        if (nIndexToAjust === 0) {
            return nIndexToAjust;
        }
        var nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
        while (nSubIndex >= 0) {
            if (this.m_cmp(this.m_arrayHeap[nSubIndex], item)) {
                this.m_arrayHeap[nIndexToAjust] = this.m_arrayHeap[nSubIndex];
                this.m_arrayHeap[nSubIndex] = item;
                nIndexToAjust = nSubIndex;
                nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
            }
            else {
                return nIndexToAjust;
            }
        }
        return nIndexToAjust;
    };
    PriorityQueue.prototype.getTopItem = function () {
        return this.m_arrayHeap[0];
    };
    PriorityQueue.prototype.queDeleteByIndex = function (index) {
        if (index < 0 || index >= this.m_arrayHeap.length) {
            throw new Error('out of queque range!!!');
        }
        else {
            if (index === 0) {
                return this.popTop();
            }
            else {
                if (this.m_arrayHeap.length === 1 && index === 0) {
                    var tReturn_1 = this.m_arrayHeap[0];
                    this.m_arrayHeap.pop();
                    return tReturn_1;
                }
                var tReturn = this.m_arrayHeap[index];
                this.m_arrayHeap[index] = this.m_arrayHeap[this.m_arrayHeap.length - 1];
                this.m_arrayHeap.pop();
                this.ajustHeap(index);
                return tReturn;
            }
        }
    };
    PriorityQueue.prototype.popTop = function () {
        if (this.m_arrayHeap.length === 0) {
            throw new Error('queque is empty!');
        }
        else {
            if (this.m_arrayHeap.length === 1) {
                var tReturn = this.m_arrayHeap[0];
                this.m_arrayHeap.pop();
                return tReturn;
            }
            else {
                var tReturn = this.m_arrayHeap[0];
                this.m_arrayHeap[0] = this.m_arrayHeap[this.m_arrayHeap.length - 1];
                this.m_arrayHeap.pop();
                this.ajustHeap(0);
                return tReturn;
            }
        }
    };
    PriorityQueue.prototype.ajustHeapToTop = function (nIndexToAjust) {
        if (nIndexToAjust < 0 || nIndexToAjust >= this.m_arrayHeap.length) {
            throw new Error('out of queque range!!');
        }
        var item = this.m_arrayHeap[nIndexToAjust];
        if (nIndexToAjust === 0) {
            return nIndexToAjust;
        }
        var nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
        while (nSubIndex >= 0) {
            if (this.m_cmp(this.m_arrayHeap[nSubIndex], item)) {
                this.m_arrayHeap[nIndexToAjust] = this.m_arrayHeap[nSubIndex];
                nIndexToAjust = nSubIndex;
                nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
            }
            else {
                this.m_arrayHeap[nIndexToAjust] = item;
                return nIndexToAjust;
            }
        }
        this.m_arrayHeap[nIndexToAjust] = item;
    };
    PriorityQueue.prototype.changeIndexKey = function (index, newItem) {
        if (index < 0 || index >= this.m_arrayHeap.length) {
            throw new Error('out of queque range!!');
        }
        else {
            var temp = this.m_arrayHeap[index];
            this.m_arrayHeap[index] = newItem;
            if (this.m_cmp(temp, newItem)) {
                // 向上调整
                this.ajustHeapToTop(index);
            }
            else {
                // 向下调整
                this.ajustHeap(index);
            }
        }
    };
    PriorityQueue.prototype.makeArrayHeap = function () {
        if (this.m_arrayHeap.length <= 1)
            return;
        var nStartIndex = Math.floor((this.m_arrayHeap.length - 2) / 2);
        for (var index = nStartIndex; index >= 0; --index) {
            this.ajustHeap(index);
        }
    };
    PriorityQueue.prototype.ajustHeap = function (nStartIndex) {
        while (nStartIndex < this.m_arrayHeap.length) {
            var nleft = nStartIndex * 2 + 1;
            var nright = nStartIndex * 2 + 2;
            if (nleft >= this.m_arrayHeap.length) {
                return;
            }
            var nChildMax = nleft;
            if (nright < this.m_arrayHeap.length) {
                if (this.m_cmp(this.m_arrayHeap[nleft], this.m_arrayHeap[nright])) {
                    nChildMax = nright;
                }
            }
            if (this.m_cmp(this.m_arrayHeap[nStartIndex], this.m_arrayHeap[nChildMax])) {
                var Temp = this.m_arrayHeap[nStartIndex];
                this.m_arrayHeap[nStartIndex] = this.m_arrayHeap[nChildMax];
                this.m_arrayHeap[nChildMax] = Temp;
                nStartIndex = nChildMax;
            }
            else {
                return;
            }
        }
    };
    return PriorityQueue;
}());
var TestCaseItem = /** @class */ (function () {
    function TestCaseItem() {
        var _this = this;
        this.m_strItem1 = '';
        this.m_strItem2 = '';
        this.m_nNumX = utilitytools_1.default.generateRandom(1, 100);
        this.m_nNumY = utilitytools_1.default.generateRandom(50, 150);
        var strLength1 = utilitytools_1.default.generateRandom(2, 15);
        var array1 = utilitytools_1.default.generateRandomArray(0, 25, strLength1);
        array1.forEach(function (value) {
            var nTemp1 = value + 'A'.charCodeAt(0);
            _this.m_strItem1 += String.fromCharCode(nTemp1);
        });
        var strLength2 = utilitytools_1.default.generateRandom(2, 15);
        var array2 = utilitytools_1.default.generateRandomArray(0, 25, strLength2);
        array2.forEach(function (value) {
            var nTemp1 = value + 'A'.charCodeAt(0);
            _this.m_strItem2 += String.fromCharCode(nTemp1);
        });
    }
    return TestCaseItem;
}());
var QueTestCase = /** @class */ (function () {
    function QueTestCase() {
    }
    QueTestCase.prototype.testCaseContruct = function () {
        // 测试普通的number构造
        var temp1 = new PriorityQueue();
        var arrayTemp = utilitytools_1.default.generateRandomArray(0, 250, 10);
        console.log("\u539F\u59CB\u6570\u7EC4\uFF1A" + arrayTemp);
        arrayTemp.forEach(function (value) {
            temp1.insert(value);
        });
        console.log("\u4F18\u5148\u7EA7\u961F\u5217\u4E2D\u7684\u6570\u636E\uFF1A" + temp1.getQueBufArray());
        var arrayOut2 = [];
        while (temp1.getQueLength() !== 0) {
            arrayOut2.push(temp1.popTop());
        }
        console.log("\u987A\u5E8Fpop\uFF1A" + arrayOut2);
    };
    QueTestCase.prototype.testCaseContruct2 = function () {
        // 测试普通number带比较构造参数的测试
        var temp1 = new PriorityQueue(function (data1, data2) {
            return data1 > data2;
        });
        var arrayTemp = utilitytools_1.default.generateRandomArray(0, 250, 10);
        console.log("\u539F\u59CB\u6570\u7EC4\uFF1A" + arrayTemp);
        arrayTemp.forEach(function (value) {
            temp1.insert(value);
        });
        console.log("\u4F18\u5148\u7EA7\u961F\u5217\u4E2D\u7684\u6570\u636E\uFF1A" + temp1.getQueBufArray());
        var arrayOut2 = [];
        while (temp1.getQueLength() !== 0) {
            arrayOut2.push(temp1.popTop());
        }
        console.log("\u987A\u5E8Fpop\uFF1A" + arrayOut2);
    };
    QueTestCase.prototype.testCaseConstruct3 = function () {
        var temp1 = new PriorityQueue(function (data1, data2) {
            //return data1.m_nNumX < data2.m_nNumX; 
            // return data1.m_nNumY < data2.m_nNumY;
            // return data1.m_strItem1 < data2.m_strItem1;
            return data1.m_strItem2 < data2.m_strItem2;
        });
        var arrayTemp1 = [];
        for (var i = 0; i < 8; ++i) {
            var tempxx = new TestCaseItem();
            console.log(i + 1 + ":");
            console.log(tempxx);
            temp1.insert(tempxx);
            // arrayTemp1.push();
        }
        console.log('pop start:');
        var nIndex = 0;
        while (temp1.getQueLength() !== 0) {
            console.log(++nIndex + ":");
            console.log(temp1.popTop());
        }
    };
    QueTestCase.prototype.testCaseChange = function () {
        var temp1 = new PriorityQueue(function (data1, data2) {
            return data1 > data2;
        });
        var arrayTemp = utilitytools_1.default.generateRandomArray(0, 250, 10);
        console.log("\u539F\u59CB\u6570\u7EC4\uFF1A" + arrayTemp);
        arrayTemp.forEach(function (value) {
            temp1.insert(value);
        });
        console.log("\u4F18\u5148\u7EA7\u961F\u5217\u4E2D\u7684\u6570\u636E\uFF1A" + temp1.getQueBufArray());
        // let nTemp = utilityTools.generateRandom(0,250);
        var nTemp = 0;
        console.log(nTemp);
        temp1.changeIndexKey(8, nTemp);
        console.log("\u4F18\u5148\u7EA7\u961F\u5217\u4E2D\u7684\u6570\u636E2\uFF1A" + temp1.getQueBufArray());
        var arrayOut2 = [];
        while (temp1.getQueLength() !== 0) {
            arrayOut2.push(temp1.popTop());
        }
        console.log("\u987A\u5E8Fpop\uFF1A" + arrayOut2);
    };
    QueTestCase.prototype.testCaseDeleteItem = function () {
        var temp1 = new PriorityQueue(function (data1, data2) {
            return data1 > data2;
        });
        var arrayTemp = utilitytools_1.default.generateRandomArray(0, 250, 10);
        console.log("\u539F\u59CB\u6570\u7EC4\uFF1A" + arrayTemp);
        arrayTemp.forEach(function (value) {
            temp1.insert(value);
        });
        console.log("\u4F18\u5148\u7EA7\u961F\u5217\u4E2D\u7684\u6570\u636E\uFF1A" + temp1.getQueBufArray());
        var nIndex = utilitytools_1.default.generateRandom(0, 9);
        console.log("\u9700\u8981\u5220\u9664\u7684\u6570\u636E\u4E3A\uFF1Aid " + nIndex + ", value " + temp1.queDeleteByIndex(nIndex));
        console.log("\u5220\u9664\u4E4B\u540E\uFF0C\u4F18\u5148\u7EA7\u961F\u5217\u4E2D\u7684\u6570\u636E\uFF1A" + temp1.getQueBufArray());
        var arrayOut2 = [];
        while (temp1.getQueLength() !== 0) {
            arrayOut2.push(temp1.popTop());
        }
        console.log("\u987A\u5E8Fpop\uFF1A" + arrayOut2);
    };
    QueTestCase.prototype.testCaseStack = function () {
        var stackTest = new CommonStackByPriQue();
        var arrayToTest = utilitytools_1.default.generateRandomArray(10, 1000, 100);
        console.log("" + arrayToTest);
        arrayToTest.forEach(function (value) {
            stackTest.push(value);
        });
        var arrayOut = [];
        while (!stackTest.isEmpty()) {
            arrayOut.push(stackTest.pop());
        }
        console.log("" + arrayOut);
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
        var arrayOut2 = [];
        while (!stackTest.isEmpty()) {
            arrayOut2.push(stackTest.pop());
        }
        console.log("" + arrayOut2);
        var arrayPutToStack = [];
        var arrayStackItem = [];
        var arrayOutFromStack = [];
        for (var i = 0; i < 100; ++i) {
            var flag = utilitytools_1.default.generateRandom(0, 3);
            if (flag === 0) {
                if (!stackTest.isEmpty()) {
                    arrayOutFromStack.push(stackTest.pop());
                    arrayStackItem.pop();
                    // arrayPutToStack.pop(); 
                }
            }
            else {
                var nTemp = utilitytools_1.default.generateRandom(0, 1000);
                stackTest.push(nTemp);
                arrayPutToStack.push(nTemp);
                arrayStackItem.push(nTemp);
            }
        }
        console.log("Input stackArray is " + arrayPutToStack);
        console.log("Out from stackarray is " + arrayOutFromStack);
        console.log("True put to Array " + arrayStackItem);
        var arrayOut3 = [];
        while (!stackTest.isEmpty()) {
            arrayOut3.push(stackTest.pop());
        }
        console.log("out put stack is " + arrayOut3);
    };
    QueTestCase.prototype.testCommonQue = function () {
        var quequeTest = new CommonQueByPriQue();
        var arrayToTest = utilitytools_1.default.generateRandomArray(10, 1000, 100);
        console.log("" + arrayToTest);
        arrayToTest.forEach(function (value) {
            quequeTest.push(value);
        });
        var arrayOut = [];
        while (!quequeTest.isEmpty()) {
            arrayOut.push(quequeTest.removeFront());
        }
        console.log("" + arrayOut);
        quequeTest.printCurrentIndex();
        var arrayPutToQueque = [];
        var arrayOutFromQueque = [];
        for (var i = 0; i < 150; ++i) {
            var flag = utilitytools_1.default.generateRandom(0, 3);
            if (flag === 0) {
                if (!quequeTest.isEmpty()) {
                    arrayOutFromQueque.push(quequeTest.removeFront());
                    // arrayPutToStack.pop(); 
                }
            }
            else {
                var nTemp = utilitytools_1.default.generateRandom(0, 1000);
                quequeTest.push(nTemp);
                arrayPutToQueque.push(nTemp);
            }
        }
        console.log("item put to queque is " + arrayPutToQueque);
        console.log(" item remove from queque is " + arrayOutFromQueque);
        quequeTest.printCurrentIndex();
    };
    QueTestCase.prototype.testCaseListSortSimple = function () {
        var arrayHelp = [];
        var nArrayBufCount = 5;
        for (var i = 0; i < nArrayBufCount; ++i) {
            arrayHelp.push(0);
        }
        var nRandom = 124;
        var nTemp = nRandom;
        var nTemp2 = 0;
        var nFillId = 0;
        while (nTemp > 0) {
            nTemp2 = 1;
            --nTemp;
            var i = 0;
            while (i < nFillId && arrayHelp[i] !== 0) {
                nTemp2 += arrayHelp[i];
                arrayHelp[i] = 0;
                ++i;
            }
            if (i === nArrayBufCount - 1) {
                arrayHelp[i] += nTemp2;
            }
            else {
                arrayHelp[i] = nTemp2;
            }
            nTemp2 = 0;
            if (i === nFillId && nFillId < nArrayBufCount - 1) {
                nFillId++;
            }
        }
        console.log("arrayHelp is " + arrayHelp);
    };
    QueTestCase.prototype.testListOp = function () {
        var temp = new DoubleList();
        temp.insert(12);
        temp.insert(4);
        temp.insert(1);
        temp.insert(21);
        temp.insert(55);
        temp.insert(7);
        temp.printList();
        temp.reverse();
        temp.printList();
        temp.sort(function (data1, data2) {
            return data1 > data2;
        });
        temp.printList();
        var arrayTemp = utilitytools_1.default.generateRandomArray(0, 2500, 100);
        var temp2 = new DoubleList();
        console.log("\u5F85\u63D2\u5165\u7684\u5E8F\u5217\u662F" + arrayTemp);
        arrayTemp.forEach(function (data) {
            temp2.insert(data);
        });
        temp2.printList(',');
        temp2.reverse();
        temp2.printList(',');
        temp2.sort();
        temp2.printList(',');
        var arrayOut = [];
        var start = temp2.getBegin();
        while (start !== temp2.getEnd()) {
            arrayOut.push(start.m_data);
            start = start.m_next;
        }
        var array2 = arrayTemp.concat();
        array2.sort(function (data1, data2) {
            return data1 - data2;
        });
        console.log("" + array2);
        if (array2.length !== arrayOut.length) {
            console.log('list sort error!!!');
        }
        else {
            for (var i = 0; i < array2.length; ++i) {
                if (array2[i] !== arrayOut[i]) {
                    console.log('list sort error!!!');
                    return;
                }
            }
            console.log('list sort success!!!');
        }
    };
    QueTestCase.prototype.testCaseMergeKSortList = function () {
        // 生成k个list，并排序
        var k = utilitytools_1.default.generateRandom(6, 15);
        var arrayTotal = [];
        for (var i = 0; i < k; ++i) {
            var listItemCount = utilitytools_1.default.generateRandom(4, 12);
            arrayTotal.push(utilitytools_1.default.generateRandomArray(0, 1000, listItemCount));
        }
        var arrayListOut = [];
        var arrayItemTotal = [];
        arrayTotal.forEach(function (value) {
            var tempList = new DoubleList();
            console.log("" + value);
            value.forEach(function (itemData) {
                tempList.insert(itemData);
                arrayItemTotal.push(itemData);
            });
            tempList.printList();
            tempList.sort();
            tempList.printList();
            arrayListOut.push(tempList);
        });
        arrayItemTotal.sort(function (data1, data2) {
            return data1 - data2;
        });
        var outList = mergeArrayList(arrayListOut);
        outList.printList(',');
        console.log("" + arrayItemTotal);
        var arrayOut = [];
        var start = outList.getBegin();
        while (start !== outList.getEnd()) {
            arrayOut.push(start.m_data);
            start = start.m_next;
        }
        if (arrayOut.length === arrayItemTotal.length) {
            for (var i = 0; i < arrayOut.length; ++i) {
                if (arrayOut[i] !== arrayItemTotal[i]) {
                    console.log('array list merge failed!!!');
                    return;
                }
            }
            console.log('array list merge success!!!');
        }
        else {
            console.log('array list merge failed!!!');
        }
    };
    QueTestCase.prototype.runTestCase = function () {
        this.testCaseContruct();
        this.testCaseContruct2();
        this.testCaseConstruct3();
        this.testCaseChange();
        this.testCaseDeleteItem();
        this.testCaseStack();
        this.testCommonQue();
        this.testCaseListSortSimple();
        this.testListOp();
        this.testCaseMergeKSortList();
    };
    return QueTestCase;
}());
var CommonStackByPriQue = /** @class */ (function () {
    function CommonStackByPriQue() {
        this.m_priQue = new PriorityQueue(function (data1, data2) {
            return data1.m_key < data2.m_key;
        });
    }
    CommonStackByPriQue.prototype.push = function (item) {
        this.m_priQue.insert({
            m_key: this.m_priQue.getQueLength(),
            m_value: item
        });
    };
    CommonStackByPriQue.prototype.pop = function () {
        if (this.m_priQue.getQueLength() !== 0) {
            var temp = this.m_priQue.popTop();
            return temp.m_value;
        }
    };
    CommonStackByPriQue.prototype.isEmpty = function () {
        return this.m_priQue.getQueLength() === 0;
    };
    return CommonStackByPriQue;
}());
var QueKeyItem = /** @class */ (function () {
    function QueKeyItem() {
        this.m_array = [];
        this.m_array.push(0);
    }
    QueKeyItem.prototype.addOne = function () {
        var nToNext = true;
        var i = 0;
        for (i = 0; i < this.m_array.length; ++i) {
            if (this.m_array[i] === 9) {
                this.m_array[i] = 0;
            }
            else {
                break;
            }
        }
        if (nToNext) {
            if (i === this.m_array.length) {
                this.m_array.push(1);
            }
            else {
                this.m_array[i] = this.m_array[i] + 1;
            }
        }
    };
    QueKeyItem.prototype.cloneNewOne = function () {
        var temp = new QueKeyItem();
        temp.m_array = this.m_array.concat();
        return temp;
    };
    return QueKeyItem;
}());
function cmp_temp(temp1, temp2) {
    if (temp1.m_array.length === temp2.m_array.length) {
        for (var i = temp1.m_array.length - 1; i >= 0; --i) {
            if (temp1.m_array[i] !== temp2.m_array[i]) {
                return temp1.m_array[i] > temp2.m_array[i];
            }
        }
        return false;
    }
    else {
        return temp1.m_array.length > temp2.m_array.length;
    }
}
var CommonQueByPriQue = /** @class */ (function () {
    function CommonQueByPriQue() {
        this.m_currentKey = new QueKeyItem();
        this.m_priQue = new PriorityQueue(function (data1, data2) {
            return cmp_temp(data1.m_key, data2.m_key);
        });
    }
    CommonQueByPriQue.prototype.push = function (item) {
        this.m_currentKey.addOne();
        this.m_priQue.insert({
            m_key: this.m_currentKey.cloneNewOne(),
            m_value: item
        });
    };
    CommonQueByPriQue.prototype.removeFront = function () {
        var Temp = this.m_priQue.popTop();
        return Temp.m_value;
    };
    CommonQueByPriQue.prototype.isEmpty = function () {
        return this.m_priQue.getQueLength() === 0;
    };
    CommonQueByPriQue.prototype.printCurrentIndex = function () {
        console.log("" + this.m_currentKey.m_array);
    };
    return CommonQueByPriQue;
}());
function default_cmp2(item1, item2) {
    return item1 === item2;
}
function default_cmp3(item1, item2) {
    return item1 < item2;
}
var DoubleList = /** @class */ (function () {
    function DoubleList() {
        // this.m_head = null;
        this.m_sentinel = {
            m_next: null,
            m_pre: null
        };
        this.m_sentinel.m_next = this.m_sentinel;
        this.m_sentinel.m_pre = this.m_sentinel;
    }
    // 将一个元素插入到list前端
    DoubleList.prototype.getBegin = function () {
        return this.m_sentinel.m_next;
    };
    DoubleList.prototype.getEnd = function () {
        return this.m_sentinel;
    };
    DoubleList.prototype.insert = function (item) {
        var temp = {
            m_next: null,
            m_pre: null,
            m_data: item
        };
        temp.m_next = this.m_sentinel.m_next;
        temp.m_pre = this.m_sentinel;
        this.m_sentinel.m_next.m_pre = temp;
        this.m_sentinel.m_next = temp;
        // console.log(temp);
    };
    DoubleList.prototype.deleteItem = function (item, cmp) {
        if (cmp === void 0) { cmp = default_cmp2; }
        var temp = this.search(item, cmp);
        if (temp) {
            this.deleteItemByIndex(temp);
        }
    };
    DoubleList.prototype.search = function (item, cmp) {
        if (cmp === void 0) { cmp = default_cmp2; }
        var temp = this.m_sentinel.m_next;
        while (temp !== this.m_sentinel) {
            if (temp) {
                if (cmp(temp.m_data, item)) {
                    return temp;
                }
                temp = temp.m_next;
            }
            else {
                return null;
            }
        }
        return null;
    };
    DoubleList.prototype.sort = function (cmp) {
        if (cmp === void 0) { cmp = default_cmp3; }
        var arrayCount = 64;
        var arrayHelpImp = [];
        var helpTempList = new DoubleList();
        var nFillId = 0;
        for (var i = 0; i < arrayCount; ++i) {
            arrayHelpImp.push(new DoubleList());
        }
        while (!this.isEmpty()) {
            var i = 0;
            helpTempList.splice(helpTempList.getBegin(), this, this.getBegin());
            while (i < nFillId && (!arrayHelpImp[i].isEmpty())) {
                helpTempList.merge(arrayHelpImp[i++], cmp);
            }
            if (i === arrayCount) {
                arrayHelpImp[i - 1].merge(helpTempList, cmp);
                console.log('help array is full!!!');
            }
            else {
                helpTempList.swap(arrayHelpImp[i]);
            }
            if (i === nFillId && nFillId < arrayCount) {
                ++nFillId;
            }
        }
        for (var i = 1; i < nFillId; ++i) {
            arrayHelpImp[i].merge(arrayHelpImp[i - 1], cmp);
        }
        this.swap(arrayHelpImp[nFillId - 1]);
    };
    DoubleList.prototype.printList = function (strDepart) {
        if (strDepart === void 0) { strDepart = ' --> '; }
        var str = 'head';
        var start = this.getBegin();
        while (start !== this.getEnd()) {
            str = str + strDepart + start.m_data;
            start = start.m_next;
        }
        str = str + strDepart + 'end';
        console.log(str);
    };
    DoubleList.prototype.transfer = function (pos1, beginItem, endItem) {
        if (beginItem !== endItem) {
            // 将要移除的列表从原来的列表中删除
            beginItem.m_pre.m_next = endItem;
            var temp = endItem.m_pre;
            endItem.m_pre = beginItem.m_pre;
            // 插入新的列表中
            pos1.m_pre.m_next = beginItem;
            beginItem.m_pre = pos1.m_pre;
            temp.m_next = pos1;
            pos1.m_pre = temp;
        }
    };
    // 合并两个链表，其中两个链表均要有序，从小到大的顺讯
    DoubleList.prototype.merge = function (listToMerge, cmp) {
        if (cmp === void 0) { cmp = default_cmp3; }
        var start1 = this.m_sentinel.m_next;
        var end1 = this.m_sentinel;
        var start2 = listToMerge.getBegin();
        var end2 = listToMerge.getEnd();
        while (start1 !== end1 && start2 !== end2) {
            if (cmp(start2.m_data, start1.m_data)) {
                var temp = start2.m_next;
                this.transfer(start1, start2, temp);
                start2 = temp;
            }
            else {
                start1 = start1.m_next;
            }
        }
        if (start2 !== end2) {
            this.transfer(end1, start2, end2);
        }
    };
    DoubleList.prototype.isEmpty = function () {
        return this.m_sentinel.m_next === this.m_sentinel;
    };
    DoubleList.prototype.swap = function (list) {
        var temp = list.m_sentinel;
        list.m_sentinel = this.m_sentinel;
        this.m_sentinel = temp;
    };
    // 切分
    DoubleList.prototype.splice = function (pos1, list, posStart, posEnd) {
        if (posStart && posEnd) {
            if (posStart !== posEnd) {
                this.transfer(pos1, posStart, posEnd);
            }
        }
        else if (posStart) {
            var temp = posStart.m_next;
            if (pos1 === temp || pos1 === posStart)
                return;
            this.transfer(pos1, posStart, temp);
        }
        else {
            if (!list.isEmpty()) {
                this.transfer(pos1, list.getBegin(), list.getEnd());
            }
        }
    };
    // 反转链表
    DoubleList.prototype.reverse = function () {
        // 需要先判断是否为空或者只有一个元素
        var posStart = this.getBegin();
        if (posStart === this.m_sentinel || posStart.m_next === this.m_sentinel) {
            return;
        }
        posStart = posStart.m_next;
        while (posStart !== this.getEnd()) {
            var tempold = posStart;
            posStart = posStart.m_next;
            this.transfer(this.getBegin(), tempold, posStart);
        }
    };
    DoubleList.prototype.deleteItemByIndex = function (itemToDelete) {
        itemToDelete.m_next.m_pre = itemToDelete.m_pre;
        itemToDelete.m_pre.m_next = itemToDelete.m_next;
    };
    return DoubleList;
}());
function mergeArrayList(arrayList) {
    var arrayListItem = [];
    arrayList.forEach(function (data) {
        arrayListItem.push({
            m_list: data,
            m_top: data.getBegin()
        });
    });
    // 需要构造最小堆
    var prequeTemp = new PriorityQueue(function (data1, data2) {
        return data1.m_top.m_data > data2.m_top.m_data;
    });
    prequeTemp.resetQueFromArray(arrayListItem);
    var listOutput = new DoubleList();
    // 
    while (!(prequeTemp.getQueLength() === 0)) {
        var tempInsert = prequeTemp.getTopItem();
        // console.log(tempInsert);
        listOutput.splice(listOutput.getEnd(), tempInsert.m_list, tempInsert.m_top);
        if (tempInsert.m_list.isEmpty()) {
            prequeTemp.popTop();
        }
        else {
            prequeTemp.changeIndexKey(0, {
                m_list: tempInsert.m_list,
                m_top: tempInsert.m_list.getBegin()
            });
        }
    }
    return listOutput;
}
var QueTestCaseDefault = new QueTestCase();
exports.default = QueTestCaseDefault;
