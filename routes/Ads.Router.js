import express from 'express';
import { changeAdsStatus, createAds, getAds, getAdss, updateAds } from '../controllers/Ads.Controller.js';


const AdsRouter = express.Router();
AdsRouter.post('/create', createAds);
AdsRouter.get('/all', getAdss);
AdsRouter.get('/:id', getAds);
AdsRouter.put('/:id/update',updateAds);
AdsRouter.put('/:id/status', changeAdsStatus);

export default AdsRouter;
