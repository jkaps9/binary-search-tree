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
      return;
    }

    if (node.left !== null && node.left.data === value) {
      if (node.left.left === null && node.left.right === null) {
        //no children
        node.left = null;
      } else if (node.left.left === null || node.left.right === null) {
        //only 1 child
        node.left = node.left.left === null ? node.left.right : node.left.left;
      } else {
        //both children
        let succesor = this.#getSuccesor(node.left);
        succesor.left = node.left.left;
        node.left = succesor;
      }
      return;
    }

    if (node.right !== null && node.right.data === value) {
      if (node.right.left === null && node.right.right === null) {
        //no children
        node.right = null;
      } else if (node.right.left === null || node.right.right === null) {
        //only 1 child
        node.right =
          node.right.left === null ? node.right.right : node.right.left;
      } else {
        //both children
        let succesor = this.#getSuccesor(node.right);
        succesor.left = node.right.left;
        node.right = succesor;
      }
      return;
    }

    if (value < node.data) {
      this.deleteItem(value, node.left);
    } else if (value > node.data) {
      this.deleteItem(value, node.right);
    } else {
      return;
    }
  }

  inorder(node = this.root) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data + " ");
      this.inorder(node.right);
    }
  }
}
