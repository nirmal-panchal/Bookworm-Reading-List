const UserService = require("../services/user.service");

const Register = (req, res) => {
  UserService.RegisterService(req, res);
};

const Login = (req, res) => {
  UserService.LoginService(req, res);
};

module.exports = { Register, Login };
