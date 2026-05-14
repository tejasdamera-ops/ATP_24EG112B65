// Write a function that receives 3 number args and return the big number

function findBigNumber(a, b, c) {
  if (a >= b && a >= c) {
    return a;
  } else if (b >= a && b >= c) {
    return b;
  } else {
    return c;
  }
}

console.log(findBigNumber(10, 50, 30));