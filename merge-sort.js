export function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    let newArr = [];
    let leftHalf = mergeSort(arr.slice(0, arr.length / 2));
    let rightHalf = mergeSort(arr.slice(arr.length / 2));

    while (leftHalf.length > 0 && rightHalf.length > 0) {
      if (leftHalf[0] <= rightHalf[0]) {
        newArr.push(leftHalf[0]);
        leftHalf.shift();
      } else {
        newArr.push(rightHalf[0]);
        rightHalf.shift();
      }
    }

    return newArr.concat(leftHalf).concat(rightHalf);
  }
}
