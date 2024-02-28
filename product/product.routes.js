import express from "express";
import Product from "./product.model.js";
import product from "./product.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const router = express.Router();
// add product===========
router.post("/product/add", async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;

  // add new product to db
  await Product.create(newProduct);

  // send response
  return res.status(201).send({ message: "Product is added successfully." });
});
// get product list==============
router.get("/product/list", async (req, res) => {
  const productList = await product.find();
  return res.status(200).send({ message: "success", productlist: productList });
});
// get product by id================
router.get("/product/detail/:id", async (req, res) => {
  const productId = req.params.id;
  const isValidId = mongoose.isValidObjectId(productId);
  if (!isValidId) {
    return res.status(404).send({ message: "invalid mongoose id" });
  }
  const requiredProduct = await product.findOne({ _id: productId });
  if (!requiredProduct) {
    return res.status(400).send({ message: "product doesnot exist" });
  }
  return res
    .status(200)
    .send({ message: "success", productdetails: requiredProduct });
});
// delete product by id===================
router.delete("/product/delete/:id", async (req, res) => {
  // extract productId from req.params
  const productId = req.params.id;
  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(productId);
  // if not valid, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "invalid mongoose id" });
  }
  // find product by id
  const requiredProduct = await product.findOne({ _id: productId });
  // if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "product deoesnot exist" });
  }
  // delete product
  await product.deleteOne({ _id: productId });
  // send response
  return res.status(201).send({ message: "deleted sussfully" });
});
// edit product by id=================
router.put("/product/edit/:id", async (req, res) => {
  const productId = req.params.id;
  const isValidId = mongoose.isValidObjectId(productId);
  if (!isValidId) {
    return res.status(404).send({ message: "invalid mongoose id" });
  }
  const requiredProduct = await product.findOne({ _id: productId });
  if (!requiredProduct) {
    return res.status(400).send({ message: "product dees not exsist" });
  }
  const newValue = req.body;
  await product.updateOne(
    { _id: productId },
    {
      $set: {
        name: newValue.name,
        price: newValue.price,
      },
    }
  );
  return res.status(200).send({ message: "product updated sussfully" });
});

export default router;
