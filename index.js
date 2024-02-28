import express from "express";
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.routes.js";
const app = express();
// to make understand jason
app.use(express.json());
// =================database===============
connectDB();
// =================register route===========
app.use(productRoutes);
// ================port and server=============
const PORT = 5400;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
