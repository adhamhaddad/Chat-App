import database from '../database';

export type EmailType = {
  email: string;
  is_default: boolean;
  is_verified: boolean;
  user_id: string;
};

class Email {
  async createEmail(e: EmailType): Promise<EmailType> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO emails (email, user_id) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [e.email, e.user_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async getEmails(id: string): Promise<EmailType[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM emails WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updateEmail(id: string, e: EmailType): Promise<EmailType> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE emails SET email=$2, is_default=$3, is_verified=$4 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        e.email,
        e.is_default,
        e.is_verified
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async deleteEmail(id: string): Promise<EmailType> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM emails WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
export default Email;
