const { users: usersMessage } = require('../helpers/response-message');

class UserController {
  constructor(userService) {
    this.userService = userService;
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteUserById = this.deleteUserByUsername.bind(this);
  }

  async getAllUsers(req, res, next) {
    return this.userService
      .getAllUsers(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => next(error));
  }

  async getUserById(req, res, next) {
    return this.userService
      .getUserById(req.params.id)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  }

  async createUser(req, res, next) {
    return this.userService
      .createUser(req)
      .then((user) => res.status(201).json({
        message: usersMessage.create,
        data: user,
      }))
      .catch((error) => next(error));
  }

  async login(req, res, next) {
    return this.userService
      .login(req)
      .then((result) => res.json({
        message: usersMessage.loginSuccess,
        data: result,
      }))
      // .catch((error) => next(error));
  }

  async logout(req, res, next) {
    return this.userService
      .logout(req)
      .then((result) => res.json({
        message: usersMessage.logoutSuccess
      }))
      .catch((error) => next(error));
  }

  async deleteUserByUsername(req, res, next) {
    return this.userService
      .deleteUserByUsername(req)
      .then(() => res.json({
        message: usersMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = UserController;