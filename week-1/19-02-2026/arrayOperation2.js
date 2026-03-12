// Assignment 2: Online Course Name Processor
// ------------------------------------------
// Scenario : You are preparing a course list for display on a website.

// Test data:
const courses = ["javascript", "react", "node", "mongodb", "express"];


// Tasks:
//     1. filter() courses with name length > 5
//     2. map() to convert course names to uppercase
//     3. reduce() to generate a single string:
//               "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"

//     4. find() the course "react"
//     5. findIndex() of "node"

let longCourses=courses.filter((Element)=> Element.length>5);
console.log('courses with name length > 5 :'+longCourses);


let upperCaseCourses=courses.map((Element)=> Element.toUpperCase());
console.log('course names to uppercase:'+upperCaseCourses);


let string=courses.reduce((acc,Element)=>{
    return `${acc.toUpperCase()} | ${Element.toUpperCase()}`
})

console.log (string);

let course=courses.find((Element)=> Element==='react')
console.log('course "react":'+course);


let index=courses.findIndex((Element)=>Element==='node');
console.log('index of node'+index);

