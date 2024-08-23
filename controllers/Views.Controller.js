// controllers/viewController.js

import View from "../models/Views.Model.js";


// Increment view count
export const incrementView = async (req, res) => {
  try {
    let view = await View.findOne();

    if (!view) {
      view = new View({ count: 1 });
    } else {
      view.count += 1;
      view.lastViewed = Date.now();
    }

    await view.save();

    res.status(200).json(view);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get total view count
export const getViewCount = async (req, res) => {
  try {
    const view = await View.findOne();

    if (!view) {
      return res.status(404).json({ message: 'No views recorded yet' });
    }

    res.status(200).json(view);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
