import database from '../database';
import { hashPassword, comparePassword } from '../utils/password';
import { EmailType } from './Email';

type UserType = {
  id: string;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  password: string;
};

class User {
  async createUser(u: UserType): Promise<UserType> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO users (username, first_name, middle_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, username`;
      const result = await connection.query(sql, [
        u.username,
        u.first_name,
        u.middle_name,
        u.last_name,
        await hashPassword(u.password)
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async getUsers(): Promise<UserType> {
    try {
      const connection = await database.connect();
      const sql = `SELECT id, username, first_name, middle_name, last_name FROM users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async getUser(id: string): Promise<UserType> {
    try {
      const connection = await database.connect();
      const sql = `SELECT id, username, first_name, middle_name, last_name FROM users WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updateUser(id: string, u: UserType): Promise<UserType> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE users
      SET username=$2, first_name=$3, middle_name=$4, last_name=$5
      WHERE id=$1
      RETURNING username, first_name, middle_name, last_name`;
      const result = await connection.query(sql, [
        id,
        u.username,
        u.first_name,
        u.middle_name,
        u.last_name
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updatePassword(id: string, u: UserType): Promise<boolean> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT password FROM users WHERE id=$1';
      const result = await connection.query(sql, [id]);
      if (result.rows.length) {
        const { password: hash } = result.rows[0];
        const check = await comparePassword(u.password, hash);
        if (check) {
          const sql = `UPDATE users SET password=$2 WHERE id=$1`;
          const result = await connection.query(sql, [
            id,
            await hashPassword(u.password)
          ]);
          connection.release();
          if (result.rows.length) {
            return true;
          }
          return false;
        } else {
          throw new Error("Old password does'nt match");
        }
      }
      connection.release();
      return false;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async deleteUser(id: string): Promise<UserType> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM users WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async authUser(u: UserType & EmailType): Promise<UserType> {
    try {
      const connection = await database.connect();
      const sql = `SELECT DISTINCT e.email, u.id, u.password FROM users u, emails e WHERE e.email=$1`;
      const result = await connection.query(sql, [u.email]);
      if (result.rows.length) {
        const { id, password: hash } = result.rows[0];
        const check = await comparePassword(u.password, hash);
        if (check) {
          const sql = `SELECT DISTINCT u.id, u.username, e.email FROM users u, emails e WHERE u.id=$1 AND e.user_id=$1`;
          const result = await connection.query(sql, [id]);
          connection.release();
          return result.rows[0];
        } else {
          connection.release();
          throw new Error('Username or password is incorrect.');
        }
      }
      connection.release();
      throw new Error("Email does'nt exist.");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async authMe(id: string): Promise<UserType> {
    try {
      const connection = await database.connect();
      const sql = `SELECT DISTINCT u.id, u.username, e.email FROM users u, emails e WHERE u.id=$1 AND e.user_id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
export default User;
