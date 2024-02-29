import express from "express";
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.routes.js";
import sellerRoutes from "./seller/seller.route.js";
const app = express();
// to make understand jason
app.use(express.json());
// =================database===============
connectDB();
// =================register route===========
app.use(productRoutes);
app.use(sellerRoutes);
// ================port and server=============
const PORT = 5400;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
