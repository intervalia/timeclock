#!/usr/bin/env node
require('colors');
const { read, write, getKey, toHours } = require('./timeclock');

const now = new Date();
const data = read();
const key = getKey(now);
data[key] = data[key] || [];
const len = data[key].length-1;
const val = data[key][len];

if (val == null) {
  console.log(`You must clock in before you can clock out.`.bold.red);
  return;
}
if (val.out) {
  console.log(`Already clocked out. You must clock in before you can clock out.`.bold.red);
  return;
}

console.log(`Clock out at ${now}`.green);
val.out = now.valueOf();
const comment = process.argv[2];
if (comment) {
  val.comment = comment;
}

data[key][len] = val;

const total = data[key].reduce((acc, item) => {
  acc += (item.out - item.in);
  return acc;
}, 0);
console.log(`Total for the day:`.brightWhite, toHours(total).brightYellow);
write(data);
