import { mergeSort } from "./merge-sort.js";

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor(array) {
    let arr = this.getSortedArray(array);
    this.root = this.buildTree(arr, 0, arr.length);
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
    // Print the preorder of the tree.
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }
}
