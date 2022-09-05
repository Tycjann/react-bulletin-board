const Status = require('../models/status.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Status.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const sta = await Status.findById(req.params.id);
    if (!sta) res.status(404).json({ message: 'Not found' });
    else res.json(sta);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};