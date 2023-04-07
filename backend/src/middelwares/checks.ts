import { Request, Response, NextFunction } from 'express';
import database from '../database';

export const checkIfExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;
  try {
    const connection = await database.connect();
    // Check if username exists
    const usernameSQL = 'SELECT username FROM users WHERE username=$1';
    const usernameResult = await connection.query(usernameSQL, [username]);
    // Check if email exists
    const emailSQL = 'SELECT email FROM emails WHERE email=$1';
    const emailResult = await connection.query(emailSQL, [email]);
    connection.release();

    const error = {
      username: {
        msg: usernameResult.rows.length
          ? 'This username is already in use.'
          : null
      },
      email: {
        msg: emailResult.rows.length ? 'This email is already in use.' : null
      }
    };
    if (error.username.msg !== null || error.email.msg !== null) {
      return res.status(200).json({
        error: error
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      err: error
    });
  }
};
