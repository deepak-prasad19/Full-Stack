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
    }catch(err) {
        console.log("Some errors occured", err);
        res.send("some error in db");
    }
});

// user route where details are displayed of the all the records
app.get("/user", (req, res) => {
    let q = `SELECT * FROM company`;

    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.render("showusers.ejs", { result } );
        });
    }catch(err) {
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