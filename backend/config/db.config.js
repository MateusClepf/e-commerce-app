require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || 'db',
  USER: process.env.DB_USER || 'postgres',
  PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB: process.env.DB_NAME || 'ecommerce',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};