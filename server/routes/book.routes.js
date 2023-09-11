const express = require("express");
const {
  GetAllBooks,
  AddToShelf,
  RemoveFromShelf,
  EmptyTheShelf,
  FetchShelf,
} = require("../controllers/book.controller");
const validateToken = require("../middlewares/tokenHandler");
const router = express.Router();

router.get("/get", GetAllBooks);
router.post("/add", validateToken, AddToShelf);
router.put("/remove", validateToken, RemoveFromShelf);
router.delete("/empty", validateToken, EmptyTheShelf);
router.get("/fetch", validateToken, FetchShelf);

module.exports = router;
