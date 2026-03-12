import { Schema, model } from "mongoose";

//Create product schema
const productSchema = new Schema(
  {
    productId: {
      type: Number,
      required: [true, "Product ID is required"],
      unique: true,
    },

    productName: {
      type: String,
      required: [true,"product name is required"],
    },

    price: {
      type: Number,
      required: [true,"price is required"],
      min: [10000,"minimum price should be 10000"],
      max: [50000,"maximum price should be 50000"],
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//create model
export const ProductModel = model("Product", productSchema);