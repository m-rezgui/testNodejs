const NodeCache = require('node-cache');
let cache = null;

exports.start = (done) => {
  if (cache) return done();

  cache = new NodeCache();
};

exports.instance = () => {
  return cache;
};
