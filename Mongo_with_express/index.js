const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
  .then((res) => {
    console.log(res, "Connection successful");
  })
  .catch((err) => console.log("Some error occured", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", (req, res) => {
    res.send("Basic page");
});

app.listen(port, () => {
    console.log("Listening");
});