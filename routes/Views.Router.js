// routes/viewRoutes.js
import express from 'express';
import { getViewCount, incrementView } from '../controllers/Views.Controller.js';


const ViewsRouter = express.Router();

ViewsRouter.get('/increment', incrementView);
ViewsRouter.get('/count', getViewCount);

export default ViewsRouter;
