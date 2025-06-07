import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { db } from './config/db';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes';

const app = express();

//For Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// For Routes
app.use('/api', routes);

// For Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
