require('dotenv').config({
    path: process.env.NODE_ENV !== 'development' ? '.env.test' : '.env'
});

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './__tests__/database.sqlite',
  logging: false,
  define : {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};