const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  category: {
    type: "string",
    enum:["Electronic","Clothing","Mobile","Other"],
    default:"Other",
    required: true
  },
  description: {
    type: "string",
  },
  price: {
    type: "string",
    required: true,
  },
  sellingPrice: {type: "string",default: this.price},
  createdAt: {
    type: "date",
    default: Date.now(),
  },
});


module.exports = mongoose.model("Product", productSchema);
