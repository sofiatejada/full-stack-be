import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import caughtController from './controllers/caughtController.js';
import favoritesController from './controllers/favoritesController.js';
import seenController from './controllers/seenController.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/caught', caughtController);
app.use('/api/v1/favorites', favoritesController);
app.use('/api/v1/seen', seenController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
