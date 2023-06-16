module.exports = function foodsRouter(express, verifyToken, verifyAccess, foodsController) {
  const router = express.Router();

  router.get('/', verifyToken, foodsController.getAllFoods);
  // router.get('/:id', verifyToken, foodsController.getFoodById);
  // router.get('/get/:id', foodsController.getFoodById);
  router.get('/find', verifyToken, foodsController.findFood);
  router.post('/', verifyToken, verifyAccess, foodsController.createFood);
  router.put('/:id', verifyToken, verifyAccess, foodsController.updateFoodById);
  router.delete('/:id', verifyToken, verifyAccess, foodsController.deleteFoodById);

  return router;
};

