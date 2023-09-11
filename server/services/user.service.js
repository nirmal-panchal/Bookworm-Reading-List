const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.modal");

const UserService = {
  RegisterService: async (req, res) => {
    try {
      const { username, email, password } = req.body; // getting values from body

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
      }

      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        return res.status(400).json({ message: "Email is already exist" });
      }

      const hashPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashPass,
      });
      if (newUser) {
        return res
          .status(201)
          .json({ message: "User Registered Successfully", data: newUser });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },

  LoginService: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const userValidated = await bcrypt.compare(password, user.password);
      if (!userValidated) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const accessToken = jwt.sign(
        {
          user: { username: user.username, email: user.email, id: user._id },
        },
        process.env.JWT_SECRET,
        { expiresIn: "60m" }
      );
      res
        .status(200)
        .json({ message: "Logged In Successfully", data: accessToken });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },
};

module.exports = UserService;
