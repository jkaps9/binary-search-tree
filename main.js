import { Tree } from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const bts = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
bts.inorder();

prettyPrint(bts.root);
console.log();
console.log();
bts.insert(6);
prettyPrint(bts.root);
console.log();
bts.insert(8);
prettyPrint(bts.root);

console.log();
bts.insert(50);
prettyPrint(bts.root);
