import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsers() {
  const [result] = await pool.query("SELECT * FROM users");
  return result;
}

export async function getUser(id) {
  const [result] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return result[0];
}

export async function createUser(username, password, email, gender) {
  const [result] = await pool.query(
    `
    INSERT INTO users (username, password, email, gender) 
    VALUES ( ?, ?, ?, ?)
    `,
    [username, password, email, gender]
  );
  const id = result.insertId;
  return getUser(id);
}



// console.log(users);
