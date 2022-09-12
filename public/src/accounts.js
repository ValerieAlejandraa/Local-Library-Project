//this function returns the account object that has the matching ID
function findAccountById(accounts, id) {
  //two parameters,an array of account objects and  a string ID of a single account object , it returns the account object that has the matching ID
  return accounts.find((account) => account.id === id);
}

// function findAccountById(accounts, id) {
// for(let account of accounts) {       //of is only for arrays
//    if(account.id === id){
//     return account
//    }
// }
// }

//this function has a single parameter (an array of account objects)
//it returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name.
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}
//if true,it is a positive value, and b will be moved before a,
//if false, it is a positive value, and a will be moved bef

//two parameters: an account object, an array of all book objects
//it returns a_number_ that represents the number of times the account's ID appears in any book's borrows array
//reduce method b/c you want to return a single value, and use an accumulator pattern
//example: getTotalNumberOfBorrows(account,books);//22
///filter creates a new array filled with all array elements that pass the condition

let getTotalNumberOfBorrows = (account, books) =>
  books.reduce(
    (total, book) =>
      total + book.borrows.filter((entry) => entry.id === account.id).length,
    0,
    0
  );
//let getTotalNumberOfBorrows = (account, books) => books.reduce((total,book) => total + book.borrows.filter(entry => entry.id === account.id ).reduce((acc,entry) => acc + 1,0),0)

//three parameters: an account object, an array of all book objects, an array of all author objects
//it returns an array of book objects, including author information, that represents all books currently checked out_ by the given account
// look carefully at the object below
// as it's not just the book object; the author object is nested inside of it

// let getBooksPossessedByAccount= (account, books, authors) => books.reduce( (total, book) => total + book, 0).reduce((acc,item) => acc +item.account, 0).filter( item.borrows.returned === false)
let getBooksPossessedByAccount = (account, books, authors) => {
  return books
    .filter(
      (book) => !book.borrows[0].returned && book.borrows[0].id === account.id
    ) //filter gives you back a whole new array w/less than the original
    .map((book) => {
      //like .map, returns exactly the same number of elements but some of them may be changed, it depends what you do in the map function . transform elements
      let author = authors.find((author) => author.id === book.authorId); //if true, you have the author object , find gives you back the actual object/element
      return {
        ...book,
        author: author,
      };
    });
};
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
