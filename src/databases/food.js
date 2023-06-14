const Sequelize = require('sequelize');
const Models = require('../models');
const uuid = require('node-uuid');

const { Op } = Sequelize;

class DBFood {
  constructor() {
    this.FoodModel = Models.Food;
    this.FoodCategoryModel = Models.FoodCategory;
  }

  async getCategoryId(food) {
    // Get the ID of the category
    const category_id = await this.FoodCategoryModel.findOrCreate({
      where: { name: food.category },
      defaults: {
        name: food.category,
      },
      // attributes: ['id'],
      // raw: true,
    })
    .then(([category, created]) => category.id);
    
    // Remove the unused category field
    delete food.category;

    return {category_id: category_id, ...food};
  }

  async findAll(offset, limit) {
    return this.FoodModel
      .findAndCountAll({
        offset, limit,
        include: [{
          model: this.FoodCategoryModel,
          attributes: [],
        }],
        attributes: [
          'id', 'name', 'photo', 'portion', 'unit', 'callories',
          [Sequelize.col('FoodCategory.name'), 'category']
        ],
      }).then(result => ({
          data: result.rows, // the records for the current page
          count: result.count, // the total number of records
          totalPages: Math.ceil(result.count / limit), // the total number of pages
          currentPage: (offset / limit + 1) // the current page number
        })
      )
  }

  async findById(id) {
    return this.FoodModel
      .findOne({
        include: [{
          model: this.FoodCategoryModel,
          attributes: [],
        }],
        where: { id: uuid.parse(id, new Buffer.alloc(16)) },
        attributes: [
          'id', 'name', 'photo', 'portion', 'unit', 'callories',
          [Sequelize.col('FoodCategory.name'), 'category']
        ],
        // raw: true,
      })
      .then((food) => food);
  }

  async findByName(name) {
    return this.FoodModel
      .findOne({
        include: [{
          model: this.FoodCategoryModel,
          attributes: [],
        }],
        where: { name: { [Op.like]: `%${name}%` } },
        attributes: [
          'id', 'name', 'photo', 'portion', 'unit', 'callories',
          [Sequelize.col('FoodCategory.name'), 'category']
        ],
        // raw: true,
      })
      .then((food) => food);
  }

  // async findByUserId(offset, limit, userId, textQuery) {
  //   const query = textQuery ? {
  //     userId,
  //     text: {
  //       [Op.Like]: `%${textQuery}%`,
  //     },
  //   } : { userId };
  //   return this.FoodModel
  //     .findAndCountAll({
  //       order: [['createdAt', 'DESC']],
  //       attributes: ['id'],
  //       where: query,
  //       limit,
  //       offset,
  //       raw: true,
  //     })
  //     .then((food) => food);
  // }

  async create(food) {
    // Get the ID of the category
    if (food.category) {
      food = await this.getCategoryId(food);
    }

    // Create the food
    return this.FoodModel
      .create(food)
      .then((result) => result);
  }

  async update(id, food) {
    // Get the ID of the category
    if (food.category) {
      food = await this.getCategoryId(food);
    }

    // Update the food
    return this.FoodModel
      .update(
        food,
        {
          where: {
            id: uuid.parse(id, new Buffer.alloc(16)),
          },
        })
      .then((result) => result);
  }

  async deleteById(id) {
    return this.FoodModel
      .destroy({
        where: {
          id: uuid.parse(id, new Buffer.alloc(16)),
        },
      })
      .then((result) => result);
  }
}

module.exports = DBFood;
