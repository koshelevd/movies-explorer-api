require('dotenv').config();

const config = {
  dbPath: process.env.DB_PATH || 'mongodb://localhost:27017/bitfilmsdb',
  appPort: process.env.PORT || 3000,
  jwtSecret:
    process.env.NODE_ENV === 'production'
      ? process.env.JWT_SECRET
      : 'dev-secret',
};

module.exports = config;
