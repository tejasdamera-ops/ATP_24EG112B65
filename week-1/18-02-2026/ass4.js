// 4. Find the smallest element in marks array

let marks = [90, 78, 65, 98];

let smallest = marks[0];

for (let i = 1; i < marks.length; i++) {
  if (marks[i] < smallest) {
    smallest = marks[i];
  }
}

console.log("Smallest number", smallest);