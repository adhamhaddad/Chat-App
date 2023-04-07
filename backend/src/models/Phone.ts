import database from '../database';

type PhoneType = {
  phone: string;
  is_default: boolean;
  is_verified: boolean;
  user_id: string;
};

class Phone {
  async createPhone(e: PhoneType): Promise<PhoneType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO phones (phone, is_default, is_verified, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [
        e.phone,
        e.is_default,
        e.is_verified,
        e.user_id
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getPhones(id: string): Promise<PhoneType[]> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM phones WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updatePhone(id: string, e: PhoneType): Promise<PhoneType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE phones SET phone=$2, is_default=$3, is_verified=$4 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        e.phone,
        e.is_default,
        e.is_verified
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deletePhone(id: string): Promise<PhoneType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM phones WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Phone;
