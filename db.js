//  for db testing purpose

const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    pool.execute(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

executeQuery("SELECT * FROM schools")
  .then((results) => {
    console.log("Schools:", results);
  })
  .catch((err) => {
    console.error("Database error:", err.message);
  });
