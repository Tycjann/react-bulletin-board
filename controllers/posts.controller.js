const Post = require('../models/post.model');

exports.getAll = async (req, res) => {
  try {
    res.json(
      await Post
        .find()
        // .find({ statusId: '2' })
        .populate('authorId')
        .populate('statusId')
        .select('id title authorId.name publishedDate price content')
        .sort({ publishedDate: -1 })
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const pos = await Post.findById(req.params.id).populate('authorId').populate('statusId');
    if (!pos) res.status(404).json({ message: 'Not found' });
    else res.json(pos);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { title, authorId, statusId, price, telephone, content, publishedDate } = req.body;
    const newPost = new Post({
      title: title,
      authorId: authorId,
      statusId: statusId,
      price: price,
      telephone: telephone,
      content: content,
      publishedDate: publishedDate,
    });
    await newPost.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const { title, authorId, statusId, price, telephone, content, editDate } = req.body;
  try {
    let pos = await Post.findById(req.params.id);
    if (pos) {
      await Post.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            authorId: authorId,
            statusId: statusId,
            price: price,
            telephone: telephone,
            content: content,
            editDate: editDate,
          },
        }
      );
      // res.json({ message: 'OK' });
      pos = await Post.findById(req.params.id);
      res.json(pos);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const pos = await Post.findById(req.params.id);
    if (pos) {
      await Post.deleteOne({ _id: req.params.id });
      // res.json({ message: 'OK' });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
