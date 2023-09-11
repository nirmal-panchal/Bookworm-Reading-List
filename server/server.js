const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const ConnectDb = require("./config/dbConnection");

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");

ConnectDb();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
