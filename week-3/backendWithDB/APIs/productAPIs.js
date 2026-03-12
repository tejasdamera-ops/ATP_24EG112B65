import exp from "express";
import { ProductModel } from "../models/ProductModel.js";

export const productApp = exp.Router();

productApp.post("/products", async (req, res) => {
  //get product
  const newProduct = req.body;

  //create document
  const productDoc = new ProductModel(newProduct);

  //save to database
  await productDoc.save();

  res.status(201).json({ message: "Product created" });
});

productApp.get("/products", async (req, res) => {
  //read all products
  const productList = await ProductModel.find();

  res.status(200).json({
    message: "Products",
    payload: productList,
  });
});

productApp.get("/products/:Id", async (req, res) => {
  //get productId from params
  const pid = req.params.Id;

  //find product
  const product = await ProductModel.findOne({ productId: pid });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    message: "Product",
    payload: product,
  });
});

productApp.put("/products/:productId", async (req, res) => {
  //get productId
  const pid = req.params.productId;

  //get modified product
  const modifiedProduct = req.body;

  const updatedProduct = await ProductModel.findOneAndUpdate(
    pid, 
    { $set: { ...modifiedProduct } },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    message: "Product updated",
    payload: updatedProduct,
  });
});

productApp.delete("/products/:productId", async (req, res) => {
  //get productId
  const pid = req.params.productId;

  //delete product
  const deletedProduct = await ProductModel.findOneAndDelete({
    productId: pid,
  });

  if (!deletedProduct)
    return res.status(404).json({ message: "Product not found" });

  res.status(200).json({
    message: "Product deleted",
    payload: deletedProduct,
  });
});
