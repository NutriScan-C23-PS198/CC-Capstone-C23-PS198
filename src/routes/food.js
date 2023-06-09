module.exports = function foodsRouter(express, verifyToken, foodsController) {
  const router = express.Router();

  router.get('/', foodsController.getAllFoods);
  // router.get('/:id', verifyToken, foodsController.getFoodById);
  router.get('/:id', foodsController.getFoodById);
  router.get('/find', foodsController.getFoodByName);
  router.post('/', foodsController.createFood);
  router.put('/:id', foodsController.updateFoodById);
  router.delete('/:id', foodsController.deleteFoodById);

  return router;
};

