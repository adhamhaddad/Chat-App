import database from '../database';
import { hashPassword, comparePassword } from '../utils/password';
import { EmailType } from './Email';

type UserType = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  is_active: boolean;
};

class User {
  async createUser(u: UserType & EmailType): Promise<UserType> {
    const connection = await database.connect();
    try {
      await connection.query('BEGIN');
      const userSQL = `INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, username`;
      const emailSQL = `INSERT INTO emails (email, user_id) VALUES ($1, $2) RETURNING email`;
      const userResult = await connection.query(userSQL, [
        u.username,
        u.first_name,
        u.last_name,
        await hashPassword(u.password)
      ]);
      const { id } = userResult.rows[0];
      const emailResult = await connection.query(emailSQL, [u.email, id]);
      await connection.query('COMMIT');
      return { ...userResult.rows[0], ...emailResult.rows[0] };
    } catch (error) {
      await connection.query('ROLLBACK');
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getUsers(): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `SELECT id, username, first_name, last_name FROM users`;
      const result = await connection.query(sql);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getUser(id: string): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `SELECT id, username, first_name, last_name FROM users WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateUser(id: string, u: UserType): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE users SET username=$2, first_name=$3, last_name=$5 WHERE id=$1 RETURNING username, first_name, last_name`;
      const result = await connection.query(sql, [
        id,
        u.username,
        u.first_name,
        u.last_name
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updatePassword(id: string, u: UserType): Promise<boolean> {
    const connection = await database.connect();
    try {
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
          if (result.rows.length) return true;
          return false;
        } else {
          throw new Error("Old password does'nt match");
        }
      }
      return false;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deactivateUser(id: string): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE users SET is_active=FALSE WHERE id=$1 RETURNING is_active`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteUser(id: string): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM users WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async authUser(u: UserType & EmailType): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `SELECT DISTINCT e.email, u.id, u.username, u.password FROM users u, emails e WHERE e.user_id=u.id AND e.email=$1`;
      const result = await connection.query(sql, [u.email]);
      if (result.rows.length) {
        const { id, username, email, password: hash } = result.rows[0];
        const check = await comparePassword(u.password, hash);
        if (check) {
          return { id, username, email } as EmailType & UserType;
        } else {
          throw new Error('Username or password is incorrect.');
        }
      }
      throw new Error("Email does'nt exist.");
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async authMe(id: string): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `SELECT DISTINCT u.id, u.username, e.email FROM users u, emails e WHERE u.id=$1 AND e.user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default User;
