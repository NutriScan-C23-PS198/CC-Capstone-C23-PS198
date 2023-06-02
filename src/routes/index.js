const { handleError } = require('../helpers/exceptions');
const verifyToken     = require('../helpers/middleware');

// Router
const brandRouter = require('./brand');
const foodRouter  = require('./food');
const userRouter  = require('./user');
const scanRouter  = require('./scan');
const authRouter  = require('./auth');

// Controller
const brandController = require('../controller/brand');
const foodController  = require('../controller/foods');
const userController  = require('../controller/user');
const scanController  = require('../controller/scan');
const authController  = require('../controller/auth');


module.exports = function routes(express, app) {
  app.get('/', (req, res) => {
    res.send({'msg': 'NutriScan API'});
  });

  app.use('/brand', brandRouter(express, verifyToken, brandController));
  app.use('/food',  foodRouter (express, verifyToken, foodController));
  app.use('/user',  userRouter (express, verifyToken, userController));
  app.use('/scan',  scanRouter (express, verifyToken, scanController));
  app.use('/auth',  authRouter (express, verifyToken, authController));
}
