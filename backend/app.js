const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const appRouter = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://mestofront.nomoredomainsmonster.ru',
  credentials: true,
}));
app.use(cookieParser());
mongoose.connect(MONGO_URL);
app.use(requestLogger);
app.use(appRouter);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
