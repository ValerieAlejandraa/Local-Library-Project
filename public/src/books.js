function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//it returns an array with two arrays inside of it
//all of the inputted books are present in either the first or secound array

let partitionBooksByBorrowedStatus = books => {
  let booksReturned = books.filter((book) =>
    book.borrows.every( borrow => borrow.returned === true)
  );

  let booksBorrowed = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );

  let finalArray = [[...booksBorrowed], [...booksReturned]];
  return finalArray;
};

//parameter: two arrays, a book object and an array of all account objects 
//1. should return an array of ten or fewer account objects  .slice(0,10) 
//2. each object represent the accounts given by ID in the provided book's `borrows` array 
//   borrows: [
// {
//    id: "5f446f2e2cfa3e1d234679b9", 
//   returned: false,}

// however, each object should include the RETURNED ENTRY from the corresponding transaction object in the borrows array


//use the map() method to loop through the borrows array
function getBorrowersForBook(book, accounts) {
  // Create a variable to store the data in 
  let result = book.borrows.map((borrow) => {  // Loop over book.borrows in our parameter 
    //Create a variable and find the account's ID and compare the borrow's ID
    let account = accounts.find((account) => account.id === borrow.id)

    // Return an object with the borrow's and the account inside the object 
    return { ...borrow, ...account}
  })
    
  // return an array of ten or fewer account objects .slice(0,10)
  return result.slice(0,10)
}
   




module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
