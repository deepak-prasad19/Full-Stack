// initializing express
const express = require("express");
// assigning the return object to app
const app = express();
// initializing sql for databases
const mysql = require("mysql2");
// initializing faker for generating fake data
const { faker } = require("@faker-js/faker");
// port for listening to the incoming requests
const port = 8080;
// path for running the file from anywhere and it should be able to find views folder and files
const path = require("path");
// For using post-patch-delete methods in form
const methodOverride = require("method-override");
const { connect } = require("http2");

app.use(methodOverride("_method"));
// To parse the post request values
app.use(express.urlencoded({ extended: true }));

// setting the engine to ejs for .ejs files1
app.set("view engine", "ejs");
// setting the view for it to be found from anywhere
app.set("views", path.join(__dirname, "views"));

// creating the sql connection to sql workbench with the detials
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Deepak@1999",
  database: "temp",
});

// this function generates the random data by using faker
let getRandomData = () => {
  return [
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// basic home page
// where we are giving a query to count no.of records and print it to the page and console
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM company`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //console.log(result[0]["COUNT(*)"]);
      let count = result[0]["COUNT(*)"];
      res.render("index.ejs", { count });
    });
  } catch (err) {
    console.log("Some errors occured", err);
    res.send("some error in db");
  }
});

// user route where details are displayed of the all the records
app.get("/user", (req, res) => {
  let q = `SELECT * FROM company`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //console.log(result);
      res.render("showusers.ejs", { result });
    });
  } catch (err) {
    console.log(err);
  }
});

// EDIT Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM company WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log("Id is:", result[0].id);
      //console.log("username is:", result[0].username);
      // console.log("Email is:", result[0]["email"]);
      // console.log("password is: " + result[0].password);
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log("something went wrong");
  }
});

// ADD Route
app.get("/user/add", (req, res) => {
      res.render("add.ejs");
});

// DELETE Confirm Route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM company WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log("something went wrong");
  }
});

// ADD Route
app.post("/user", (req, res) => {
  let {username: newusername, password: newpassword, email: newemail} = req.body;
  let id = faker.datatype.uuid();
  //res.send(req.body);
  //console.log(newusername, newpassword, newemail, id);

  let query = `INSERT INTO company (id, username, email, password) VALUES ('${id}', '${newusername}', '${newemail}', '${newpassword}')`;

  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  }catch (err) {
    if ('ER_DUP_ENTRY') {
      res.send("This record is already present in the list!!");
    }
    console.log(err);
    res.send("Something went wrong!!");
  }
});

// UPDATE Route
app.patch("/user/:id", (req, res) => {
  // fetch the id from paramaters
  let { id } = req.params;
  // run the query for the id to get the record
  let q = `SELECT * FROM company WHERE id='${id}'`;
  // Get the updated username and the password from the submitted form
  let { username: newusername, password: formpass } = req.body;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      //console.log(user);

      // compare the password if correct update the username else send wrong password message
      if (formpass != user.password) {
        res.send("Wrong Password!!");
      } else {
        // Run the update command based on the id condition
        let updateQuery = `UPDATE company SET username='${newusername}' WHERE id='${id}'`;

        // create another connection fo running the update query in db
        connection.query(updateQuery, (err, result) => {
          if (err) throw err;
          // re-direct to the user list page to display the update
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// DELETE Route
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let listq = `SELECT * FROM company WHERE id='${id}'`;
  let { password: confirmPassword } = req.body;

  try {
    connection.query (listq, (err, result) => {
      if(err) throw err;
      let user = result[0];

      if(confirmPassword != user.password) {
        res.send("Wrong Password!!")
        //console.log(confirmPassword, user.password);
      }
      else {
        let deleteQuery = `DELETE FROM company WHERE id='${id}'`;
        connection.query(deleteQuery, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  }catch (err) {
    console.log(err);
  } 
});

// for incoming requests
app.listen(port, (req, res) => {
  console.log("Port is open for request's");
});

// const q = "insert into company (id, username, email, password) values ?";
// let data = [];

// for(let i=0; i<100; i++) {
//     data.push(getRandomData());
// }

// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// }catch(err) {
//     console.log(err);
// }
// finally {
//     connection.end();
// }
