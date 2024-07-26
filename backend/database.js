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
  try {
    const [result] = await pool.query("SELECT * FROM users");
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }

}

export async function getUserByID(id) {
  try {
    const [result] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return result[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserByEmail(email) {
  try {
    const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return result[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createUser(username, password, email, gender) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO users (username, password, email) 
      VALUES ( ?, ?, ?)
      `,
      [username, password, email, gender]
    );
    const id = result.insertId;
    return getUserByID(id);
  } catch (e) {
    console.error(e);
    return null;
  }

}



// console.log(users);
