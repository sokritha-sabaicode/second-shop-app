import express from "express";
import * as ProductController from "../controllers/Product.js";
import uploadToCloudinary from "../middlewares/uploadToCloudinary.js";
import checkRequestBody from "../middlewares/checkRequestBody.js";
import upload from "../middlewares/multer.js";
import parseRequestBody from "../middlewares/parseRequestBody.js";

const requiredFields = [
  "fullName",
  "phoneNumber",
  "productCategory",
  "productName",
  "productModel",
  "productCondition",
  "issueRepair",
  "inStock",
  "productDetails",
  "productPrice",
];

const fieldsToParse = [
  "fullName",
  "phoneNumber",
  "productCategory",
  "productName",
  "productModel",
  "productType",
  "productCondition",
  "issueRepair",
  "inStock",
  "productDetails",
  "productPrice",
];

const router = express.Router();

router
  .route("/")
  .post(
    upload.array("productImages"), // Accept Form Data Request
    checkRequestBody(requiredFields),
    parseRequestBody(fieldsToParse),
    uploadToCloudinary,
    ProductController.createProduct
  )
  .get(ProductController.getAllProducts);

router.route("/:productId").get(ProductController.getProduct);

export default router;
