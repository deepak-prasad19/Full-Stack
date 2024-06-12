const express = require("express");
const app = express();
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connection = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "Deepak@1999",
    database: "temp",
});

let getRandomData = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

app.get("/", (req, res) => {
    let q = "SELECT COUNT(*) FROM company";

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render("index.ejs", { result });
        });
    }catch(err) {
        console.log("Some errors occured", err);
    }
});

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