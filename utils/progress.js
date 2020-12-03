// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// progress.js (c) 2020
// Desc: Helper module to show progress bar in CLI
// Created:  Fri Dec 04 2020 02:25:07 GMT+0530 (India Standard Time)
// Modified: Fri Dec 04 2020 03:29:43 GMT+0530 (India Standard Time)
// 
const cliProgress = require('cli-progress');
const { OUT_FILE_NAME } = require("../constants");
const { close } = require("./csv_writer");

const path = require('path');

const bar = new cliProgress.SingleBar({
    format: 'Progress [{bar}] {percentage}%'
}, cliProgress.Presets.shades_classic);

let max_value = null;
let progress = 0;

const tick = () => {
    bar.update(++progress);
    if (max_value !== null && progress === max_value) {
        // Progress completed
        bar.stop();
        // Close csv writer
        close();
        console.log('Done!');
        console.log(`See the results ==> ${path.join(__dirname,OUT_FILE_NAME + '.csv')}`);
    }
}
const start = (_max_value) => {
    max_value = _max_value;
    bar.start(max_value, 0);
}

module.exports = {
    start,
    tick
}