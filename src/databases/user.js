const Models = require('../models');

class DBUser {
  constructor() {
    this.UserModel     = Models.User;
    this.attributes    = ['id', 'username', 'email', 'name',
                          'photo', 'created_at'];
    this.attributesAll = ['id', 'username', 'email', 'password', 'name',
                          'photo', 'created_at', 'token'];
  }

  async findAll(offset, limit) {
    return this.UserModel
      .findAndCountAll({
        offset, limit,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'username', 'email', 'name',
                     'photo', 'created_at'],
        // raw: true,
      })
      .then((result) => ({
        count: result.count, // the total number of records
        data: result.rows, // the records for the current page
        totalPages: Math.ceil(result.count / limit), // the total number of pages
        currentPage: (offset / limit + 1) // the current page number
      }));
  }

  async findById(id) {
    return this.UserModel
      .findOne({
        where: { id: uuid.parse(id, new Buffer.alloc(16)) },
        attributes: this.attributesAll,
        // raw: true,
      })
      .then((user) => user);
  }

  async findByEmail(email) {
    return this.UserModel
      .findOne({
        where: { email: email },
        attributes: this.attributesAll,
        // raw: true,
      })
      .then((user) => user);
  }

  async findByUsername(username) {
    return this.UserModel
      .findOne({
        where: { username: username },
        attributes: this.attributesAll,
        // raw: true,
      })
      .then((user) => user);
  }

  async create(user) {
    return this.UserModel
      .create(user)
      .then((result) => result);
  }

  async update(id, data) {
    return this.UserModel
      .update(data, {
        where: {
          id: id,
        },
      })
      .then((result) => result);
  }

  async updateByUsername(username, data) {
    return this.UserModel
      .update(data, {
        where: {
          username: username,
        },
      })
      .then((result) => result);
  }

  async updateByEmail(username, data) {
    return this.UserModel
      .update(data, {
        where: {
          username: username,
        },
      })
      .then((result) => result);
  }

  async deleteByUsername(username) {
    return this.UserModel
      .destroy({
        where: {
          username: username,
        },
      })
      .then((result) => result);
  }
}

module.exports = DBUser;