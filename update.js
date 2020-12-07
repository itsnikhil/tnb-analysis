// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// update.js (c) 2020
// Desc: description
// Created:  Tue Dec 08 2020 00:58:43 GMT+0530 (India Standard Time)
// Modified: Tue Dec 08 2020 01:32:58 GMT+0530 (India Standard Time)
// 

const { DIR } = require("./constants");
const { OUT_FILE_NAME } = require("./constants");
const { updateCSVWriter } = require("./utils/csv_writer");
const { dateToNum, getUTCNow } = require("./utils/dateutils");
const { start } = require("./utils/progress");
const { aggregate } = require("./core/basicObjectAnalysis");

const fs = require('fs');

updateCSVWriter( OUT_FILE_NAME+'.csv');

const reducer = (arr) => arr.reduce((a, b) => dateToNum(a) > dateToNum(b) ? a : b);

fs.readdir(DIR, (err, files) => {
    if (err) {
        throw err;
    }
    
    let latest_file = (reducer(files));

    console.log(dateToNum(latest_file).substring(0,8),getUTCNow());

    if (dateToNum(latest_file).substring(0,8) === getUTCNow()){
        start(2);
        aggregate(latest_file);
    }
    else console.log('Nothing to update!');
});