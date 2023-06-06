const { foods: foodsMessage } = require('../helpers/response-message');

class FoodController {
  constructor(foodService) {
    this.foodService = foodService;
    this.getAllFoods = this.getAllFoods.bind(this);
    this.getFoodById = this.getFoodById.bind(this);
    this.getFoodsByUserId = this.getFoodsByUserId.bind(this);
    this.createFood = this.createFood.bind(this);
    this.updateFoodById = this.updateFoodById.bind(this);
    this.deleteFoodById = this.deleteFoodById.bind(this);
  }

  async getAllFoods(req, res, next) {
  try {
    const foods = await this.foodService.getAllFoods(req);
    return res.status(200).json(foods);
  } catch (error) {
    return next(error);
  }
}
  
  async getFoodById(req, res, next) {
    return this.foodService
      .getFoodById(req)
      .then((food) => res.json(food))
      .catch((error) => next(error));
  }

  async getFoodsByUserId(req, res, next) {
    return this.foodService
      .getFoodsByUserId(req)
      .then((food) => res.json(food))
      .catch((error) => next(error));
  }

  async createFood(req, res, next) {
    return this.foodService
      .createFood(req)
      .then((food) => res.status(201).json({
        message: foodsMessage.create,
        data: food,
      }))
      .catch((error) => next(error));
  }

  async updateFoodById(req, res, next) {
    return this.foodService
      .updateFoodById(req)
      .then((food) => res.status(201).json({
        message: foodsMessage.update,
        data: food,
      }))
      .catch((error) => next(error));
  }

  async deleteFoodById(req, res, next) {
    return this.foodService
      .deleteFoodById(req)
      .then(() => res.json({
        message: foodsMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = FoodController;
