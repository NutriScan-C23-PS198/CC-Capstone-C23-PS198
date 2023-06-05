module.exports = function brandRouter(express, verifyToken, brandController) {
  const router = express.Router();

  router.get('/', brandController.getAllBrands);
  router.get('/:id', verifyToken, brandController.getBrandById);
  router.post('/', verifyToken, brandController.createBrand);
  router.put('/:id', verifyToken, brandController.updateBrandById);
  router.delete('/:id', verifyToken, brandController.deleteBrandById);

  return router;
};
