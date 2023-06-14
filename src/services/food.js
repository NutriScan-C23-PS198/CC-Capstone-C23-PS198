const Joi = require('joi');
const db = require('../databases/index');
const { NotFoundError, AuthorizationError, InvariantError } = require('../helpers/exceptions');
const { food: foodMessage } = require('../helpers/response-message');
const { uploadImage, deleteImage } = require('./storage/storage');
const getPage = require('../helpers/paging');

class FoodService {

  constructor(DBFood, DBFoodCategory) {
    this.dbFood         = DBFood;
  }


  // Get a list of foods
  async getAllFoods(req) {
    // Validation schema
    const schema = Joi.object().keys({
      page       : Joi.number().min(1),           // page number
      size       : Joi.number().min(1).max(100),  // number of food shown per page
      category   : Joi.string().optional(),       // food category
    });

    // Validate from request body
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    // Get page and size from request body
    const { page,   size  } = req.body;
    const { offset, limit } = getPage(page, size);

    // Get and return result
    return this.dbFood.findAll(offset, limit);
  }


  // Find specific food by id or name
  async findFood(req) {
    // Validation schema, either by id, by name, or both
    const schema = Joi.object().keys({
      id: Joi.alternatives()
        .conditional('name', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.string().required() }),
      name: Joi.alternatives()
        .conditional('id',   { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.string().required() }),
    });

    // Validate from request body
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    
    if (req.body.id) {  // Find by id
      return this.dbFood
        .findById(req.body.id)
        .then((food) => {
          if (!food) throw new NotFoundError(foodMessage.notFound);
          return food;
        });
    } else {            // Find by name
      console.log(`Find by name: ${req.body.name}`);
      return this.dbFood
        .findByName(req.body.name)
        .then((food) => {
          if (!food) throw new NotFoundError(foodMessage.notFound);
          return food;
        });
    }
  }


  // Add new food data
  async createFood(req) {
    // Validation schema
    const schema = Joi.object().keys({
      name       : Joi.string().required(),
      category   : Joi.string().required().allow(null).default(""),
      photo      : Joi.string().allow(null),
      portion    : Joi.number().required().min(0),
      unit       : Joi.string().required().default("portion"),
      callories  : Joi.number().required().min(0),
    });

    // Validate from request body
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    
    // Check if food already exist
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

    // Insert the new food data
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
    
    // Return the newly created food data
    const newFood = await this.dbFood.findByName(req.body.name);

    return newFood;
  }


  // Update an existing food data, selected by id
  async updateFoodById(req) {
    // Request parameters validation schema
    const schemaParams = Joi.object().keys({
      id: Joi.string().guid().required(),
    });

    // Validate from request params
    await schemaParams.validateAsync(req.params).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    delete req.body.token;
    
    // Check if food is exists
    const food = await this.dbFood.findById(req.params.id);
    if (!food) throw new NotFoundError(foodMessage.notFound);
    
    // Request body validation schema
    const schemaBody = Joi.object().keys({
      name           : Joi.string(),
      photo          : Joi.string().allow(null),
      portion        : Joi.number().min(0),
      unit           : Joi.string(),
      callories      : Joi.number().min(0),
      category       : Joi.string().allow(null).default("uncategorized"),
    });

    // Validate from request body
    await schemaBody.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const fields = Object.keys(req.body);

    // Upload to Google Cloud Storage and get the URL
    if (req.body.photo) {
      const photo_url = await uploadImage(
        "food",
        `${req.body.category}-${req.body.name}.jpeg`,
        req.body.photo
      );
      req.body = { ...req.body, photo: photo_url };
    }

    // Update the food data
    await this.dbFood
      .update(req.params.id, req.body)
      .then((food) => food);
  }


  // Delete an existing food data, selected by id
  async deleteFoodById(req) {
    // Request parameters validation schema
    const schema = Joi.object().keys({
      id: Joi.string().guid().required(),
    });

    // Validate from request parameters
    await schema.validateAsync(req.params).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    // Verify if food is exists
    const food = await this.dbFood.findById(req.params.id);
    if (!food) throw new NotFoundError(foodMessage.notFound);

    console.log(`Delete food: [${food.getDataValue('category')}] ${JSON.stringify(food)}`);
    
    // Delete the image from Google Cloud Storage
    let resultDeleteImg;
    if (food.getDataValue('photo')) {
      console.log(`Delete image: ${food.getDataValue('photo')}`);
      resultDeleteImg = await deleteImage(
        "food",
        `${food.getDataValue('category')}-${food.name}.jpeg`
      );
    } else {
      resultDeleteImg = 0
    };

    // Delete the specified food
    const resultDelete = await this.dbFood
      .deleteById(food.id)
      .then((food) => food);

    return resultDelete || resultDeleteImg;
  }

}

module.exports = FoodService;
