//* Initialize data for db

const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then((res) => {
    console.log(res, "Connection successful");
  })
  .catch((err) => console.log("Some error occured", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChat = [
  {
    from: "Deepak",
    to: "Vineeth",
    msg: "Gandu ninu",
    created_at: new Date(),
  },
  {
    from: "ISO",
    to: "neon",
    msg: "It's you and me",
    created_at: new Date(),
  },
  {
    from: "phoenix",
    to: "everyone",
    msg: "Remember, Stay out of fire!",
    created_at: new Date(),
  },
  {
    from: "Sova",
    to: "Breech",
    msg: "Come into the unknown",
    created_at: new Date(),
  },
  {
    from: "Breech",
    to: "Iso",
    msg: "Here I come",
    created_at: new Date(),
  },
  {
    from: "Deepak",
    to: "Valorant",
    msg: "patch update 3.1.0",
    created_at: new Date(),
  },
  {
    from: "valorant",
    to: "Everyone",
    msg: "Pick your agents",
    created_at: new Date(),
  },
];

Chat.insertMany(allChat);