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
    const [result] = await pool.query(
      `
        SELECT * FROM users WHERE id = ?
      `, 
      [id]
    );
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

export async function deleteUserByID(id) {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}


export async function getSessionByID(id) {
  try {
    const [result] = await pool.query(`SELECT * FROM sessions WHERE id = ?`, [id]);
    return result[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getSession(token) {
  try {
    const [result] = await pool.query(`SELECT * FROM sessions WHERE token = ?`, [
      token,
    ]);
    return result[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createSession( user_id, token ) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO sessions (user_id, token) 
      VALUES ( ? , ? )
      `,
      [user_id, token]
    );
    const id = result.insertId;
    return getSessionByID(id);
  } catch (e) {
    console.error(e);
    return null;
  }

}

export async function deleteSession(user_id) {
  try {
    const [result] = await pool.query(
      `
        DELETE FROM sessions 
        WHERE user_id = ?
      `,
      [user_id]
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function updateUserAvatar(id, filename) {
  try {
    const [result] = await pool.query(
      `
      UPDATE users 
      SET avatar = ? 
      WHERE id = ?
      `,
      [filename, id]
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function updateUserBio(id, bio) {
  try {
    const [result] = await pool.query(
      `
      UPDATE users 
      SET bio = ? 
      WHERE id = ?
      `,
      [bio, id]
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getBlogByID(id) {
  try {
    const [result] = await pool.query(
      `
      SELECT * FROM blogs
      WHERE blogs.id = ?
      `,
      [id]
    );
    return result[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}


export async function getBlogs() {
  try {
    const [result] = await pool.query(
      `
      SELECT blogs.id, blogs.owner_id, blogs.title, blogs.media, blogs.content, 
             blogs.created_at, users.username, users.avatar
      FROM blogs
      JOIN users ON blogs.owner_id = users.id
      ORDER BY blogs.created_at DESC
      `
    );
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}


export async function createBlog(userID, title, media, content){
  try{
    const [result] = await pool.query(
      `
      INSERT INTO blogs (owner_id, title, media, content)
      VALUES ( ?, ?, ?, ?)
      `,
      [userID, title, media, content]
    );
    const id = result.insertId;
    return getBlogByID(id);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserBlogs(userID) {
  try {
    const [result] = await pool.query(
      `
      SELECT * FROM blogs 
      WHERE owner_id = ?
      ORDER BY created_at DESC
      `,
      [userID]
    );
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteUserBlogs(userID) {
  try {
    const [result] = await pool.query(
      `
      DELETE FROM blogs 
      WHERE owner_id = ?
      `,
      [userID]
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function followUser(userID, followerID) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO followers (user_id, followed_id)
      VALUES ( ?, ?)
      `,
      [userID, followerID]
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function unfollowUser(userID, followerID) {
  try {
    const [result] = await pool.query(
      `
      DELETE FROM followers
      WHERE user_id = ? AND followed_id = ?
      `,
      [userID, followerID]
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getUserFollowers(followedID) {
  try {
    const [result] = await pool.query(
      `
      SELECT * FROM followers
      WHERE followed_id = ?
      `,
      [followedID]
    );
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
