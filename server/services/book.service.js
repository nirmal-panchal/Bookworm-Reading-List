const axios = require("axios");
const Book = require("../models/book.modal");

const BookService = {
  GetAllBooks: async (req, res) => {
    try {
      const resp = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: "all", // This will search for all books
            startIndex: 0,
            maxResults: 10, // Adjust the number of results you want to retrieve
          },
        }
      );
      if (resp) {
        res.status(200).json({ data: resp?.data });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },

  AddToShelf: async (req, res) => {
    try {
      const shelf = await Book.findOne({ userId: req.user.id });
      const bookId = req.body.bookId;
      if (shelf) {
        let condition, action;
        condition = { userId: req.user.id };
        action = {
          $push: {
            shelf: {
              bookId,
            },
          },
        };
        const resp = await Book.findOneAndUpdate(condition, action);
        if (resp) {
          return res.status(201).send({ message: "Book added to shelf." });
        }
      } else {
        const newShelf = await Book.create({
          userId: req.user.id,
          shelf: [{ bookId }],
        });
        const resp = await newShelf.save();
        if (resp) {
          return res.status(201).send({ message: "Book added to shelf." });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },

  removeFromShelf: async (req, res) => {
    try {
      const bookId = req.body.bookId;
      const shelf = await Book.findOne({ userId: req.user.id });
      if (!shelf) {
        return res
          .status(400)
          .send({ message: "you have nothing in your shelf.." });
      } else {
        if (shelf.shelf.length === 1) {
          const removeLast = await shelf.deleteOne(shelf);
          if (removeLast) {
            return res
              .status(200)
              .send({ message: "Book removed from shelf." });
          }
        } else {
          let condition, action;
          condition = { userId: req.user.id };
          action = {
            $pull: {
              shelf: { bookId },
            },
          };
          const resp = await Book.findOneAndUpdate(condition, action);
          if (resp) {
            return res
              .status(201)
              .send({ message: "Book removed from shelf." });
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },

  emptyTheShelf: async (req, res) => {
    try {
      const shelf = await Book.findOne({ userId: req.user.id });
      if (!shelf) {
        return res
          .status(400)
          .json({ message: "you have nothing in your shelf.." });
      } else {
        const result = await Book.deleteOne(shelf);
        if (result)
          res.status(200).json({ message: "Your shelf is empty now.." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },

  fetchShelf: async (req, res) => {
    try {
      const shelf = await Book.findOne({ userId: req.user.id });
      if (!shelf) {
        res.status(200).json({
          message: "fetched the shelf, you have nothing in your shelf",
        });
      } else {
        res.status(200).json({ message: "Shelf", data: shelf });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },
};

module.exports = BookService;
