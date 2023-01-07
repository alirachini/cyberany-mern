const mongoose = require("mongoose");
const ContactUsSchema = new mongoose.Schema({
    body: String,
  });
  module.exports = mongoose.model("ContactUs", ContactUsSchema);