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



  
}

export { Tree };
