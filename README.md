# TIMECLOCK

A simple tool to track you time

## Install

```bash
git clone https://github.com/intervalia/timeclock.git
cd timeclock
npm i
npm link
```

The `npm link` will make the following commands global:

* `clockin` - Start the time for this session of work.

* `clockout <"description of what was done">` - End the time for this session and save the optional comment of what was done during this session

* `showtime` - Show the totals and commets for the last 8 days saved in the system

### Comments

The optional comments that can be provided with `clockout` can be one line or many. You must wrap you comments in double quotes:
```bash
clockout "This is my comment"
```

or this:

```bash
clockout "This is the first line.
This is the second line.
And the third line"
```

### Output from `showtime`

`showtime` displays each of the last 8 recorded days time tracked and comments. Here is an example of the output:

```
Total for 2021-01-18: 2.70
 - Meeting with John and Sandy. Got my system set up and installed the sample database.
Total for 2021-01-20: 6.29
 - Continue to get things set up.
 - Got access to Github.
 - Downloaded the repos we are using.
 - Worked with Sandy to get the repos running.
 - Trying to figure out why PrimaryRepo will not run for me.
```

> All comments for a single day and every linefeed you supply in the comments will show as a line with a dash.

## How it works

Timeclock saves all of the information into a JSON file called `timeclock.json` in the root folder of the timeclock repo. You can manually edit and adjust anything you may have done wrong by editing this JSON file.

## Known bugs

* If you start working on one day and try to `clockout` on the next calendar day (a time past midnight) the it will not clock you out. Until this is fixed, the best thing to do is to `clockin`. Then edit the JSON file and move your new `"in"` value to be used as the `"out"` value for the previous day and add a `"comment"` of what you did. Then delete the new day's entry.