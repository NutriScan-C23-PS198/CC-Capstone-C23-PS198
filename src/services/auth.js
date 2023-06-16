const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { NotFoundError, AuthenticationError, InvariantError } = require('../helpers/exceptions');
const { users: usersMessage } = require('../helpers/response-message');
const { getImageFromLetter, getFirstLetterFromPhrase } = require('../helpers/food-images');
const { isValidEmail, isValidPass } = require('../helpers/validator');

class AuthService {
  constructor(DBAuth, DBUser) {
    this.dbAuth = DBAuth;
    this.dbUser = DBUser;
  }

  async register(req) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { name, email, password } = req.body;
    const isEmailExist = await this.dbAuth.findByEmail(email);

    if (isEmailExist) throw new NotFoundError(usersMessage.emailExist);
    if (!isValidEmail(email)) throw new InvariantError(usersMessage.invalidEmail);
    if (!isValidPass(password)) throw new InvariantError(usersMessage.minimumPass);

    const hashedPassword = await crypto.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const photo = getImageFromLetter(getFirstLetterFromPhrase(name));
    req.body.photo = photo;

    return this.dbAuth = await this.dbAuth.create(req.body);
  }

  async login(req) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { email, password } = req.body;
    const user = await this.dbAuth.findByEmail(email);

    if (!user) throw new AuthenticationError(usersMessage.invalidLogin);
    const match = await crypto.compare(password, user.password);

    if (!match) throw new AuthenticationError(usersMessage.invalidLogin);

    // Issue new JWT token
    const token = jwt.sign(
      {
        username: user.username,
        role    : user.role,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '365d' }
    );
    // const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Update `token` row of User table with new token
    await this.dbUser.update(user.id, { token: token });

    return { token };
  }

  async logout(req) {
    const schema = Joi.object().keys({
      token: Joi.string().required(),
    });

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { token, user } = req.body;
    // const user = await this.dbAuth.findByRefreshToken(refreshToken);

    if (!user) throw new AuthenticationError(usersMessage.invalidLogout);

    // return this.dbAuth.deleteRefreshToken(refreshToken);
    return this.dbUser.update(user.id, { token: null });
  }

  // async getAllUsers(req) {
  //   const schema = Joi.object().keys({
  //     page: Joi.number(),
  //     size: Joi.number(),
  //   });
  //   await schema.validateAsync(req.query).catch((joiError) => {
  //     throw new InvariantError(joiError.details.map((x) => x.message));
  //   });
  //   const { page, size } = req.query;
  //   const { limit, offset } = getPagination(page, size);
  //   const ids = await this.dbAuth.findAll(offset, limit);
  //   return this.resolveUsers(ids.rows);
  // }

  // async getUserById(id) {
  //   return this.resolveUser(id)
  //     .then((user) => {
  //       if (!user) throw new NotFoundError(usersMessage.notFound);

  //       return user;
  //     });
  // }

  // async createUser(req) {
  //   const schema = Joi.object().keys({
  //     name: Joi.string().required(),
  //     email: Joi.string().email().required(),
  //     password: Joi.string().required(),
  //   });
  //   await schema.validateAsync(req.body).catch((joiError) => {
  //     throw new InvariantError(joiError.details.map((x) => x.message));
  //   });

  //   const { name, email, password } = req.body;
  //   const isEmailExist = await this.dbAuth.findByEmail(email);

  //   if (isEmailExist) throw new NotFoundError(usersMessage.emailExist);
  //   if (!isValidEmail(email)) throw new InvariantError(usersMessage.invalidEmail);
  //   if (!isValidPass(password)) throw new InvariantError(usersMessage.minimumPass);

  //   const hashedPassword = await crypto.hash(req.body.password, 10);
  //   req.body.password = hashedPassword;

  //   const photo = getImageFromLetter(getFirstLetterFromPhrase(name));
  //   req.body.photo = photo;

  //   return this.dbAuth
  //     .create(req.body)
  //     .then(async (user) => this.resolveUser(user.id));
  // }

  // async deleteUserById(req) {
  //   await this.dbAuth
  //     .findById(req.params.id)
  //     .then((user) => {
  //       if (!user) throw new NotFoundError(usersMessage.notFound);

  //       return this.dbAuth.deleteById(req.params.id);
  //     });
  // }

  // async resolveUsers(ids) {
  //   const users = [];
  //   await Promise.all(
  //     ids.map(async (id) => {
  //       await this.resolveUser(id).then((user) => {
  //         users.push(user);
  //       });
  //     }),
  //   );

  //   return users;
  // }

  // async resolveUser(id) {
  //   return this.dbAuth
  //     .findById(id)
  //     .then(async (user) => {
  //       if (!user) return null;
  //       const { password, token, ...result } = user;
  //       return result;
  //     });
  // }

  // async login(req) {
  //   const schema = Joi.object().keys({
  //     email: Joi.string().email().required(),
  //     password: Joi.string().required(),
  //   });
  //   await schema.validateAsync(req.body).catch((joiError) => {
  //     throw new InvariantError(joiError.details.map((x) => x.message));
  //   });
  //   const user = await this.dbAuth.findByEmail(req.body.email);

  //   if (!user) throw new AuthenticationError(usersMessage.invalidCredential);

  //   const isPasswordValid = await crypto.compareSync(req.body.password, user.password);

  //   if (!isPasswordValid) throw new AuthenticationError(usersMessage.invalidCredential);

  //   const token = await this.getNewToken(user.id);

  //   return {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     photo: user.photo,
  //     token,
  //   };
  // }

  // async getNewToken(userId) {
  //   const newToken = await this.constructor.getToken(userId);
  //   await this.saveToken(newToken, userId);
  //   return newToken;
  // }

  // static async getToken(userId) {
  //   return jwt.sign({ userId }, process.env.TOKEN_KEY);
  // }

  // async saveToken(token, userId) {
  //   return this.dbAuth.update(userId, { token });
  // }
}

module.exports = AuthService;
