// models/View.js
import mongoose from 'mongoose';

const viewSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
  lastViewed: {
    type: Date,
    default: Date.now,
  },
});

const View = mongoose.model('View', viewSchema);

export default View;
