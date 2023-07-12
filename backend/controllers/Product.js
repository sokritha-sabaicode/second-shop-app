import Category from "../database/models/Category.js";
import Product from "../database/models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      fullName,
      phoneNumber,
      productCategory,
      productName,
      productModel,
      productType,
      productCondition,
      issueRepair,
      inStock,
      productDetails,
      productPrice,
    } = req.body;
    let imageUrls = req.body.imageUrls;

    console.log(req.body);

    let categoryId;
    if (productCategory) {
      categoryId = await Category.findOne({ name: productCategory });
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          error: "Invalid category",
        });
      }
    }

    console.log(
      "🚀 ~ file: Product.js:24 ~ createProduct ~ categoryId:",
      categoryId
    );

    const newProduct = new Product({
      sellerName: fullName,
      sellerContact: phoneNumber,
      category: categoryId._id,
      name: productName,
      model: productModel,
      type: productType || "", // optional - depend on the category
      condition: productCondition,
      issueAndRepair: issueRepair,
      stock: inStock,
      details: productDetails,
      price: productPrice,
      images: imageUrls,
    });
    console.log(
      "🚀 ~ file: Product.js:48 ~ createProduct ~ newProduct:",
      newProduct
    );

    const product = await newProduct.save();
    console.log("🚀 ~ file: Product.js:50 ~ createProduct ~ product:", product);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 8 } = req.query;
    const query = {};

    if (category && category !== "all") {
      query.category = await Category.findOne({ name: category });
      if (!query.category) {
        return res.status(400).json({
          success: false,
          error: "Invalid category",
        });
      }
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const products = await Product.paginate(query, options);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error("Get All Product Error", err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
