
import {Node} from './node.js'

class Tree{
    constructor(array,root){
        this.arr = array
       this.root = root
    }



    
    sort(arr){
        const sorted = [...arr].sort((a,b)=>a-b)
        return [...new Set(sorted)]
    }


    buildTree(arr,start,end){
        
        if(start>end){
                return null
        }
        let mid = Math.floor((start+end)/2)
        let node = new Node(arr[mid])
        let leftTree = this.buildTree(arr,start,mid-1)
        let rightTree = this.buildTree(arr,mid+1,end)
        node.left = leftTree
        node.right = rightTree
         
         
        return node
    }

   

}




export {Tree}



//pseudoCode: 
// recieve an array as parameter
// if unsorted, sort array:
//  1) take array, and split it in halves
//  2) recurse to this function untill you have only a pair to operate
//  3) change array index between both elementes
//  4) return sorted array