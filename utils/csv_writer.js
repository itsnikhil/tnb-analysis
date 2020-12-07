// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// csv_writer.js (c) 2020
// Desc: Helper module to save results in csv
// Created:  Fri Dec 04 2020 02:46:16 GMT+0530 (India Standard Time)
// Modified: Tue Dec 08 2020 03:04:43 GMT+0530 (India Standard Time)
// 

const csvWriter = require('csv-write-stream');
const fs = require('fs');

let writer = null;

const createCSVWriter = (file, options) => {
    if (writer !== null) throw new Error('Writer is already defined!');
    writer = csvWriter(options);
    writer.pipe(fs.createWriteStream(file));
}

const updateCSVWriter = (file) => {
    if (writer !== null) throw new Error('Writer is already defined!');
    if (!fs.existsSync(file)) throw new Error('File not found!');
    writer = csvWriter(sendHeaders: false);
    writer.pipe(fs.createWriteStream(file, {flags: 'a'}))
}

const write = (data) => {
    if (writer === null) throw new Error('Writer is not defined. Please call create_csv() or update_csv()');
    writer.write({
        'Date': data[0],
        'Shift': data[1],
        'Total': data[2],
        'Accounts': data[3],
        'Max balance': data[4],
        'Richest': data[5],
        'Top 5% wealth': data[6],
        'Top 5% ownership': data[7],
        'Top 5% accounts': data[8],
        'Top 10% wealth': data[9],
        'Top 10% ownership': data[10],
        'Top 10% accounts': data[11],
        'Top 25% wealth': data[12],
        'Top 25% ownership': data[13],
        'Top 25% accounts': data[14],
        'Top 50% wealth': data[15],
        'Top 50% ownership': data[16],
        'Top 50% accounts': data[17]
    });
}

const close = () => {
    if (writer === null) throw new Error('Writer is not defined. Please call create_csv() or update_csv()');
    writer.end();
}

module.exports = {
    createCSVWriter,
    updateCSVWriter,
    write,
    close
}