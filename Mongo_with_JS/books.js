const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("Errors occured", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //! Not null value is not accepted
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: 1, //! min price should be atleast 1
    //* custom error message -> min: [1, "price cannot be less than 1"],
  },
  discount: {
    type: Number,
    default: 0, //! by-default discount is 0%
  },
  category: {
    type: String,
    //! using enum we can only choose from the defined values in that using other will lead to an error
    enum: ["fiction", "non-fiction"],
  },
  genre: [String], //! [String] means it can accept an array as input
});

const Book = new mongoose.model("Book", bookSchema);

// const book1 = new Book({
//   title: "Habibi",
//   author: "Habib",
//     price: 100,
//     category: "fiction",
//   genre: ['Comic', 'Fear'],
// });

// book1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! below query will delete all the records
// Book.deleteMany({})
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));
