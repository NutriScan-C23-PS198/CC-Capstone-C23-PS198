const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { NotFoundError, AuthenticationError, InvariantError } = require('../helpers/exceptions');
const { users: usersMessage } = require('../helpers/response-message');
const { getImageFromLetter, getFirstLetterFromPhrase } = require('../helpers/food-images');
const { isValidEmail, isValidUsername, isValidPass } = require('../helpers/validator');
const { uploadImage, deleteImage } = require('./storage/storage');
const getPage = require('../helpers/paging');

class UserService {
  constructor(DBUser, DBToken) {
    this.dbUser = DBUser;
    this.dbToken = DBToken;
  }

  async getAllUsers(req) {
    const schema = Joi.object().keys({
      page: Joi.number(),
      size: Joi.number(),
    });

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { page, size } = req.body;
    const { limit, offset } = getPage(page, size);
    
    return this.dbUser.findAll(offset, limit);
    // const ids = await this.dbUser.findAll(offset, limit);
    // return this.resolveUsers(ids.rows);
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
      username   : Joi.string().required(),
      email      : Joi.string().email().required(),
      password   : Joi.string().required(),
      name       : Joi.string().required(),
      // NOTE: Photo data has been resized and encoded in base64 format
      // NOTE: It'll be super long string
      photo      : Joi.string().allow(null),
      // created_at : Joi.date().required(), // NOTE: Added by DBMS
    });

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const isEmailExist = await this.dbUser.findByEmail(req.body.email);
    const isUsernameExist = await this.dbUser.findByUsername(req.body.username);

    if (isEmailExist) throw new NotFoundError(usersMessage.emailExist);
    if (isUsernameExist) throw new NotFoundError(usersMessage.usernameExist);
    if (!isValidEmail(req.body.email)) throw new InvariantError(usersMessage.invalidEmail);
    if (!isValidUsername(req.body.username)) throw new InvariantError(usersMessage.invalidUsername);
    if (!isValidPass(req.body.password)) throw new InvariantError(usersMessage.invalidPassword);
    
    req.body.password = await bcrypt.hash(req.body.password, 10);

    if (req.body.photo) {
      // Upload image
      req.body.photo = await uploadImage(
        "user",
        `${req.body.username}.jpeg`,
        req.body.photo
      );
    }

    await this.dbUser.create({
      username  : req.body.username,
      email     : req.body.email,
      password  : req.body.password,
      name      : req.body.name,
      photo     : req.body.photo,
    }, {
      attributes: ['username', 'email', 'password', 'name', 'photo'],
    });
    
    const newUser = await this.dbUser.findByEmail(req.body.email);
    return newUser;
  }

  async deleteUserByUsername(req) {
    await this.dbUser
    .findByUsername(req.body.username)
    .then((user) => {
      if (!user) throw new NotFoundError(usersMessage.notFound);
      deleteImage(user.photo);
      return this.dbUser.deleteByUsername(user.username);
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
    // Ensure either email or username is used
    if (!req.body.email && !req.body.username) {
      throw new AuthenticationError(usersMessage.invalidCredential);
    }

    const schema = Joi.object().keys({
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().required(),
    });

    // Validate request body
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    // Find user by email or username
    let user;

    if (req.body.email)
      user = await this.dbUser.findByEmail(req.body.email);
    else
      user = await this.dbUser.findByUsername(req.body.username);
    
    if (!user) throw new AuthenticationError(usersMessage.notFound);
    
    // Validate password
    // const isPasswordValid = await crypto.compareSync(req.body.password, user.password);  // With "crypto" module
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);   // With "bcrypt" module
    if (!isPasswordValid) throw new AuthenticationError(usersMessage.invalidCredential);
    
    // Create JWT token
    const token = await this.createToken(user.id, user.username);

    return {
      "id": user.id,
      "name": user.name,
      "username": user.username,
      "email": user.email,
      "photo": user.photo,
      "token": token,
    };
  }

  async logout(req) {
    const schema = Joi.object().keys({
      username   : Joi.string(),
      email      : Joi.string().email(),
    });

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const { id } = req.body;

    if (req.body.username)
      return await this.dbUser.updateByUsername(req.body.username, { token: null });
    else
      return await this.dbUser.updateByEmail(req.body.email, { token: null })
  }

  async createToken(id, username) {
    // const newToken = await this.constructor.getToken(userId);
    console.log(`Issuing new token to user ${username}`);
    const newToken = jwt.sign({ id }, process.env.TOKEN_KEY);
    const tokenSaved = await this.saveToken(newToken, username);
    if (!tokenSaved) throw new AuthenticationError(usersMessage.tokenNotSet);
    return newToken;
  }

  // static async getToken(id) {
  //   return jwt.sign({ id }, process.env.TOKEN_KEY);
  // }

  async saveToken(token, username) {
    // const user = await this.dbUser.find
    const [ result ] = await this.dbUser.updateByUsername(
      username,
      { token: token },
    );
    return result;
  }
}

module.exports = UserService;
