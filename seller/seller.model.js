import mongoose from "mongoose";

// set rule
const sellerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    unique: true, //index create garxa
    lowercase: true,
  },
  contactNumber: {
    type: String,
    required: false,
    maxlength: 15,
    trim: true,
  },
  dob: {
    type: Date,
    required: false,
  },
});

// create table
const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
