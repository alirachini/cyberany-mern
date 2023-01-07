const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const app = express();
const allroutes = require("./Routes/routes")
app.use(express.json())

app.use(cors());

//use all routes
app.use("/",allroutes)
//port listening
app.listen(port, () => {
  console.log(`Anas's app listening on port ${port}`);
});

//connection to the databse
const url =
  "mongodb+srv://anas:anas@cyberany.ktxlk.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, (err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err.message);
  }
});