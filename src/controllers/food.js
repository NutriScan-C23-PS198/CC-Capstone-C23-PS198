const { foods: foodsMessage } = require('../helpers/response-message');

class FoodController {
  constructor(foodsUsecase) {
    this.foodsUsecase = foodsUsecase;
    this.getAllFoods = this.getAllFoods.bind(this);
    this.getFoodById = this.getFoodById.bind(this);
    this.getFoodsByUserId = this.getFoodsByUserId.bind(this);
    this.createFood = this.createFood.bind(this);
    this.deleteFoodById = this.deleteFoodById.bind(this);
  }

  async getAllFoods(req, res, next) {
    return this.foodsUsecase
      .getAllFoods(req)
      .then((foods) => res.status(200).json(foods))
      .catch((error) => next(error));
  }

  async getFoodById(req, res, next) {
    return this.foodsUsecase
      .getFoodById(req)
      .then((food) => res.json(food))
      .catch((error) => next(error));
  }

  async getFoodsByUserId(req, res, next) {
    return this.foodsUsecase
      .getFoodsByUserId(req)
      .then((food) => res.json(food))
      .catch((error) => next(error));
  }

  async createFood(req, res, next) {
    return this.foodsUsecase
      .createFood(req)
      .then((food) => res.status(201).json({
        message: foodsMessage.create,
        data: food,
      }))
      .catch((error) => next(error));
  }

  async deleteFoodById(req, res, next) {
    return this.foodsUsecase
      .deleteFoodById(req)
      .then(() => res.json({
        message: foodsMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = FoodController;
