require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "facebook",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists parks; CREATE TABLE parks(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(40) not null, image_url VARCHAR(40) not null, url VARCHAR(40) not null, latitude VARCHAR(40) not null, longitude VARCHAR(40) not null, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `parks` was successful!");

    console.log("Closing...");
  });

  con.end();
});
