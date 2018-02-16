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
                this.m_arrayHeap[nSubIndex] = item;
                nIndexToAjust = nSubIndex;
                nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
            }
            else {
                return nIndexToAjust;
            }
        }
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
        var nTemp = utilitytools_1.default.generateRandom(0, 250);
        console.log(nTemp);
        temp1.changeIndexKey(3, nTemp);
        console.log("\u4F18\u5148\u7EA7\u961F\u5217\u4E2D\u7684\u6570\u636E2\uFF1A" + temp1.getQueBufArray());
        var arrayOut2 = [];
        while (temp1.getQueLength() !== 0) {
            arrayOut2.push(temp1.popTop());
        }
        console.log("\u987A\u5E8Fpop\uFF1A" + arrayOut2);
    };
    QueTestCase.prototype.runTestCase = function () {
        this.testCaseContruct();
        this.testCaseContruct2();
        this.testCaseConstruct3();
        this.testCaseChange();
    };
    return QueTestCase;
}());
var QueTestCaseDefault = new QueTestCase();
exports.default = QueTestCaseDefault;
