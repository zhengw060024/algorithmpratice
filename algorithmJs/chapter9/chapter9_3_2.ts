// 算法导论第九章第三节课后习题
// 算法导论9-3-1：
// 证明：对于n =7 的划分，和n= 5的划分类似，可以得到
// O(n) <= c * n + O(n / 7) + O(5 * n / 7 + 12) (线性)
// 同样可以推导出来对于3划分有
// O(n) <= c * n + O(n / 3) + O(n *2/ 3 + 4) (这个是非线性的。)

// 算法导论9-3-2 证明，在Select 函数中，n > 140 时，至少有ceil(n / 4)数据大于等于 枢轴，至少有
// ceil(n / 4) 小于枢轴。
// 证明： 当n > 140时， 3 * ceil(ceil(n / 5)/2 - 2) > 3* n/10 - 6 > ceil(n / 4)

// 9.3-3 如何修改快拍让它在最坏的情况下执行效率在 n * log(n)
//也就是在快排的过程中将选取枢轴的过程修改成 线性查找中位数方式做枢轴，让后当left和right的区间小于140时，
//结束递归，最后统一来一次插入排序即可。

// 9.3-4假设一个算法只使用比较来查找一组n个元素中的第i个最小元素。
// 证明它也可以在不进行任何额外比较的情况下找到i-1较小的元素和n-i较大的元素。
// 对于一个任意数组，在只使用比较的情况下，获取第i个最小元素只能淘汰机制，即淘汰掉i -1较小的过程，
// 可以在这个过程中将被小于淘汰数据缓存下来，这样在淘汰机制的最后，肯定就可以获取i -1个较小的元素，同理
// 对于较大元素也一样。
// 9.3-5 假设您有一个“黑盒”最坏情况的线性时间获取中值的子函数。给出一个简单的线性时间算法，解决任意阶统计量的选择问题。
// 将非递归随机划分法中的随机划分的枢轴选取改成该中位数子函数获取，即可。

// 9.3-7 设计一个O(n)的算法，对于各给定的包含n个互异元素的集合s和一个正整数k <= n,该算法能够确定s中最接近
// 中位数的k个元素。
// 思路使用Select算法，求出中位数 在左右子数组中求取floor((m - k) / 2),以及ceil((m+k) / 2) - floor(m /2) -1,
// 比较极限位置floor((m - k) / 2)，ceil((m+k) / 2)和中位数大小确定在m和k为一个奇数和偶数时哪个更接近中位数。
// 这是个随机化的算法。
/**
 * 返回排序之后begin到end之间的数据的随机化选择算法
 * 注意这里有个前提条件 arrayInput中的数据必须互异
 * 如果arrayInput中的数据不能满足互异条件需要将分割算法
 * 做修改，返回一个中值的范围。
 * @param arrayInput 
 * @param begin 
 * @param end 
 */
function getNearKNum(arrayInput: Array<number>, begin: number, end: number): Array<number> {
    let beginStop = false;
    let nStart = 0;
    let nEnd = arrayInput.length -1;
    while (true) {
        let nIndex = _helpDepart(arrayInput,nStart,nEnd);
        if(nIndex < begin) {
            nStart = nIndex + 1;
        }else if(nIndex > end){
            nEnd = nIndex - 1;
        }else if(nIndex >= begin && nIndex <= end) {
            let nLeftBegin = nStart;
            let nRightBegin = nIndex;
            while(nLeftBegin < nRightBegin) {
                let nMidbegin = _helpDepart(arrayInput,nLeftBegin,nRightBegin);
                if(nMidbegin < begin ) {
                    nLeftBegin = nMidbegin + 1;
                }else if(nMidbegin > begin) {
                    nRightBegin = nMidbegin - 1;
                }else {
                    nLeftBegin = nMidbegin;
                    break;
                }
            }
            let nLeftEnd = nIndex;
            let nRightEnd = nEnd;
            while(nLeftEnd < nRightEnd) {
                let nMidEnd = _helpDepart(arrayInput,nLeftEnd,nRightEnd);
                if( nMidEnd < end) {
                    nLeftBegin = nMidEnd + 1;
                }else if(nMidEnd > end) {
                    nRightEnd = nMidEnd - 1;
                }else {
                    nLeftEnd = nMidEnd;
                    break;
                }
            }
            return arrayInput.slice(nLeftBegin,nLeftEnd + 1);
        }
    }
    return [];
}
function _helpDepart(arrayInput: Array<number>, begin: number, end: number) :number{
    // 用begin做枢轴吧，不random了
    let nTemp = arrayInput[begin];
    let j = begin;
    for(let i = begin + 1; i <= end; ++i ) {
        if(arrayInput[i] < nTemp) {
            
            arrayInput[j] = arrayInput[i];
            arrayInput[i] = arrayInput[++j];
        }
    }
    return 0;
}
function _helpDepartRange(arrayInput: Array<number>, begin: number, end: number) {
    let nTemp = arrayInput[begin];
    let j = begin;
    let k = j;
    // k表示枢轴相同数字起始位置，j表示结束位置
    for(let i = begin + 1; i <= end; ++i ) {
        if(arrayInput[i] < nTemp) {
            arrayInput[j] = arrayInput[k];
            arrayInput[k] = arrayInput[i];
            arrayInput[i] = arrayInput[++j];
            ++k;
        }else if(arrayInput[i] === nTemp) {
            arrayInput[j] = arrayInput[i];
            arrayInput[i] = arrayInput[++j];
        }
    }
    return [k,j];
}