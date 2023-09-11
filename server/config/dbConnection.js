const mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log("Database connected..", {
      host: connect.connection.host,
      name: connect.connection.name,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = ConnectDb;
