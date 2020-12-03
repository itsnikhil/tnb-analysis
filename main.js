// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// main.js (c) 2020
// Desc: Basic analytics for thenewboston 
// Created:  Thu Dec 03 2020 01:41:10 GMT+0530 (India Standard Time)
// Modified: Fri Dec 04 2020 03:27:40 GMT+0530 (India Standard Time)
// 

const { DIR } = require("./constants");
const { start } = require("./utils/progress");
const { aggregate } = require("./core/basicObjectAnalysis");

const fs = require('fs');

fs.readdir(DIR, (err, files) => {
    if (err) {
        throw err;
    }

    // Start progress bar
    start(2*files.length);
    
    // files object contains all files names
    files.forEach(file => {
        aggregate(file);
    });
});