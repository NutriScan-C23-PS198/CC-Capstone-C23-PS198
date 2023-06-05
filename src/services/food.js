const Joi = require('joi');
const { NotFoundError, AuthorizationError, InvariantError } = require('../helpers/exceptions');
const getPage = require('../helpers/paging');
const { foods: foodsMessage } = require('../helpers/response-message');
//const { getImageFromLetter } = require('../helpers/food-images');

class FoodService {
  constructor(DBFood) {
    this.dbFood = DBFood;
  }

  async getAllFoods(req) {
    const schema = Joi.object().keys({
      page: Joi.number(),
      size: Joi.number(),
    });

    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { page, size } = req.query;
    const { offset, limit } = getPage(page, size);
    console.log(`Page ${page} Size ${size} Offset ${offset} Limit ${limit}`)

    const ids = await this.dbFood.findAll(offset, limit);

    return this.resolveFoods(ids.rows);
  }

  async getFoodById(req) {
    const { userId } = req.user;
    return this.resolveFood(req.params.id)
      .then((food) => {
        if (!food) throw new NotFoundError(foodsMessage.notFound);
        if (userId !== food.userId) throw new AuthorizationError(foodsMessage.forbidden);

        return food;
      });
  }

  async getFoodsByUserId(req) {
    const schema = Joi.object().keys({
      page: Joi.number(),
      size: Joi.number(),
      query: Joi.string(),
    });
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    const { userId: credentialsId } = req.user;
    const { id: userId } = req.params;
    const { query } = req.query;

    if (userId != credentialsId) throw new AuthorizationError(foodsMessage.forbidden);
    const { page, size } = req.query;

    const { limit, offset } = getPage(page, size);
    const ids = await this.dbFood.findByUserId(offset, limit, userId, query);
    const result = [];
    ids.rows = ids.rows.forEach((element) => {
      result.push(element.id);
    });

    return this.resolveFoods(result);
  }

  async createFood(req) {
    const schema = Joi.object().keys({
      text: Joi.string().required(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    const { userId } = req.user;
    req.body.userId = userId;
    return this.dbFood
      .create(req.body)
      .then((food) => food);
  }

  // TODO: Implement service/food/updateFood (currently copied from another func)
  async updateFoodById(req) {
    const schema = Joi.object().keys({
      text: Joi.string().required(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    const { userId } = req.user;
    req.body.userId = userId;
    return this.dbFood
      .create(req.body)
      .then((food) => food);
  }

  async deleteFoodById(req) {
    const { userId } = req.user;
    await this.dbFood
      .findById(req.params.id)
      .then((food) => {
        if (!food) throw new NotFoundError(foodsMessage.notFound);
        if (userId !== food.userId) throw new AuthorizationError(foodsMessage.forbidden);

        return this.dbFood.deleteById(req.params.id);
      });
  }

  async resolveFoods(ids) {
    const foods = [];
    await Promise.all(
      ids.map(async (id) => {
        await this.resolveFood(id).then((food) => {
          foods.push(food);
        });
      }),
    );

    return foods;
  }

  async resolveFood(id) {
    return this.dbFood
      .findById(id)
      .then(async (food) => {
        if (food) {
          food.images = [];
          for (let i = 0; i < food.text.length; i += 1) {
            food.images.push(getImageFromLetter(food.text[i]));
          }
        }

        return food;
      });
  }
}

module.exports = FoodService;
