// Assignment 1: Daily Temperature Analyzer
// ----------------------------------------
// Scenario : You are analyzing daily temperatures recorded by a weather app.

// Test data:
let temperatures = [32, 35, 28, 40, 38, 30, 42];

// Tasks:
//     1. filter() temperatures above 35
//     2. map() to convert all temperatures from Celsius → Fahrenheit
//     3. reduce() to calculate average temperature
//     4. find() first temperature above 40
//     5. findIndex() of temperature 28

let highTemperatures = temperatures.filter((Element) => Element > 35);

console.log("temperatures above 35", highTemperatures);

let fahrenheitTemperatures = temperatures.map((temp) => (temp * 9) / 5 + 32);
console.log("Temperatures in Fahrenheit:", fahrenheitTemperatures);

let averageTemperature = temperatures.reduce(
  (accumlator, Element) => accumlator + Element,
);
averageTemperature = averageTemperature / temperatures.length;
console.log("average temperature", averageTemperature);

let temperature = temperatures.find((Element) => Element > 40);
console.log("first temperature above 40", temperature);

let  index =temperatures.findIndex((Element) => Element === 28);
console.log("Index of temperature 28", index);
