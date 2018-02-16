
function defaultCmp<T>(a:T, b:T):boolean {
    return a < b;
}
class PriorityQueue<T> {
    constructor( cmp:(a:T,b:T) => boolean = defaultCmp) {
        this.m_cmp = cmp;
        this.m_arrayHeap = [];
    }
    resetQueFromArray(arrayInput: Array<T>) {
        this.m_arrayHeap = arrayInput.concat();
        // 创建堆
        if(this.m_arrayHeap.length <= 1) {
            return;
        }
        const nStartIndex = Math.floor((this.m_arrayHeap.length - 2) / 2);
        for(let i = nStartIndex; i >= 0; --i) {
            this.ajustHeap(i);
        }
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
                this.m_arrayHeap[nSubIndex] = item;
                nIndexToAjust = nSubIndex;
                nSubIndex = Math.floor((nIndexToAjust - 1) / 2);
            }else {
                return nIndexToAjust;
            }
        }

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
            this.ajustHeap(nStartIndex);
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
class QueTestCase {
    constructor() {
        
    }
}