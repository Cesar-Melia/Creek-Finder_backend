const getIndex = (req, res, next) => {
  return res.status(200).json('Creek Finder API');
};

module.exports = getIndex;
