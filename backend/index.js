require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// mongoDB connection ke liye
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// imports all routers
const userRouter = require("./routes/User.routes");
const productRouter = require('./routes/Product.routes')
const sellerAdminRouter = require("./routes/SellerAdmin.routes")
const SuperAdminRouter = require("./routes/SuperAdmin.routes");
const cartRouter = require("./routes/Cart.routes")
const authMiddleware = require("./middlewares/Auth.middleware")

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// use router middlewares
app.use("/user", userRouter);
app.use('/product',productRouter)
app.use("/seller-admin",authMiddleware.sellerAuthorization,sellerAdminRouter);
app.use("/super-admin",authMiddleware.superAuthorization, SuperAdminRouter);
app.use("/cart",authMiddleware.authorization, cartRouter);

// app start
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
