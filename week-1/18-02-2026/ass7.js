//  Write a function that receives an array & search element as args and returns the index of that search element in the array.
// It should return "not found" when search element not found.

function searchElement(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) {
      return i;
    }
  }

  return "not found";
}

console.log(searchElement([10, 20, 30, 40], 30)); 
console.log(searchElement([10, 20, 30, 40], 50));