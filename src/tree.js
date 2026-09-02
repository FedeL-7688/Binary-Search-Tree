import {Node} from './node.js'

class Tree{
    constructor(array,root){
        this.arr = array
       this.root = root
    }



    
    sort(arr){
        if (arr.length<=1) return
        let left = 0
        let right = arr.length
        let mid = Math.floor((left+right)/2)
        let leftArr = arr.slice(left,mid)
        console.log(leftArr)
        let rightArr = arr.slice(mid,right)
        console.log(rightArr)
        let result = []
        for(let i = 0;i<leftArr.length;i++){
        for(let j = 0;j <rightArr.length;j++)
        
        }
        console.log(arr)
       return result
    }


    buildTree(arr){
        let start = 0
        let end = arr.length-1
        let mid = (start+end)/2
        let leftNode = arr.slice(start,mid-1)
        let rightNode = arr.slice(mid,end)
        this.root = new Node(mid,leftNode,rightNode)
    }
}


// const prettyPrint = (node, prefix = '', isLeft = true) => {
//   if (node === null || node === undefined) {
//     return;
//   }

//   prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//   console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
//   prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
// }



export {Tree}



//pseudoCode: 
// recieve an array as parameter
// if unsorted, sort array:
//  1) take array, and split it in halves
//  2) recurse to this function untill you have only a pair to operate
//  3) change array index between both elementes
//  4) return sorted array