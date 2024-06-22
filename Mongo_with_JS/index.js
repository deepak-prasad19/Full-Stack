//* To use mongoose in js
const mongoose = require("mongoose");

//* Calling the main function where connection is established
main()
  .then((res) => {
    console.log(res, "Connection Successful");
  })
  .catch((err) => console.log(err));

//* async function as it may take time to create a connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/temp");
}

//* Defining the Schema very general and basic way without constraints
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

//* Creating the collection and passing the Schema.
const newCollection = mongoose.model("newCollection", userSchema);

//* Creating the user with the values
// const user1 = new newCollection({
//   name: "ISO",
//   email: "iso@mail.com",
//   age: 500,
// });

//* Saving the data (Won't be reflected until saved)
// user1.save();

//* Inserting many records and no need to save it externally
// newCollection
//   .insertMany([
//     { name: "Deepak", email: "mail", age: 25 },
//     { name: "prasad", email: "mail.com", age: 26 },
//   ])
//   .then((data) => {
//     console.log(data);
//   });

//* Below find will fetch all the records
// newCollection.find().then((data) => {
//   console.log("find()");
//   console.log(data);
// });

//* Finding the records using the filter
// newCollection.find({ age: { $gte: 10 } }).then((data) => {
//   console.log("find(age > 10)");
//   console.log(data);
// });

//* Updating a single record returns meta data like below
/* 
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
*/
// newCollection.updateOne({ name: "ISO" }, { age: 600 }).then((res) => {
//     console.log(res);
// });

//* updating an records based on filter condition returns meta data
// newCollection.updateMany({ name: "ISO" }, { age: 700 }).then((res) => {
//     console.log(res);
// });

//* Updating a single record returns values data like below
/**
 **{
 **_id: new ObjectId('667688851e86b66dd8bd1652'),    
 **name: 'ISO',
 **email: 'iso@mail.com',
 **age: 700,
 **__v: 0
**}
*/
// newCollection.findOneAndUpdate({ name: "ISO" }, { age: 100 }).then((res) => {
//   console.log(res);
// });

//* Deleting a single record returns meta data like below
/* 
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
*/
// newCollection.deleteOne({ name: "ISO" }, { age: 600 }).then((res) => {
//     console.log(res);
// });

//* Deleting records based on filter condition returns meta data
// newCollection.deleteMany({ name: "ISO" }, { age: 700 }).then((res) => {
//     console.log(res);
// });

//* Deleting a single record returns values data like below
/**
 **{
 **_id: new ObjectId('667688851e86b66dd8bd1652'),    
 **name: 'ISO',
 **email: 'iso@mail.com',
 **age: 100,
 **__v: 0
**}
*/
newCollection.findOneAndDelete({ name: "ISO" }, { age: 100 }).then((res) => {
  console.log(res);
});

