//has a single parameter an array of book objects
//it returns a number that represent the number of book objects inside of the array
//ex: getTotalBooksCount(books); // 100

let getTotalBooksCount = (books) => books.length;
//has a single parameter: an array of accounts
//it returns a number that represents the number of account objects inside the array
//ex: getTotalAccountsCount(accounts);//75

let getTotalAccountsCount = (accounts) => accounts.length;
//has a single parameter: books
//it returns a number that represents the number of books that are currently checked out of the library
//this number can be found by looking at the first transaction object in the `borrows` array of each book
//if the transaction says the book has NOT been return (ie: `returned: false`), the book is currently being borrowed
//getBooksBorrowedCount(accounts); // 65
let getBooksBorrowedCount = (books) =>
  books.filter((book) => !book.borrows[0].returned).length;

//single parameter: an array of book objects
// It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.
// popularity is represented by the number of times a book has been borrowed
//Each object in the returned array has two keys:
// - The `name` key which represents the name of the genre.
// - The `count` key which represents the number of times the genre occurs.
// Even if there is a tie, the array should only contain no more than five objects.
//https://stackoverflow.com/questions/68472869/return-array-of-5-or-fewer-objects-that-show-the-most-popular-books-in-a-library

// let getMostCommonGenres = (books) => {
//   // we need to keep count for every single genre
//     let genresObject = books.reduce((acc,book) => {
//       if(!acc[book.genre]){
//         acc[book.genre] = book.borrows.length
//       } else 
//         acc[book.genre] += book.borrows.length
//       }
//        return acc
//     },{} )

//      let genres = []
//      for(let genreName in genresObject ) {
//         genres.push({name:genreName , count: genresObject[genreName]})
//         console.log(genresObject[genreName])
//     console.log(genreName) }
//     return genres.sort((a, b) => b.count - a.count).slice(0, 5)//limit the array to 5 objects or less,  //the index provided at the end is not included
// };

let getMostCommonGenres = (books) => {
  const genreCount = {};
  books.forEach(({ genre }) => {
    genreCount[genre] = genreCount[genre] ? genreCount[genre] + 1 : 1; // if a genre doesn't exist in the object, we assign it and = it to 1, if it does exist we add the genre to 1.
  });
  return Object.keys(genreCount) // creates an array
    .map((genre) => ({ name: genre, count: genreCount[genre] })) //makes an array and creates a new one , only work with an array
    .sort((genreA, genreB) => genreB.count - genreA.count) //highest to lowest
    .slice(0, 5);
};

//an array of book objects
//it returns an array containing five objects or fewer that represent the most popular books in the library
//Popularity is represented by the number of times a book has been borrowed
//each object in the returned array has two keys
//the name key which represents the title of the book
//the count key which represents the number of times the book has been borrowed
//even if there is a tie, the array should only contain no more than five objects

let getMostPopularBooks = (books) =>
  books
    .map(({ borrows, title }) => ({ name: title, count: borrows.length }))
    .sort((borrowA, borrowB) => borrowB.count - borrowA.count)
    .slice(0, 5);

//returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most
//popularity is represented by finding all of the books written by the author
//and then adding up the number of times those books have been borrowed
//each object will have
//the name key which represents the first and last name of the author
//the count key which represents the number of times the author's books have been borrowed

let getMostPopularAuthors = (books, authors) => {
  let result = [];
  //first, we access the authors array, we loop through each element in authors array, and execute a condition for each element
  authors.forEach((author) => {
    let oneAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.forEach((book) => {
      if (book.authorId === author.id) {
        oneAuthor.count += book.borrows.length;
      }
    });
    result.push(oneAuthor);
  });
  return result.sort((a, b) => b.count - a.count).slice(0, 5);
};
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
