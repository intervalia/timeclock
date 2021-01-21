#!/usr/bin/env node
require('colors');
const { read, write, getKey } = require('./timeclock');

const data = read();
const now = new Date();
const key = getKey(now);

data[key] = data[key] || [];
const len = data[key].length-1;
const val = data[key][len];

if (val && !val.out) {
  console.log(`Already clocked in. You must clock out before you can clock in.`.bold.red);
  return;
}

console.log(`Clock in at ${now}`.green);
data[key].push({in: now.valueOf()});

write(data);