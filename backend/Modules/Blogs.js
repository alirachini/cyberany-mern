const express = require("express");
const mongoose = require("mongoose");
const Categories = require("./Categories")
const BlogsSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    like: Number,
    dislike: Number,
    time : Date,
    categories: { type: mongoose.SchemaTypes.ObjectID, ref: "Categories" },
  });
  module.exports = mongoose.model("Blogs", BlogsSchema);
