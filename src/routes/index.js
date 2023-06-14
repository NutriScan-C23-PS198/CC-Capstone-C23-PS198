const { handleError } = require('../helpers/exceptions');
const verifyToken     = require('../helpers/middleware');

// Router
const BrandRouter = require('./brand');
const FoodRouter  = require('./food');
const UserRouter  = require('./user');
const ScanRouter  = require('./scan');
const AuthRouter  = require('./auth');

// Controller
const BrandController = require('../controllers/brand');
const FoodController  = require('../controllers/food');
const UserController  = require('../controllers/user');
const ScanController  = require('../controllers/scan');
const AuthController  = require('../controllers/auth');

// Service
const BrandService = require('../services/brand');
const FoodService  = require('../services/food');
const UserService  = require('../services/user');
const ScanService  = require('../services/scan');
const AuthService  = require('../services/auth');

// DB
const DBBrand = require('../databases/brand');
const DBFood  = require('../databases/food');
const DBUser  = require('../databases/user');
const DBToken = require('../databases/user_token');
const DBScan  = require('../databases/scan');
const DBAuth  = require('../databases/auth');

const dbBrand = new DBBrand();
const dbFood  = new DBFood();
const dbUser  = new DBUser();
const dbToken = new DBToken();
const dbScan  = new DBScan();
const dbAuth  = new DBAuth();

const brandService = new BrandService(dbBrand);
const foodService  = new FoodService(dbFood);
const userService  = new UserService(dbUser);
const scanService  = new ScanService(dbScan);
const authService  = new AuthService(dbAuth);

const brandController = new BrandController(brandService);
const foodController  = new FoodController(foodService);
const userController  = new UserController(userService);
const scanController  = new ScanController(scanService);
const authController  = new AuthController(authService);


module.exports = function routes(express, app) {
  const router = express.Router();

  app.get('/', (req, res) => {
    res.send({'msg': 'NutriScan API'});
  });

  // SECTION: Auth
  router.post('/register', userController.createUser);
  router.post('/login',    userController.login);
  router.post('/logout',   userController.logout);
  app.use(router);

  app.use('/brand', BrandRouter(express, verifyToken, brandController));
  app.use('/food',  FoodRouter (express, verifyToken, foodController));
  app.use('/user',  UserRouter (express, verifyToken, userController));
  app.use('/scan',  ScanRouter (express, verifyToken, scanController));
  return app;
}
