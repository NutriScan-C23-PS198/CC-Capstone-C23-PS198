module.exports = function scanRouter(express, verifyToken, scanController) {
  const router = express.Router();

  router.get('/', scanController.getAllScans);
  router.get('/get/', scanController.getScanById);
  router.post('/',  scanController.newScan);
  router.put('/:id', verifyToken, scanController.updateScanById);
  router.delete('/:id', verifyToken, scanController.deleteScanById);

  return router;
};
