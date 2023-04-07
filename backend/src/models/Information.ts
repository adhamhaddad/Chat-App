import database from '../database';

enum user_status {
  'online',
  'offline',
  'away',
  'do_not_disturb'
}
type InformationType = {
  id: string;
  about: string;
  status: user_status;
  role: string;
  user_id: string;
};

class Information {
  async createInformation(i: InformationType): Promise<InformationType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO information (about, status, role, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [
        i.about,
        i.status,
        i.role,
        i.user_id
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getInformation(id: string): Promise<InformationType> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM information WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateInformation(
    id: string,
    i: InformationType
  ): Promise<InformationType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE information SET about=$2, status=$3, role=$4 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        i.about,
        i.status,
        i.role
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteInformation(id: string): Promise<InformationType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM information WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Information;
