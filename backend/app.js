import express from "express";
import ProductRoute from "./routes/Product.js";
import CategoryRoute from "./routes/Category.js";
import cors from "cors";

const app = express();

// Global Middleware
app.use(cors());

app.use(express.json());

// Global Route
app.use("/products", ProductRoute);
app.use("/categories", CategoryRoute);

export default app;
