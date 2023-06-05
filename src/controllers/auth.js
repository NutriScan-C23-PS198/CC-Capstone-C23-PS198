const { foods: authMessage } = require('../helpers/response-message');

class AuthController {
  constructor(authService) {
    this.authService = authService;
    // this.getAllFoods = this.getAllFoods.bind(this);
    // this.getFoodById = this.getFoodById.bind(this);
    // this.getFoodsByUserId = this.getFoodsByUserId.bind(this);
    // this.createFood = this.createFood.bind(this);
    // this.deleteFoodById = this.deleteFoodById.bind(this);
    this.register = this.register.bind(this);
    this.login    = this.login.bind(this);
    this.logout   = this.logout.bind(this);
  }

  async register(req, res, next) {
    return this.authService
      .register(req)
      .then((user) => res.status(201).json({
        message: authMessage.register,
        data: user,
      }))
      .catch((error) => next(error));
  }

  async login(req, res, next) {
    return this.authService
      .login(req)
      .then((user) => res.status(201).json({
        message: authMessage.login,
        data: user,
      }))
      .catch((error) => next(error));
  }

  async logout(req, res, next) {
    return this.authService
      .logout(req)
      .then(() => res.json({
        message: authMessage.logout,
      }))
      .catch((error) => next(error));
  }

  // async getAllFoods(req, res, next) {
  //   return this.authService
  //     .getAllFoods(req)
  //     .then((foods) => res.status(200).json(foods))
  //     .catch((error) => next(error));
  // }

  // async getFoodById(req, res, next) {
  //   return this.authService
  //     .getFoodById(req)
  //     .then((food) => res.json(food))
  //     .catch((error) => next(error));
  // }

  // async getFoodsByUserId(req, res, next) {
  //   return this.authService
  //     .getFoodsByUserId(req)
  //     .then((food) => res.json(food))
  //     .catch((error) => next(error));
  // }

  // async createFood(req, res, next) {
  //   return this.authService
  //     .createFood(req)
  //     .then((food) => res.status(201).json({
  //       message: authMessage.create,
  //       data: food,
  //     }))
  //     .catch((error) => next(error));
  // }

  // async deleteFoodById(req, res, next) {
  //   return this.authService
  //     .deleteFoodById(req)
  //     .then(() => res.json({
  //       message: authMessage.delete,
  //     }))
  //     .catch((error) => next(error));
  // }
}

module.exports = AuthController;
