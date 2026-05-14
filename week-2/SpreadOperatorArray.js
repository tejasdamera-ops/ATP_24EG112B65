//Exercise 1: Copy & Extend an Array

//Goal: Learn array copying with spread

//You are given:
let fruits = ["apple", "banana"];

//Tasks
//-> Create a new array moreFruits

    //    -> Copy all fruits from fruits

//-> Add "orange" at the end using spread

//> Print both arrays

//✅ Expected Output
//["apple", "banana"]
//["apple", "banana", "orange"]

//👉 Original array should NOT change.

let moreFruits = [...fruits, "orange"];
console.log(fruits);
console.log(moreFruits);
