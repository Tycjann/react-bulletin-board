const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await User.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const usr = await User.findById(req.params.id);
    if (!usr) res.status(404).json({ message: 'Not found' });
    else res.json(usr);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { admin, master, email, name, addDate } = req.body;
    const newUser = new User({
      admin: admin,
      master: master,
      email: email,
      name: name,
      addDate: addDate,
    });
    await newUser.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const { admin, master, email, name } = req.body;
  try {
    const usr = await User.findById(req.params.id);
    if (usr) {
      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            admin: admin,
            master: master,
            email: email,
            name: name
          },
        }
      );
      res.json({ message: 'OK' });
      res.json(usr);
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const usr = await User.findById(req.params.id);
    if (usr) {
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};