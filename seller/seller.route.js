import express from "express";
const router = express.Router();
import Seller from "./seller.model.js";
import mongoose from "mongoose";
// add seller=====================
router.post("/seller/add", async (req, res) => {
  // extract new seller from req.body
  const newUser = req.body;
  // find user with new email
  const user = await Seller.findOne({ email: newUser.email });
  // if user exist throw error
  if (user) {
    return res.status(200).send({ message: "email already exist" });
  }
  // insert new seller to database
  await Seller.create(newUser);
  // send respopnse
  return res.status(200).send({ message: "seller has been added sussfully" });
});
// seller list======================================
router.get("/seller/list", async (req, res) => {
  const sellerList = await Seller.find();
  return res.status(200).send({ message: "success", sellerList: sellerList });
});
// get seller list by pagination
router.get("/seller/pegination/list", async (req, res) => {
  const { page, limit } = req.body;
  const skip = (page - 1) * limit;
  const sellerList = await Seller.aggregate([
    { $match: {} },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);
  return res.status(200).send({ message: "seccess", sellerList: sellerList });
});
// find seller by id or email
router.get("/seller/detail/:id", async (req, res) => {
  const sellerId = req.params.id;
  const isValidId = mongoose.isValidObjectId(sellerId);
  if (!isValidId) {
    return res.status(404).send({ message: "invalid mongoose id" });
  }
  const requiredSeller = await Seller.findOne({ _id: sellerId });
  if (!requiredSeller) {
    return res.status(400).send({ message: "seller doesnot exist" });
  }
  return res
    .status(200)
    .send({ message: "success", sellerDetails: requiredSeller });
});
// delete seller vy id=====================
router.delete("/delete/seller/:id", async (req, res) => {
  const sellerId = req.params.id;
  const isValidId = mongoose.isValidObjectId(sellerId);
  if (!isValidId) {
    return res.status(404).send({ message: "invalid mongoose id" });
  }
  const requiredSeller = await Seller.findOne({ _id: sellerId });
  if (!requiredSeller) {
    return res.status(400).send({ message: "seller doesnot exist" });
  }
  await Seller.deleteOne({ _id: sellerId });
  return res.status(200).send({ message: "deleted sussfully" });
});
// edit product by id=====================
router.put("/update/seller/:id", async (req, res) => {
  const sellerId = req.params.id;
  const isValidId = mongoose.isValidObjectId(sellerId);
  if (!isValidId) {
    return res.status(404).send({ message: "invalid mongoose id" });
  }
  const requiredSeller = await Seller.findOne({ _id: sellerId });
  if (!requiredSeller) {
    return res.status(400).send({ message: "seller doesnot exist" });
  }
  const newValue = req.body;
  await Seller.updateOne(
    { _id: sellerId },
    {
      $set: {
        firstName: newValue.firstName,
        lastName: newValue.lastName,
        email: newValue.email,
        contactNumber: newValue.contactNumber,
        dob: newValue.dob,
      },
    }
  );
  return res.status(200).send({ message: "updated successfully" });
});
export default router;
