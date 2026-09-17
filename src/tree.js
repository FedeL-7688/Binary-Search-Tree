import { Node } from "./node.js";

class Tree {
  queue = [];

  constructor(array, root) {
    this.arr = array;
    this.root = root;
  }

  sort(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    return [...new Set(sorted)];
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);
    let leftTree = this.buildTree(arr, start, mid - 1);
    let rightTree = this.buildTree(arr, mid + 1, end);
    node.left = leftTree;
    node.right = rightTree;

    return node;
  }

  includes(value) {
    let root = this.root;
    while (root != null) {
      if (root.data == value) {
        return true;
      } else if (value > root.data) {
        root = root.right;
      } else if (value < root.data) {
        root = root.left;
      }
    }
    return false;
  }
  insert(value) {
    let temp = new Node(value);
    let root = this.root;
    if (root == null) {
      return temp;
    } else {
      while (root != null) {
        if (root.data === value) {
          return root;
        }
        if (value > root.data && root.right !== null) {
          root = root.right;
        } else if (value < root.data && root.left !== null) {
          root = root.left;
        } else {
          break;
        }
      }
      if (root.data > value) {
        root.left = temp;
      } else {
        root.right = temp;
      }
    }
    return root;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) curr = curr.left;
    return curr;
  }

  remove(root = this.root,x) {
    if (root === null) return root;

    if (root.data > x) root.left = this.remove(root.left, x);
    else if (root.data < x) root.right = this.remove(root.right, x);
    else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      const succ = this.getSuccessor(root);
      root.data = succ.data;
      root.right = this.remove(root.right, succ.data);
    }
    return root;
  }

  levelOrderForEach(cb) {
    if (!cb) {
      throw new Error("no callback function received as parameter");
    }
    let root = this.root;
    if (root === null) return root;
    let queue = [root];
    let head = 0;

    while (head < queue.length) {
      let curr = queue[head];

      curr.data = cb(curr.data);

      if (curr.left !== null) {
        queue.push(curr.left);
      }
      if (curr.right !== null) {
        queue.push(curr.right);
      }

      head++;
    }

    return root;
  }

  recLevelOrderForEach(cb) {
    if (!cb) {
      throw new Error("no callback function received as parameter");
    }
    let root = this.root;
    if (root === null) {
      return root;
    }
    let queue = [root];
    let head = 0;

    function traverse(queue, head) {
      if (head >= queue.length) return;

      let curr = queue[head];
      curr.data = cb(curr.data);

      if (curr.left !== null) {
        queue.push(curr.left);
      }
      if (curr.right !== null) {
        queue.push(curr.right);
      }
      traverse(queue, head + 1);
    }
    traverse(queue, head);
  }

  inOrderForEach(cb) {
    if (!cb) {
      throw new Error("no callback function received as parameter");
    }
    let curr = this.root;
    if (curr === null) return curr;

    function traverse(node) {
      if (node.left !== null) {
        traverse(node.left);
      }
      node.data = cb(node.data);
      if (node.right !== null) {
        traverse(node.right);
      }
    }
    traverse(curr);
  }

  PreOrderForEach(cb) {
    if (!cb) {
      throw new Error("no callback function received as parameter");
    }
    let curr = this.root;
    if (curr === null) return curr;

    function traverse(node) {
      node.data = cb(node.data);
      if (node.left !== null) {
        traverse(node.left);
      }
      if (node.right !== null) {
        traverse(node.right);
      }
    }
    traverse(curr);
  }

  PostOrderForEach(cb) {
    if (!cb) {
      throw new Error("no callback function received as parameter");
    }
    let curr = this.root;
    if (curr === null) return curr;

    function traverse(node) {
      if (node.left !== null) {
        traverse(node.left);
      }
      if (node.right !== null) {
        traverse(node.right);
      }
      node.data = cb(node.data);
    }
    traverse(curr);
  }

  height(value) {
    if (value == null) {
      throw new Error("no valid value passed as argument");
    }

    function getHeight(node) {
      if (node == null) {
        return -1;
      }
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    function traverse(root, value) {
      let curr = root;
      if (curr == null) return;

      if (curr.data > value) {
        return traverse(curr.left, value);
      } else if (curr.data < value) {
        return traverse(curr.right, value);
      } else if (curr.data == value) {
        return getHeight(curr);
      } else return undefined;
    }
    return traverse(this.root, value);
  }

  depth(value) {
     if (value == null) {
      throw new Error("no valid value passed as argument");
    }

  

    function traverse(root, value,count = 0) {
      let curr = root;
      
      if (curr == null) return;

      if (curr.data > value) {
        return traverse(curr.left, value,count+1);
      } else if (curr.data < value) {
        return traverse(curr.right, value,count+1);
      } else if (curr.data == value) {
        return count
      } 
      
      else return undefined;
    }
  
    return traverse(this.root, value,0);
  }

  // isBalanced(curr = this.root){
   
  //   if (curr == null) return true

  //   let leftHeight = curr.left ? this.height(curr.left.data) : -1;
  //   let rightHeight = curr.right ? this.height(curr.right.data) : -1;
  //   let currNodeBalanced = Math.abs(leftHeight-rightHeight)<=1

  //   return currNodeBalanced && this.isBalanced(curr.left)&& this.isBalanced(curr.right)
     
    
    
  //   }




// finished isBalanced function:

//   -my version(commented): takes root as default parameter, then:
//     1)checks if curr is null, returning true
//     2)calculates leftheight by asking if curr.left exist and using the height function. if it doens't returns -1
//     3)calculates rightheight the same way.
//     4) sets a variable containing the boolean check of 'if' the absolute value of leftheight - righheight is minor equal to 1
//     5) returns that variable AND isBalanced(left) AND isBalanced(right)

//     this implementation has an efficiency of O(N^2) due to the inner calculation of every iteration of nodes.

//   -version recommended by AI: set helper function checkBalance wich receives
//    a root parameter
//    1)check if root === null, returning 0;
//    2)set left to checkbalance(root.left) and checks if it returns -1
//      and elevating that -1 to parent call
//    3) same process to root.right
//    4) if none of the  above goes trough, check if
//       the absolute value of left - right is over 1, returning -1

//    5) else return 1 + math.max(left,right)

//    finish with function call checkBalance(this.root)!==-1
//    which will return a boolean equal to true if the tree has a diference <=1
//    or false if the difference is >1

//    this implementation has an efficiency of O(N) because it eliminates the necesity of using height function
//    therefore making only 1 function call per iteration.

isBalanced() {

function checkBalance(curr) {
  if (curr === null) return 0; 
  let left = checkBalance(curr.left);
  if (left === -1) return -1;
  let right = checkBalance(curr.right);
  if (right === -1) return -1; 

  if (Math.abs(left - right) > 1) return -1;

  return 1 + Math.max(left, right);
}
  return checkBalance(this.root) !== -1;
}

reBalance(){
  let balanceResult = this.isBalanced()
  if (balanceResult===false){
     let curr = this.root
     
     function traverse(curr,newTree = []){
      if (curr==null) return 

      if (curr.left !== null){
          traverse(curr.left,newTree)
         }
       
          newTree.push(curr.data)
         
         
         if(curr.right!== null){
          traverse(curr.right,newTree)
         }

         return newTree
     }

     let array = traverse(curr)
     let sortedArr = this.sort(array)
    let newTree = this.buildTree(sortedArr,0,sortedArr.length-1)
    this.root = newTree

  }
  else if(balanceResult===true){
    return null
  }
}


  
}

export { Tree };
