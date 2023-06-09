const Joi = require('joi');
const db = require('../databases/index');
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

    // await schema.validateAsync(req.query).catch((joiError) => {
    //   throw new InvariantError(joiError.details.map((x) => x.message));
    // });

    // validate from request body
    console.log(req);

    const { page, size } = req.body;
    const { offset, limit } = getPage(page, size);
    console.log(`Page ${page} Size ${size} Offset ${offset} Limit ${limit}`)

    // const ids = await this.dbFood.findAll(offset, limit);
    return this.dbFood.findAll(offset, limit);
  }

  async getFoodById(req) {
    const id = req.params.id;
    // return this.resolveFood(req.params.id)
    //   .then((food) => {
    //     if (!food) throw new NotFoundError(foodsMessage.notFound);
    //     if (id !== food.userId) throw new AuthorizationError(foodsMessage.forbidden);

    //     return food;
    //   });
    return this.dbFood.findById(id);
  }

  // async getFoodsByUserId(req) {
  //   const schema = Joi.object().keys({
  //     page : Joi.number(),
  //     size : Joi.number(),
  //     query: Joi.string(),
  //   });
    
  //   await schema.validateAsync(req.query).catch((joiError) => {
  //     throw new InvariantError(joiError.details.map((x) => x.message));
  //   });

  //   const { userId: credentialsId } = req.user;
  //   const { id: userId } = req.params;
  //   const { query } = req.query;

  //   if (userId != credentialsId) throw new AuthorizationError(foodsMessage.forbidden);
  //   const { page, size } = req.query;

  //   const { limit, offset } = getPage(page, size);
  //   const ids = await this.dbFood.findByUserId(offset, limit, userId, query);
  //   const result = [];
  //   ids.rows = ids.rows.forEach((element) => {
  //     result.push(element.id);
  //   });

  //   return this.resolveFoods(result);
  // }

  async createFood(req) {
    const schema = Joi.object().keys({
      name       : Joi.string().required(),
      category   : Joi.string().required().allow(null).default(""),
      photo      : Joi.string().required().allow(null),
      portion    : Joi.number().required(),
      unit       : Joi.string().required().default("portion"),
      callories  : Joi.number().required(),
    });

    console.log(req.body);

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    
    const foodExist = await this.dbFood.findByName(req.body.name);
    if (foodExist) {
      throw new InvariantError(
        foodsMessage.nameIsExist.replace("{FOODNAME}", req.body.name)
      );
    }

    // Resize image to 100x100
    // const image = await resizeImage(req.body.photo, 100, 100);

    // Upload to Google Cloud Storage and get the URL
    // const photo = await uploadImage(image);

    await this.dbFood.create({
        name     : req.body.name,
        category : req.body.category,
        photo    : req.body.photo,
        portion  : req.body.portion,
        unit     : req.body.unit,
        callories: req.body.callories,
      },
      // {
      //   attributes: ['name', 'category', 'photo', 'portion', 'unit', 'callories'],
      // }
    );
    
    const newFood = await this.dbFood.findByName(req.body.name);
    console.log(newFood);

    return newFood;
  }

  // TODO: Implement service/food/updateFood (currently copied from another func)
  async updateFoodById(req) {
    // const schema = Joi.object().keys({
    //   // text: Joi.string().required(),
    // });
    // await schema.validateAsync(req.body).catch((joiError) => {
    //   throw new InvariantError(joiError.details.map((x) => x.message));
    // });
    // const { userId } = req.user;
    // req.body.userId = userId;
    return this.dbFood
      .create(req.body)
      .then((food) => food);
  }

  async updateFoodByName(req) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
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
