// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// main.js (c) 2020
// Desc: Basic analytics for thenewboston 
// Created:  Thu Dec 03 2020 01:41:10 GMT+0530 (India Standard Time)
// Modified: Tue Dec 08 2020 01:31:06 GMT+0530 (India Standard Time)
// 

const { DIR } = require("./constants");
const { OUT_FILE_NAME } = require("./constants");
const { createCSVWriter } = require("./utils/csv_writer");
const { start } = require("./utils/progress");
const { aggregate } = require("./core/basicObjectAnalysis");

const fs = require('fs');

createCSVWriter( OUT_FILE_NAME+'.csv', { headers: [
    'Date', 'Shift', 'Total',
    'Accounts', 'Max balance', 'Richest',
    'Top 5% wealth', 'Top 5% ownership', 'Top 5% accounts',
    'Top 10% wealth', 'Top 10% ownership', 'Top 10% accounts',
    'Top 25% wealth', 'Top 25% ownership', 'Top 25% accounts',
    'Top 50% wealth', 'Top 50% ownership', 'Top 50% accounts'] });

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