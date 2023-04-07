import database from '../database';

type PictureType = {
  avatar: string;
  is_default: boolean;
  user_id: string;
};

class Picture {
  async createPicture(p: PictureType): Promise<PictureType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO pictures (avatar, is_default, user_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        p.avatar,
        p.is_default,
        p.user_id
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getPictures(id: string): Promise<PictureType[]> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM pictures WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updatePicture(id: string, p: PictureType): Promise<PictureType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE pictures SET avatar=$2, is_default=$3 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, p.avatar, p.is_default]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deletePicture(id: string): Promise<PictureType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM pictures WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Picture;
