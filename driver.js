import { Tree } from "./tree.js";

export const driver = (function () {
  let tree = null;

  const initialize = () => {
    const arr = getRandomArray(12, 99);
    tree = new Tree(arr);
    testFunctions();
  };

  const getRandomArray = (size, max) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * max));
    }
    return arr;
  };

  const testFunctions = () => {
    tree.prettyPrint();
    console.log(`is balanced: ${tree.isBalanced()}\n`);
    printElements();
    unbalance();
    console.log(`\n\n`);
    tree.prettyPrint();
    console.log(`\n\nis balanced: ${tree.isBalanced()}\n`);
    console.log(`rebalancing...\n`);
    tree.rebalance();
    console.log(`is balanced: ${tree.isBalanced()}\n`);
    tree.prettyPrint();
    printElements();
  };

  const printElements = () => {
    console.log(`\n\nlevel order`);
    tree.levelOrder(function printNodeVisited(node) {
      console.log(`${node.data}`);
    });
    console.log(`\n\npreorder`);
    tree.preorder(function printNodeVisited(node) {
      console.log(`${node.data}`);
    });
    console.log(`\n\npostorder`);
    tree.postorder(function printNodeVisited(node) {
      console.log(`${node.data}`);
    });
    console.log(`\n\ninorder`);
    tree.inorder(function printNodeVisited(node) {
      console.log(`${node.data}`);
    });
  };

  const unbalance = () => {
    for (let i = 0; i < 6; i++) {
      tree.insert(Math.floor(Math.random() * (500 - 100) + 100));
    }
  };

  return { initialize };
})();
