import express from "express";
const router = express.Router();
import Seller from "./seller.model.js";
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
// // find seller by id or email
// router.get("/seller/:id",async(req,res)=>{
// new sellerId= req.body.id
// })
export default router;
