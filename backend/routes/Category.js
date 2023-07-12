import express from "express";
import * as CategoryController from "../controllers/Category.js";

const router = express.Router();

router.route("/").get(CategoryController.getAllCategories);

export default router;
