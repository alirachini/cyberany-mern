const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
    text: String,
    time: Date,
    read: Boolean,
    Blog: { type: mongoose.SchemaTypes.ObjectId, ref: "Blogs" }
  });
  module.exports = mongoose.model("Comment", CommentSchema);