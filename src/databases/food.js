const Sequelize = require('sequelize');
const Models = require('../models');

const { Op } = Sequelize;

class DBFood {
  constructor() {
    this.FoodModel = Models.Food;
  }

  async findAll(offset, limit) {
    // return this.FoodModel
    //   .findAndCountAll({
    //     attributes: ['id', 'name'],
    //     order: [['name', 'DESC']],
    //     limit: limit,
    //     offset: offset,
    //     raw: true,
    //   })
    //   .then((foods) => ({
    //     count: foods.count,
    //     rows: foods.rows.map(
    //       (foods.rows, (food) => food.id),
    //     ),
    //   }));
    return this.FoodModel
      .findAndCountAll({ offset, limit }) // call the findAndCountAll method with the offset and limit options
      .then(result => {
        // result is an object with count and rows properties
        const totalPages = Math.ceil(result.count / limit); // calculate the total number of pages
        const currentPage = offset / limit + 1; // calculate the current page number
        res.json({ // send the response as JSON
          data: result.rows, // the records for the current page
          count: result.count, // the total number of records
          totalPages, // the total number of pages
          currentPage // the current page number
        });
      })
  }

  async findById(id) {
    return this.FoodModel
      .findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      })
      .then((food) => food);
  }

  async findByUserId(offset, limit, userId, textQuery) {
    const query = textQuery ? {
      userId,
      text: {
        [Op.iLike]: `%${textQuery}%`,
      },
    } : { userId };
    return this.FoodModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        where: query,
        limit,
        offset,
        raw: true,
      })
      .then((food) => food);
  }

  async create(food) {
    return this.FoodModel
      .create(food)
      .then((result) => result);
  }

  async deleteById(id) {
    return this.FoodModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = DBFood;
