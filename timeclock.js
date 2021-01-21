const fname = `${__dirname}/timeclock.json`;
const fs = require('fs');

const getKey = now => `${now.getFullYear()}-${two(now.getMonth()+1)}-${two(now.getDate())}`;

function read() {
  let data;

  try {
    data = JSON.parse(fs.readFileSync(fname, 'utf8'));
  }

  catch(ex) {
    data = {};
  }

  return data;
}

const toHours = t => (t/3600000).toFixed(2);

const two = num => `0${num}`.slice(-2);

function write(data) {
  fs.writeFileSync(fname, JSON.stringify(data,0,2), 'utf8');
}

module.exports = {
  getKey,
  read,
  toHours,
  two,
  write
};