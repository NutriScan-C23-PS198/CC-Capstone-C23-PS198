module.exports = function scanRouter(express, verifyToken, scanController) {
  const router = express.Router();

  router.get('/', scanController.getAllScan);
  router.get('/:id', verifyToken, scanController.getScanById);
  router.post('/', verifyToken, scanController.newScan);
  router.delete('/:id', verifyToken, scanController.deleteScanById);

  return router;
};
