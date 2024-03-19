const mutex = require("./mutex");
const data = [];

const set = (key, value) => {
  data[key] = value;
};
const get = (key) => {
  return data[key];
};

module.exports = {
  set,
  get,
  mutex,
};
