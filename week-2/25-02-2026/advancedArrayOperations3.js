// ASSIGNMENT 3:
// -------------
// Employee Payroll Processor

// You are building a salary processing module in a company HR app.

// Test data:
const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" },
];

// Tasks:
//     1. filter() employees from IT department
//     2. map() to add:
//             netSalary = salary + 10% bonus

//     3. reduce() to calculate total salary payout
//     4. find() employee with salary 30000
//     5. findIndex() of employee "Neha"

let itDeptStudents = employees.filter((Element) => Element.department == "IT");

console.log("Employees from IT Department:", itDeptStudents);

let netSalary = employees.map((empObj) => {
  return (empObj.netsalary = empObj.salary + empObj.salary / 10);
});
console.log("Employees after adding netSalary (10% bonus):", employees);

let  totalSalary= employees.reduce((acc, empObj) =>{ return acc + empObj.salary},0);
console.log("Total Salary Payout:", totalSalary);


let emp=employees.find((Element)=>{ return Element.salary==30000})
console.log("Employee with salary 30000:", emp);


let index=employees.findIndex((Element)=>{
  return Element.name==='Neha'
})

console.log("Index of employee 'Neha':", index);
