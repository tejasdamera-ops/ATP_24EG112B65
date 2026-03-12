// 2. Find the big number in given three numbers

let a = 15;
let b = 40;
let c = 30;

let big;

if (a >= b && a >= c) {
  big = a;
} else if (b >= a && b >= c) {
  big = b;
} else {
  big = c;
}

console.log("Big number is:", big);