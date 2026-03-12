// ASSIGNMENT 2:
// -------------
// Student Performance Dashboard

// You are working on a college result analysis system.

// Test Data:
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 },
];

// Tasks:
//     1. filter() students who passed (marks ≥ 40)
//     2. map() to add a grade field
//               ≥90 → A
//               ≥75 → B
//               ≥60 → C
//               else → D

//    3. reduce() to calculate average marks
//    4. find() the student who scored 92
//    5. findIndex() of student "Kiran"

let passedStudents = students.filter((stuObj) => stuObj.marks >= 40);
console.log("Students who passed (marks ≥ 40):", passedStudents);

let grades = students.map((stuObj) => {
  if (stuObj.marks >= 90) return (stuObj.grade = "A");
  else if (stuObj.marks >= 75) return (stuObj.grade = "B");
  else if (stuObj.marks >= 60) return (stuObj.grade = "C");
  else if (students.marks > 40) return (stuObj.grade = "D");
});
console.log("Students after adding grades:", students);

let avgMarks = students.reduce((acc, Element) => {
  return acc + Element.marks;
}, 0);
avgMarks = avgMarks / students.length;
console.log("Average Marks:", avgMarks);

let studentWith92Marks = students.find((stuObj) => {
  return (stuObj.marks == 92);
});
console.log("Student who scored 92:", studentWith92Marks);

let index = students.findIndex((stuObj) => stuObj.name == "Kiran");

console.log("Index of student 'Kiran':", index);
