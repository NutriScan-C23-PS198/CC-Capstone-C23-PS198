const Joi = require('joi');
const db = require('../databases/index');
const { NotFoundError, AuthorizationError, InvariantError } = require('../helpers/exceptions');
const { food: foodMessage } = require('../helpers/response-message');
const { uploadImage, deleteImage } = require('./storage/storage');
const getPage = require('../helpers/paging');

class FoodService {
  constructor(DBFood) {
    this.dbFood = DBFood;
  }

  async getAllFoods(req) {
    const schema = Joi.object().keys({
      page: Joi.number().min(1),
      size: Joi.number().min(1).max(100),
    });

    // Validate from request body
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { page, size } = req.body;
    const { offset, limit } = getPage(page, size);

    // const ids = await this.dbFood.findAll(offset, limit);
    return this.dbFood.findAll(offset, limit);
  }

  async getFood(req) {
    console.log(req.body);
    const schema = Joi.object().keys({
      // id: Joi.string()
      //   .when('username', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() })
      //   .when('email',    { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
      id: Joi.alternatives()
        .conditional('name', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.string().required() }),
      name: Joi.alternatives()
        .conditional('id',   { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.string().required() }),
    })

    // Validate from request body
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    
    if (req.body.id) {
      return this.dbFood
        .findById(req.body.id)
        .then((food) => {
          if (!food) throw new NotFoundError(foodMessage.notFound);
          return food;
        });
    } else {
      return this.dbFood
        .findByName(req.body.name)
        .then((food) => {
          if (!food) throw new NotFoundError(foodMessage.notFound);
          return food;
        });
    }
  }

  // async getFoodById(req) {
  //   return this.dbFood
  //     .findById(req.body.id)
  //     .then((food) => {
  //       if (!food) throw new NotFoundError(foodMessage.notFound);
  //       return food;
  //     });
  // }

  // async getFoodByName(req) {
  //   return this.dbFood
  //     .findByName(req.body.name)
  //     .then((food) => {
  //       if (!food) throw new NotFoundError(foodMessage.notFound);
  //       return food;
  //     });
  // }

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
      photo      : Joi.string().allow(null),
      portion    : Joi.number().required().min(0),
      unit       : Joi.string().required().default("portion"),
      callories  : Joi.number().required().min(0),
    });

    // console.log(req.body);

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    
    const foodExist = await this.dbFood.findByName(req.body.name);
    if (foodExist) {
      throw new InvariantError(
        foodMessage.nameIsExist.replace("{FOODNAME}", req.body.name)
      );
    }

    // Resize image to 100x100
    // const image = await resizeImage(req.body.photo, 100, 100);

    // Upload to Google Cloud Storage and get the URL
    if (req.body.photo) {
      req.body.photo = await uploadImage(
        "food",
        `${req.body.category}-${req.body.name}.jpeg`,
        req.body.photo
      );
    }

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
    // console.log(newFood);

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
        if (!food) throw new NotFoundError(foodMessage.notFound);
        if (userId !== food.userId) throw new AuthorizationError(foodMessage.forbidden);

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
