import utilityTools from "./utilitytools";
/**
 * 
 * @param arrayInput 
 * @param begin 
 * @param end 
 */
function insertSort(arrayInput:Array<number>,begin:number,end:number) {
    for(let i = begin; i < end;++i) {
        let j = i + 1;
        if(arrayInput[begin] > arrayInput[j]) {
            let nTemp = arrayInput[j];
            while(j > begin) {
                arrayInput[j] = arrayInput[j - 1];
                --j;
            }
            arrayInput[j] = nTemp;
        }else {
            let nTemp = arrayInput[j];
            while(arrayInput[j-1] > nTemp) {
                arrayInput[j] = arrayInput[j - 1];
                --j;
            }
            arrayInput[j] = nTemp;
        }
    }
}
/**
 * 测试插入排序代码
 */
// function checkArraySame(arrayInput:Array<number>,arrayTest:Array<number>) {
//     if(arrayInput.length === arrayTest.length) {
//         for(let i = 0; i < arrayTest.length; ++i) {
//             if(arrayInput[i] !== arrayTest[i]) {
//                 return false;
//             }
//         }
//         return true;
//     }
//     return false;
// }
// let arrayToTest = utilityTools.generateRandomArray(0,10,20);
// let arrayToCheck = arrayToTest.concat();
// insertSort(arrayToCheck,0,19);
// console.log(arrayToCheck);
// let checkResult = checkArraySame(arrayToTest.concat().sort((a,b) => {
//     return a  -b;
// }),arrayToCheck);
// console.log(checkResult);


//线性时间的中位数查找算法
function findKItem( arrayInput:Array<number>,nIndex:number) {
    
    let nKSquenceNum = _findKItem_help(arrayInput,0,arrayInput.length - 1, nIndex);
    return nKSquenceNum;

}
function departIndex(arrayInput:Array<number>,nBegin:number, nEnd:number,nNum:number) {
    // j表示第一个可能大于等于nNum的位置
    let i = nBegin;
    let j = nBegin;
    for(; i <= nEnd; ++i) {
            if(arrayInput[i] < nNum ) {
                // swap(pos[i],pos[j]) ++j;
               let nTemp = arrayInput[i];
               arrayInput[i] = arrayInput[j];
               arrayInput[j] = nTemp;
               ++j;
            } 
    }
    return j;
}
function _findKItem_help(arrayInput:Array<number>,beginIndex:number,endIndex:number,nIndex:number):number {

    let arrayTemp:Array<number> = [];
    let nDepartNum= _findKItem_help(arrayTemp,0,arrayTemp.length - 1, 
        Math.floor((arrayTemp.length - 1) / 2));
    
    let nDepartIndex = departIndex(arrayInput,beginIndex,endIndex,nDepartNum);
    if(nDepartIndex  <  nIndex) {
       return  _findKItem_help(arrayInput,nDepartIndex + 1,nDepartIndex,nIndex);

    } else  if (nDepartIndex > nIndex){
        return _findKItem_help(arrayInput,beginIndex,nDepartIndex - 1,nIndex);
    }else {
        return nDepartIndex;
    }
}