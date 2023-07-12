import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  sellerName: {
    type: String,
    required: true,
  },
  sellerContact: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  condition: {
    type: String,
    required: true,
  },
  issueAndRepair: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  details: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
});

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", ProductSchema);
