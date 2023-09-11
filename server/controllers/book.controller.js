const BookService = require("../services/book.service");

const GetAllBooks = (req, res) => {
  BookService.GetAllBooks(req, res);
};

const AddToShelf = (req, res) => {
  BookService.AddToShelf(req, res);
};

const RemoveFromShelf = (req, res) => {
  BookService.removeFromShelf(req, res);
};

const EmptyTheShelf = (req, res) => {
  BookService.emptyTheShelf(req, res);
};

const FetchShelf = (req, res) => {
  BookService.fetchShelf(req, res);
};

module.exports = {
  GetAllBooks,
  AddToShelf,
  RemoveFromShelf,
  EmptyTheShelf,
  FetchShelf,
};
