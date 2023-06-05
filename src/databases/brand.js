const Models = require('../models');

class DBBrand {
  constructor() {
    this.BrandModel = Models.Brand;
  }

  async findAll(offset, limit) {
    return this.BrandModel
      .findAndCountAll({
        order: [['name', 'DESC']],
        attributes: ['id'],
        limit,
        offset,
        raw: true,
      })
      .then((brand) => ({
        count: brand.count,
        rows: brand.rows.map(
          (brand.rows, (brand) => {brand.id, brand.name}),
        ),
      }));
  }

  async findById(id) {
    return this.BrandModel
      .findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      })
      .then((user) => user);
  }

  async create(user) {
    return this.BrandModel
      .create(user)
      .then((result) => result);
  }

  async update(id, user) {
    return this.BrandModel
      .update(user, {
        where: {
          id,
        },
      })
      .then((result) => result);
  }

  async deleteById(id) {
    return this.BrandModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = DBBrand;
