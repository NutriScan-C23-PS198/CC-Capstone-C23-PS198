module.exports = function foodsRouter(express, verifyToken, foodsController) {
  const router = express.Router();

  router.get('/', foodsController.getAllFoods);
  router.get('/:id', verifyToken, foodsController.getFoodById);
  router.get('/users/:id', verifyToken, foodsController.getFoodsByUserId);
  router.post('/', verifyToken, foodsController.createFood);
  router.put('/:id', verifyToken, foodsController.updateFoodById);
  router.delete('/:id', verifyToken, foodsController.deleteFoodById);

  return router;
};

