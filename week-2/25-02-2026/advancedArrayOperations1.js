//// ASSIGNMENT 1:
// Test Data :
const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true },
];

// Tasks:
//     1. Use filter() to get only inStock products
//     2. Use map() to create a new array with:  { name, totalPrice }
//     3. Use reduce() to calculate grand total cart value
//     4. Use find() to get details of "Mouse"
//     5. Use findIndex() to find the position of "Keyboard"

let inStockProducts = cart.filter(item => item.inStock);
console.log("In Stock Products:", inStockProducts);

let array = cart.map((Element) => {
  return `${Element.name}:${Element.price * Element.quantity}`;
});
console.log(` array with:{ name, totalPrice }:${array}`);

let  grandTotal= cart.reduce((acc, Element) => {
  return acc + Element.price * Element.quantity;
}, 0);
console.log(`grand total cart value:${grandTotal}`);

let mouseDetails = cart.find(item => item.name === "Mouse");
console.log("Mouse Details:", mouseDetails);

let  index= cart.findIndex((cartObj) => cartObj.name == "Keyboard");

console.log(`the position of "Keyboard" ${index}`);
