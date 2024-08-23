// controllers/AdsController.js
import Ads from "../models/Ads.Model.js";


export const createAds = async (req, res) => {
  try {
    const Ads1 = new Ads(req.body);
    await Ads1.save();
    res.status(201).json({ message: 'Frioo Ad created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Frioo Ad' });
  }
};

export const getAdss = async (req, res) => {
  try {
    const Adss = await Ads.find().exec();
    res.json(Adss);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Frioo Ads' });
  }
};

export const getAds = async (req, res) => {
  try {
    const Ads1 = await Ads.findById(req.params.id).exec();
    if (!Ads1) {
      res.status(404).json({ message: 'Frioo Ad not found' });
    } else {
      res.json(Ads1);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Frioo Ad' });
  }
};

export const updateAds = async (req, res) => {
  try {
    const Ads1 = await Ads.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!Ads1) {
      res.status(404).json({ message: 'Frioo Ad not found' });
    } else {
      res.json(Ads1);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating Frioo Ad' });
  }
};

export const changeAdsStatus = async (req, res) => {
  try {
    const Ads1 = await Ads.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).exec();
    if (!Ads1) {
      res.status(404).json({ message: 'Frioo Ad not found' });
    } else {
      res.json(Ads1);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error changing Frioo Ad status' });
  }
};