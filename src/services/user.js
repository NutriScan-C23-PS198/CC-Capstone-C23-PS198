const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { NotFoundError, AuthenticationError, InvariantError } = require('../helpers/exceptions');
const { users: usersMessage } = require('../helpers/response-message');
const { getImageFromLetter, getFirstLetterFromPhrase } = require('../helpers/food-images');
const { isValidEmail, isValidPass } = require('../helpers/validator');

class UserService {
  constructor(DBUser) {
    this.dbUser = DBUser;
  }

  async getAllUsers(req) {
    const schema = Joi.object().keys({
      page: Joi.number(),
      size: Joi.number(),
    });
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const ids = await this.dbUser.findAll(offset, limit);
    return this.resolveUsers(ids.rows);
  }

  async getUserById(id) {
    return this.resolveUser(id)
      .then((user) => {
        if (!user) throw new NotFoundError(usersMessage.notFound);

        return user;
      });
  }

  async createUser(req) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { name, email, password } = req.body;
    const isEmailExist = await this.dbUser.findByEmail(email);

    if (isEmailExist) throw new NotFoundError(usersMessage.emailExist);
    if (!isValidEmail(email)) throw new InvariantError(usersMessage.invalidEmail);
    if (!isValidPass(password)) throw new InvariantError(usersMessage.minimumPass);

    const hashedPassword = await crypto.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const photo = getImageFromLetter(getFirstLetterFromPhrase(name));
    req.body.photo = photo;

    return this.dbUser
      .create(req.body)
      .then(async (user) => this.resolveUser(user.id));
  }

  async deleteUserById(req) {
    await this.dbUser
      .findById(req.params.id)
      .then((user) => {
        if (!user) throw new NotFoundError(usersMessage.notFound);

        return this.dbUser.deleteById(req.params.id);
      });
  }

  async resolveUsers(ids) {
    const users = [];
    await Promise.all(
      ids.map(async (id) => {
        await this.resolveUser(id).then((user) => {
          users.push(user);
        });
      }),
    );

    return users;
  }

  async resolveUser(id) {
    return this.dbUser
      .findById(id)
      .then(async (user) => {
        if (!user) return null;
        const { password, token, ...result } = user;
        return result;
      });
  }

  async login(req) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    const user = await this.dbUser.findByEmail(req.body.email);

    if (!user) throw new AuthenticationError(usersMessage.invalidCredential);

    const isPasswordValid = await crypto.compareSync(req.body.password, user.password);

    if (!isPasswordValid) throw new AuthenticationError(usersMessage.invalidCredential);

    const token = await this.getNewToken(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      token,
    };
  }

  async getNewToken(userId) {
    const newToken = await this.constructor.getToken(userId);
    await this.saveToken(newToken, userId);
    return newToken;
  }

  static async getToken(userId) {
    return jwt.sign({ userId }, process.env.TOKEN_KEY);
  }

  async saveToken(token, userId) {
    return this.dbUser.update(userId, { token });
  }
}

module.exports = UserService;
