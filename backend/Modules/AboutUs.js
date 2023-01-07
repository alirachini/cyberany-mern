const express = require("express");
const mongoose = require("mongoose");
const AboutUsSchema = new mongoose.Schema({
    body: String,
  });
  module.exports= mongoose.model("AboutUs", AboutUsSchema);