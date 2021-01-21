#!/usr/bin/env node
require('colors');
const { read, toHours } = require('./timeclock');
const data = read();

const days = Object.entries(data).slice(-8);
if (days.length > 0) {
  days.forEach(([date, val]) => {
    let loggedIn = '';
    const comments = [];
    const total = val.reduce((acc, item) => {
      if (item.out && item.in) {
        acc += (item.out - item.in);
      }
      else {
        const loggedInTime = Date.now() - item.in;
        loggedIn = `Logged in since ${(new Date(item.in)).toLocaleString()} - (${toHours(loggedInTime)} hours)`.yellow;
      }

      if (item.comment) {
        comments.push(...item.comment.split('\n'));
      }
      return acc;
    }, 0);
    console.log(`Total for ${date}:`.brightWhite, toHours(total).brightYellow);
    comments.forEach((comment) => {
      console.log(` - ${comment.cyan}`);
    });
    if (loggedIn) {
      console.log(loggedIn);
    }
  });
}
else {
  console.log('No data at this time'.yellow);
}