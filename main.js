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
// bts.inorder();

prettyPrint(bts.root);
// console.log();
// console.log();
// bts.insert(6);
// // prettyPrint(bts.root);
// // console.log();
// bts.insert(8); // check that you can't insert a new node with an existing value
// // prettyPrint(bts.root);

// // console.log();
// bts.insert(50);
// prettyPrint(bts.root);
// console.log();

// // bts.deleteItem(50); // check node with no children
// prettyPrint(bts.root);
// console.log();

// bts.deleteItem(5); // check node with only 1 child
//prettyPrint(bts.root);
//console.log();

//bts.deleteItem(8); // check node with both children
//prettyPrint(bts.root);
//console.log();

// console.log(bts.find(8)); // null
// console.log(bts.find(1)); // Object
// console.log(bts.find(9)); // Object
// console.log();
// prettyPrint(bts.root);

// console.log();
// console.log();
// console.log();

// bts.levelOrder(function printNodeVisited(node) {
//   console.log(`visited ${node.data}`);
// });
// console.log();
// bts.inorder(function printNodeVisited(node) {
//   console.log(`visited ${node.data}`);
// });
// console.log();
// bts.preorder(function printNodeVisited(node) {
//   console.log(`visited ${node.data}`);
// });

// console.log();
// bts.postorder(function printNodeVisited(node) {
//   console.log(`visited ${node.data}`);
// });

console.log();
console.log();

console.log(bts.height(8));
console.log();
console.log(bts.depth(8)); // 0
console.log(bts.depth(67)); // 1
console.log(bts.depth(23)); // 3
console.log(bts.depth(1)); // 2
console.log(bts.depth(6345)); // 3
console.log(bts.depth(456)); // null
