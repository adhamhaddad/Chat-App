import database from '../database';

type PictureType = {
  profile_pic: string;
  is_default: boolean;
  user_id: string;
};

class Picture {
  async createPicture(p: PictureType): Promise<PictureType> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO pictures (profile_pic, is_default, user_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        p.profile_pic,
        p.is_default,
        p.user_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async getPictures(id: string): Promise<PictureType[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM pictures WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updatePicture(id: string, p: PictureType): Promise<PictureType> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE pictures SET profile_pic=$2, is_default=$3 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        p.profile_pic,
        p.is_default
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async deletePicture(id: string): Promise<PictureType> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM pictures WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
export default Picture;
