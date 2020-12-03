// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// csv_writer.js (c) 2020
// Desc: Helper module to save results in csv
// Created:  Fri Dec 04 2020 02:46:16 GMT+0530 (India Standard Time)
// Modified: Fri Dec 04 2020 03:29:21 GMT+0530 (India Standard Time)
// 

const { OUT_FILE_NAME } = require("../constants");

const csvWriter = require('csv-write-stream');
const fs = require('fs');
 
const writer = csvWriter({ headers: [
    'Date', 'Shift', 'Total',
    'Accounts', 'Max balance', 'Richest',
    'Top 5% wealth', 'Top 5% ownership', 'Top 5% accounts',
    'Top 10% wealth', 'Top 10% ownership', 'Top 10% accounts',
    'Top 25% wealth', 'Top 25% ownership', 'Top 25% accounts',
    'Top 50% wealth', 'Top 50% ownership', 'Top 50% accounts'] });

writer.pipe(fs.createWriteStream(OUT_FILE_NAME + '.csv'));

const write = (data) => {
    writer.write(data);
}

const close = () => {
    writer.end();
}

module.exports = {
    write,
    close
}