// Problem Statement: Library Book Management System
// -------------------------------------------------
// Objective : Create a Book class and use it to manage a collection of books in a library.

// Requirements:
//   Create a Book class with the following:

//   Properties:
//       title (string)
//       author (string)
//       pages (number)
//       isAvailable (boolean, default: true)

//   Methods:
//       borrow() - Marks the book as not available
//       returnBook() - Marks the book as available
//       getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
//       isLongBook() - Returns true if pages > 300, false otherwise

//   1. Create at least 5 book objects using the class:
//       Example: "Harry Potter", "1984", "The Hobbit", etc.

//   2. Perform the following operations:

//       i. Display info of all books
//       ii. Borrow 2 books and show their availability status
//       iii. Return 1 book and show updated status
//       iv. Count how many books are "long books" (more than 300 pages)
//       v. List all available books

class Book {
  title;
  author;
  pages;
  isAvailable;

  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isAvailable = true;
  }

  borrow() {
    this.isAvailable = false;
  }

  returnBook() {
    this.isAvailable = true;
  }

  getInfo() {
    return `${this.title} by ${this.author} (${this.pages} pages)`;
  }

  isLongBook() {
    if (this.pages > 300) return true;
    return false;
  }
}

let b1 = new Book("Harry Potter", "J.K. Rowling", 1000);
let b2 = new Book("Secret Seven", "Enid Blyton", 200);
let b3 = new Book("Pride and Prejudice", "Jane Austen", 279);
let b4 = new Book("1984", "George Orwell", 328);
let b5 = new Book("To Kill a Mockingbird", "Harper Lee", 281);

let books = [b1, b2, b3, b4, b5];

for (const element of books) {
  console.log("Book Info:", element.getInfo());
}

b1.borrow();
b2.borrow();

console.log("Availability after borrowing:");
console.log(`${b1.title}   ${b1.isAvailable}`);
console.log(`${b2.title} ${b2.isAvailable}`);

b1.returnBook();

console.log("Availability after returning one book:");
console.log(`${b1.title}   ${b1.isAvailable}`);
let count = 0;
let a = books.filter((book) => {
  if (book.isLongBook()) {
    count++;
  }
});

console.log("Number of long books (>300 pages):", count);

let availableBooks = books.filter(book => book.isAvailable);
console.log("Available books:");
for (const book of availableBooks) {
  console.log(book.getInfo());
}
