module.exports = function scanRouter(express, verifyToken, verifyAccess, scanController) {
  const router = express.Router();

  router.get('/', verifyToken, scanController.getAllScans);
  router.get('/get/', verifyToken, scanController.getScanById);
  router.post('/',  verifyToken, scanController.newScan);
  router.put('/:id', verifyToken, scanController.updateScanById);
  router.delete('/:id', verifyToken, scanController.deleteScanById);

  return router;
};
