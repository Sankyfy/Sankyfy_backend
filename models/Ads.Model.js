// models/FriooAd.js
import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  videolink: {
    type: String,
    required: false
  },
  imagelink: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: false
  }
});

const Ads = mongoose.model('Ads', AdSchema);

export default Ads;