const { foods: scanMessage } = require('../helpers/response-message');
//const scan = require('../routes/scan');

class ScanController {
  constructor(scanService) {
    this.scanService = scanService;
    this.getAllScans = this.getAllScans.bind(this);
    this.getScanById = this.getScanById.bind(this);
    this.getScanByUserId = this.getScanByUserId.bind(this);
    this.newScan = this.newScan.bind(this);
    this.updateScanById = this.updateScanById.bind(this);
    this.deleteScanById = this.deleteScanById.bind(this);
  }

  async getAllScans(req, res, next) {
    return this.scanService
      .getAllScans(req)
      .then((foods) => res.status(200).json(foods))
      // .catch((error) => next(error));
  }

  async getScanById(req, res, next) {
    return this.scanService
      .getScanById(req)
      .then((food) => res.json(food))
      .catch((error) => next(error));
  }

  async getScanByUserId(req, res, next) {
    return this.scanService
      .getScanByUserId(req)
      .then((food) => res.json(food))
      .catch((error) => next(error));
  }

  async newScan(req, res, next) {
    return this.scanService
      .newScan(req)
      .then((scan) => res.status(201).json({
        data: scan,
      }))
      // .catch((error) => next(error));
  }

  async updateScanById(req, res, next) {
    return this.scanService
      .updateScanById(req)
      .then(() => res.json({
        message: scanMessage.update,
      }))
      .catch((error) => next(error));
  }

  async deleteScanById(req, res, next) {
    return this.scanService
      .deleteScanById(req)
      .then(() => res.json({
        message: scanMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = ScanController;
