// Assignment 3: Student Marks List
// --------------------------------
// Scenario : You receive marks from an exam system.

// Test data:
const marks = [78, 92, 35, 88, 40, 67];

// Tasks:
//     1. filter() marks ≥ 40 (pass marks)
//     2. map() to add 5 grace marks to each student
//     3. reduce() to find highest mark
//     4. find() first mark below 40
//     5. findIndex() of mark 92

let list = marks.filter((Element) => Element >= 40);
console.log("marks ≥ 40:" + list);

let updatedMarks = marks.reduce((acc, Element) => acc + Element);
console.log("updatededmarks after adding 5 marks:" + updatedMarks);

let highestMark = marks.reduce(function (max,Element ) {
  if (Element> max) {
    return Element;
  } else {
    return max;
  }
});

console.log("Highest mark:", highestMark);

let Element = marks.find((Element) => Element == 40);
console.log(" first mark below 40:" + Element);

let index = marks.findIndex((Element) => Element == 92);
console.log("Index() of mark 92:" + index);
