// 6. Write a function that receives an array as arg and return their sum

function findSum(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }

  return sum;
}

console.log(findSum([90, 78, 65, 98]));