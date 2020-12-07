// 
// Author: Nikhil Taneja (tanejstr.nikhil03@gmail.com)
// dateutils.js (c) 2020
// Desc: description
// Created:  Tue Dec 08 2020 01:08:54 GMT+0530 (India Standard Time)
// Modified: Tue Dec 08 2020 01:28:20 GMT+0530 (India Standard Time)
// 

const padDigits = (number, digits) => {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

const getUTCNow = () => {
    let d = new Date();
    return `${d.getUTCFullYear()}${padDigits(d.getUTCMonth()+1,2)}${padDigits(d.getUTCDate(),2)}`
}

const dateToNum = (str) => {
    return `${str.substring(0,4)}${str.substring(5,7)}${str.substring(8,10)}${str.substring(11,13)}${str.substring(14,16)}${str.substring(17,19)}`
}

module.exports = {
    dateToNum,
    getUTCNow
}