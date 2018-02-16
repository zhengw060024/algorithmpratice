"use strict";
function defaultCmp(a, b) {
    return a < b;
}
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(cmp) {
        if (cmp === void 0) { cmp = defaultCmp; }
        this.m_cmp = cmp;
        this.m_arrayHeap = [];
    }
    PriorityQueue.prototype.resetQueFromArray = function (arrayInput) {
        this.m_arrayHeap = arrayInput.concat();
        // 创建堆
        if (this.m_arrayHeap.length <= 1) {
            return;
        }
        var nStartIndex = Math.floor((this.m_arrayHeap.length - 2) / 2);
        for (var i = nStartIndex; i >= 0; --i) {
            this.ajustHeap(i);
        }
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
            this.ajustHeap(nStartIndex);
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
var QueTestCase = /** @class */ (function () {
    function QueTestCase() {
    }
    return QueTestCase;
}());
