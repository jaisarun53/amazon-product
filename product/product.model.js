import mongoose from "mongoose";
// set rule
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
// create table
const product = mongoose.model("product", productSchema);
export default product;
