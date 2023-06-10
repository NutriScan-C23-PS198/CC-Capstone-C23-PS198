const Models = require('../models');

class DBToken {
  constructor() {
    this.TokenModel = Models.UserToken;
  }

  async findAll(offset, limit) {
    return this.TokenModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit,
        offset,
        raw: true,
      })
      .then((users) => ({
        count: users.count,
        rows: users.rows.map(
          (users.rows, (user) => user.id),
        ),
      }));
  }

  async findById(id) {
    return this.TokenModel
      .findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      })
      .then((user) => user);
  }

  async findByEmail(email) {
    return this.TokenModel
      .findOne({
        where: { email },
        raw: true,
      })
      .then((user) => user);
  }

  async create(user) {
    return this.TokenModel
      .create(user)
      .then((result) => result);
  }

  async update(id, user) {
    return this.TokenModel
      .update(user, {
        where: {
          id,
        },
      })
      .then((result) => result);
  }

  async deleteById(id) {
    return this.TokenModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = DBToken;