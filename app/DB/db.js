import mysql from "serverless-mysql";

const pool = mysql({
  config: {
    host: process.env.DB_HOST,
    user: "root",
    password: process.env.PW,
    port: 3306,
    database: process.env.DB_NAME,
  },
});

export { pool };