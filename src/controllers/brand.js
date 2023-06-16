const { foods: brandsMessage } = require('../helpers/response-message');

class BrandController {
  constructor(brandService) {
    this.brandService     = brandService;
    this.getAllBrands     = this.getAllBrands.bind(this);
    this.getBrandById     = this.getBrandById.bind(this);
    this.getBrandByFoodId = this.getBrandsByFoodId.bind(this);
    this.createBrand      = this.createBrand.bind(this);
    this.updateBrandById  = this.updateBrandById.bind(this);
    this.deleteFoodById   = this.deleteBrandById.bind(this);
  }

  async getAllBrands(req, res, next) {
    return this.brandService
      .getAllBrands(req)
      .then((brand) => res.status(200).json(brand))
      .catch((error) => next(error));
  }

  async getBrandById(req, res, next) {
    return this.brandService
      .getBrandById(req)
      .then((brand) => res.json(brand))
      .catch((error) => next(error));
  }

  async getBrandsByFoodId(req, res, next) {
    return this.brandService
      .getBrandsByFoodId(req)
      .then((brand) => res.json(brand))
      .catch((error) => next(error));
  }

  async createBrand(req, res, next) {
    return this.brandService
      .createBrand(req)
      .then((brand) => res.status(201).json({
        message: brandsMessage.create,
        data: brand,
      }))
      .catch((error) => next(error));
  }

  async updateBrandById(req, res, next) {
    return this.brandService
      .updateBrandById(req)
      .then(() => res.json({
        message: brandsMessage.update,
      }))
      .catch((error) => next(error));
  }

  async deleteBrandById(req, res, next) {
    return this.brandService
      .deleteBrandById(req)
      .then(() => res.json({
        message: brandsMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = BrandController;
