const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { NotFoundError, AuthenticationError, InvariantError } = require('../helpers/exceptions');
const { users: usersMessage } = require('../helpers/response-message');
const { getImageFromLetter, getFirstLetterFromPhrase } = require('../helpers/food-images');
const { isValidEmail, isValidPass } = require('../helpers/validator');

class ScanService {

  constructor(DBScan) {
    this.dbScan = DBScan;
  }


  // Get a list of scan results
  async getAllScans(req) {
    // Validation schema
    const schema = Joi.object().keys({
      page: Joi.number().min(1),  // page number
      size: Joi.number().min(1),  // number of items per page
    });

    // Validate from request body
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    // Get page and size from request body
    const { page,  size   } = req.body;
    const { limit, offset } = getPagination(page, size);
    
    // Get and return results
    return this.dbScan.findAll(offset, limit);
  }

  async getScanById(id) {
    return this.resolveUser(id)
      .then((user) => {
        if (!user) throw new NotFoundError(usersMessage.notFound);

        return user;
      });
  }

  async newScan(req) {
    const schema = Joi.object().keys({
      photo: Joi.string().required(),
      // token: Joi.string().required(),
    });

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const date = Date.now();

    // Upload to Google Cloud Storage and get the URL
    if (req.body.photo) {
      req.body.photo = await uploadImage(
        "scan",
        `${date}-${req.body.category}-${req.body.name}.jpeg`,
        req.body.photo
      );
    }

    // Make a predict request to Vertex AI and return the results (array of predicted object names with their confidence level)
    const predictedObjects = await predictImage(req.body.photo);

    return this.dbScan
      .create({
        photo: req.body.photo,
        date : req.body.date
      })
      .then(async (user) => this.resolveUser(user.id));
  }

  async deleteScanById(req) {
    await this.dbScan
      .findById(req.params.id)
      .then((user) => {
        if (!user) throw new NotFoundError(usersMessage.notFound);

        return this.dbScan.deleteById(req.params.id);
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
    return this.dbScan
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
    const user = await this.dbScan.findByEmail(req.body.email);

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
    return this.dbScan.update(userId, { token });
  }
}

module.exports = ScanService;
