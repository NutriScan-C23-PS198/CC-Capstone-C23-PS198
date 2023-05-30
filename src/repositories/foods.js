const Sequelize = require('sequelize');
const Models = require('../models');

const { Op } = Sequelize;

class FoodsRepository {
  constructor() {
    this.FoodsModel = Models.Foods;
  }

  async findAll(offset, limit) {
    return this.FoodsModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit,
        offset,
        raw: true,
      })
      .then((foods) => ({
        count: foods.count,
        rows: foods.rows.map(
          (foods.rows, (food) => food.id),
        ),
      }));
  }

  async findById(id) {
    return this.FoodsModel
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
    return this.FoodsModel
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
    return this.FoodsModel
      .create(food)
      .then((result) => result);
  }

  async deleteById(id) {
    return this.FoodsModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = FoodsRepository;
