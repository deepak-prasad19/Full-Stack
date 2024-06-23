const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const Chat = require("./models/chat");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // for using style.css which is static
app.use(express.urlencoded({ extended: true })); // to parse data req.body

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

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
  console.log(chats);
});

// Create Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;

  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => console.log("chat is saved"))
    .catch((err) => console.log("some error occurred"));

  console.log(newChat);
  res.redirect("/chats");
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(port, () => {
  console.log("Listening");
});
