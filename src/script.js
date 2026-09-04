import { Tree } from "./tree.js";

let testArr = [1, 2, 5];

let testClass = new Tree(testArr);
let sortedArr = testClass.sort(testArr);
console.log(sortedArr);

let prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};
let rootNode =testClass.buildTree(sortedArr, 0, sortedArr.length-1);
testClass.root = rootNode

prettyPrint(testClass.root);
