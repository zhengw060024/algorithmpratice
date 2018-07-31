// 期望为线性事件的选择算法。原理，利用快排的划分算法。
function randomMized_select(arrayInput:Array<number>,
    startIndex:number,ennIndex:number,kMax:number):number{
        if(startIndex == ennIndex) {
            return arrayInput[startIndex];
        } else {
            let nIndexDepart = randomDepart(arrayInput,startIndex,ennIndex);
            let nIndexGet = nIndexDepart - startIndex;
            if(nIndexDepart == kMax) {
                return arrayInput[nIndexDepart];
            }else {
                if(nIndexGet > kMax) {
                    return randomMized_select(arrayInput,startIndex,kMax,nIndexDepart - 1);
                }else {
                    return randomMized_select(arrayInput,nIndexDepart + 1,ennIndex,kMax - nIndexGet - 1)
                }
            }
        }

}
function randomDepart(arrayInput:Array<number>,
    startIndex:number,ennIndex:number):number{
        return 0;
    }