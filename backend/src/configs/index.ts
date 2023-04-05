import dotenv from 'dotenv';
dotenv.config();

const configs = {
  env: process.env.ENV,
  port: Number(process.env.PORT),
  db_uri: process.env.POSTGRES_URI,
  db_port: Number(process.env.POSTGRES_PORT),
  db_name: process.env.POSTGRES_DB,
  db_user: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  peper: process.env.SECRET_PEPER as string,
  salt: Number(process.env.SALT_ROUNDS),
  jwt_access_token: process.env.JWT_SECRET_ACCESS_TOKEN as string,
  jwt_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN as string,
  jwt_access_expire: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  jwt_refresh_expire: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  frontend_host: process.env.FRONTEND_HOST,
  backend_host: process.env.BACKEND_HOST
};
export default configs;
