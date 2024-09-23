import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import bodyParser from 'body-parser';
import eventRouter from './routes/eventRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/events', eventRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${PORT}`);
});
