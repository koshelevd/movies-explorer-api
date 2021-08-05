require('dotenv').config();

const config = {
  dbPath: process.env.DB_PATH || 'mongodb://localhost:27017/bitfilmsdb',
  dbOptions: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  appPort: process.env.PORT || 3000,
  jwtSecret:
    process.env.NODE_ENV === 'production'
      ? process.env.JWT_SECRET
      : 'dev-secret',
  jwtSignOptions: {
    expiresIn: '7d',
  },
  jwtCookieOptions: {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
  },
  whitelist: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://movies.koshelev.net',
    'http://movies.koshelev.net',
  ],
};

module.exports = config;
