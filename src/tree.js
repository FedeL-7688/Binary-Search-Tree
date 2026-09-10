import { Node } from "./node.js";

class Tree {
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
    while (curr !== null && curr.left !== null)
        curr = curr.left;
    return curr;
}

 remove(root, x) {
    if (root === null)
        return root;

    if (root.data > x)
        root.left = this.remove(root.left, x);
    else if (root.data < x)
        root.right = this.remove(root.right, x);
    else {
        if (root.left === null)
            return root.right;
        if (root.right === null)
            return root.left;

        const succ = this.getSuccessor(root);
        root.data = succ.data;
        root.right = this.remove(root.right, succ.data);
    }
    return root;
}
}

export { Tree };

