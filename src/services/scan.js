const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { NotFoundError, AuthenticationError, InvariantError } = require('../helpers/exceptions');
const { scan: scanMessage } = require('../helpers/response-message');
const { uploadImage, deleteImage } = require('../helpers/storage');
const { predictImage } = require('../helpers/predict');
const getPage = require('../helpers/paging');
const scan = require('../routes/scan');


const dir = "scan"


class ScanService {

  constructor(DBScan, DBUser, DBFood) {
    this.dbScan = DBScan;
    this.dbUser = DBUser;
    this.dbFood = DBFood;
  }


  // Get a list of scan results
  async getAllScans(req) {
    // Validation schema
    const schema = Joi.object().keys({
      page       : Joi.number().min(1).default(1),  // page number
      size       : Joi.number().min(1).default(10), // number of items per page
      username   : Joi.string().required(),         // User's username
    });

    // Validate from request body
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    // Get page and size from request body
    const { page,  size   } = req.query;
    const { limit, offset } = getPage(Number(page), Number(size));
    
    // Get and return results
    return this.dbScan.findAll(req.query.username, offset, limit);
  }

  async getScanById(req) {
    // Validation schema
    const schema = Joi.object().keys({
      id: Joi.string().required(), // Scan history id
    });

    // Validate from request body
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    return this.dbScan.findById(req.query.id)
      .then((result) => {
        if (!result) throw new NotFoundError(scanMessage.notFound);

        return result;
      });
  }

  async newScan(req) {
    // return await this.dbScan
    //   .findByUsernameAndTime("YourUserName", "2023-06-15 20:14:35")
    //   .then((result) => result);
    if (!req.file) throw new InvariantError("Please provide a file");
    
    const schema = Joi.object().keys({
      username   : Joi.string().required(),
      // photo      : Joi.string().optional(),
    });

    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });

    const dateO      = new Date();
    const date       = dateO.toISOString().slice(0, 19)
                                          .replace('T', ' ');
    // const date       = Date.now();
    const filename   = `${req.body.username}-${date}.jpeg`;
    console.log(filename);
    console.log(req.body.username);
    var   fileBuffer = req.file.buffer;

    // Upload to Google Cloud Storage and get the URL
    const photoURL = await uploadImage(
      dir, filename,
      null,
      fileBuffer
    );

    console.log(`URL: ${photoURL}`);

    // Get user data from database
    const user = await this.dbUser.findByUsername(req.body.username);
    if (!user) throw new Error(`User ${req.body.username} does not exist`);

    // Make a predict request to prediction model and
    // return the results (array of predicted object names)
    // TODO: UNCOMMENT THIS CODE
    // const { labels } = await predictImage(`${dir}/${filename}`);
    // TODO: REMOVE THIS CODE
    const labels = ['gorengan', 'kerupuk'];
    console.log(`Labels: ${labels}`);

    // Check if any food is exists and get the data
    let food;
    for (const item of labels) {
      food = await this.dbFood.findByName(item);
      if (food) break;
    }
    
    // If no food exists, throw an error
    if (!food) throw new NotFoundError(`No food exists: ${labels}`);
    console.log(`Food Match: ${food.name}`);

    const scanSuccess = await this.dbScan
      .create({
        // id: null,  // auto generated
        username: user.username,
        foodname: food.name,
        photo   : photoURL,
        time    : date,
      })
      .then((data) => data);
    
    console.log(`scanSuccess: ${JSON.stringify(scanSuccess)}`);

    if (!scanSuccess) throw new Error("Unknown scan error");

    const scanResult = await this.dbScan
      .findByUsernameAndTime(user.username, date)
      .then((data) => data);
    
    console.log(JSON.stringify(scanResult));
    return scanResult;
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
