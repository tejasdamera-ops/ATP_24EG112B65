// ASSIGNMENT 5: 
// -------------
// Bank Transaction Analyzer

// You are building a bank statement summary.

// Test data:
const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];


// Tasks:
//     1. filter() all credit transactions
//     2. map() to extract only transaction amounts
//     3. reduce() to calculate final account balance
//     4. find() the first debit transaction
//     5. findIndex() of transaction with amount 10000



let creditTransactions = transactions.filter(Element => { return Element.type === "credit"});
console.log("Credit Transactions:", creditTransactions);

let transactionAmounts = transactions.map(Element => {return Element.amount});
console.log("Transaction Amounts:", transactionAmounts);

let finalBalance = transactions.reduce((balance, txn) => {
  if (txn.type === "credit") {
    return balance + txn.amount;
  }
  return balance - txn.amount;
}, 0);
console.log("Final Account Balance:", finalBalance);

let firstDebit = transactions.find(Element => { return Element.type === "debit"});
console.log("First Debit Transaction:", firstDebit);

let indexOfTenThousand = transactions.findIndex(Element => {return Element.amount === 10000});
console.log("Index of transaction with amount 10000:", indexOfTenThousand);