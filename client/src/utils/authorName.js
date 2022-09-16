const authorName = (name) => {

  let author = '';
  name === undefined ? (author = 'undefined') : (author = name);

  return author;
};

export default authorName;
