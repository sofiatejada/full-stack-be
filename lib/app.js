import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import caughtController from './controllers/caughtController';
import favoritesController from './controllers/favoritesController';
import seenController from './controllers/seenController';

const app = express();

app.use(express.json());

app.use('/api/v1/caught', caughtController);
app.use('/api/v1/favorites', favoritesController);
app.use('/api/v1/seen', seenController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
