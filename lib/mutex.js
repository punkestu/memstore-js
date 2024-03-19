var isWrite = false;
const queue = [];

const lock = async () => {
  return new Promise((r) => {
    queue.push(r);
    detach();
  });
};

const lockWrite = async () => {
  return new Promise((r) => {
    queue.push(() => {
      isWrite = true;
      r();
    });
    detach();
  });
};

const detach = () => {
  while (!isWrite && queue.length > 0) {
    queue.shift()();
  }
};

const unlock = () => {
  isWrite = false;
  detach();
};

module.exports = {
  lock,
  lockWrite,
  unlock,
};
