import { mergeSort } from "./merge-sort.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    let arr = this.getSortedArray(array);
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  getSortedArray(array) {
    let tempArray = [];
    array.forEach((element) => {
      if (!tempArray.includes(element)) {
        tempArray.push(element);
      }
    });
    return mergeSort(tempArray);
  }

  buildTree(array, start, end) {
    // Set The middle element of the array as root.
    // Recursively do the same for the left half and right half.
    //// Get the middle of the left half and make it the left child of the root created in step 1.
    //// Get the middle of the right half and make it the right child of the root created in step 1.
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value === node.data) {
      return;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  #getSuccesor(node) {
    if (node === null) {
      throw new Error("can't get successor of null node");
    }

    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) {
      return node;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      //  found the node to delete
      if (node.left === null) {
        //either no children, or only the right child
        //if no children, we want to return null (instead of the node)
        //if only the right child then we would return the right child
        //if there are no children the right child would be null,
        //so by returning the right child we satisfy both requirements
        return node.right;
      }

      if (node.right === null) {
        // see notes above
        return node.left;
      }

      // Both children present

      // get inorder successor
      let succesor = this.#getSuccesor(node);

      // copy contents of inorder successor to the node
      node.data = succesor.data;

      // delete inorder successor
      node.right = this.deleteItem(succesor.data, node.right);
    }

    return node;
  }

  find(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    } else {
      return node;
    }
  }

  levelOrder(callback) {
    if (
      callback === null ||
      callback === undefined ||
      typeof callback !== "function"
    ) {
      throw new Error("must pass a callback function to levelOrder");
    }

    let queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let currNode = queue.shift();
      callback(currNode);
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
    }
  }

  inorder(callback, node = this.root) {
    if (
      callback === null ||
      callback === undefined ||
      typeof callback !== "function"
    ) {
      throw new Error("must pass a callback function to inorder");
    }

    if (node !== null) {
      this.inorder(callback, node.left);
      callback(node);
      this.inorder(callback, node.right);
    }
  }

  preorder(callback, node = this.root) {
    if (
      callback === null ||
      callback === undefined ||
      typeof callback !== "function"
    ) {
      throw new Error("must pass a callback function to preorder");
    }

    if (node !== null) {
      callback(node);
      this.preorder(callback, node.left);
      this.preorder(callback, node.right);
    }
  }

  postorder(callback, node = this.root) {
    if (
      callback === null ||
      callback === undefined ||
      typeof callback !== "function"
    ) {
      throw new Error("must pass a callback function to postorder");
    }

    if (node !== null) {
      this.postorder(callback, node.left);
      this.postorder(callback, node.right);
      callback(node);
    }
  }

  height(value) {
    function helper(node) {
      if (node === null) return -1;
      const left = helper(node.left);
      const right = helper(node.right);
      return Math.max(left, right) + 1;
    }

    const node = this.find(value);
    const nodeHeight = helper(node);
    if (nodeHeight === -1) return null;
    else return nodeHeight;
  }

  depth(value) {
    let node = this.root;
    if (node.data === value) {
      return 0;
    }
    let distance = 0;
    let found = false;
    while (!found && node !== null) {
      if (value < node.data) {
        node = node.left;
        distance++;
      } else if (value > node.data) {
        node = node.right;
        distance++;
      } else {
        found = true;
      }
    }

    return found ? distance : null;
  }

  isBalanced(node = this.root) {
    //A binary tree is considered balanced if, for every node in the tree, the height difference
    // between its left and right subtrees is no more than 1, and both the left and right subtrees are
    // also balanced.

    if (node.left === null || node.right === null) {
      return true;
    }
    const leftHeight = this.height(node.left.data);
    const rightHeight = this.height(node.right.data);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }
}
