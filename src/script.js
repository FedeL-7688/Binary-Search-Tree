import { Tree } from "./tree.js";

let testArr = [1, 2, 5,7,6,3,4];

let tree = new Tree(testArr);
let sortedArr = tree.sort(testArr);
console.log(sortedArr);

let prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};


function add10(value){
 console.log(value)
 return value
}
let rootNode =tree.buildTree(sortedArr, 0, sortedArr.length-1);
tree.root = rootNode
console.log(tree.root)
 tree.insert(88)
 tree.insert(9)
 tree.insert(0)
//  tree.levelOrderForEach(add10)
//  tree.recLevelOrderForEach(add10)
 tree.PostOrderForEach(add10)
prettyPrint(tree.root);
console.log(tree.includes(2))

