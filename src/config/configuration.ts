export default () => ({
  port: parseInt(process.env.PORT, 10) || 4040,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  multerDist: process.env.MULTER_DEST,
});
