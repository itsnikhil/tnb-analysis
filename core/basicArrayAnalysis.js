// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// basicArrayAnalysis.js (c) 2020
// Desc: Calculates total coins, accounts and max_balance then calls to process Wealth
// Created:  Fri Dec 04 2020 01:19:45 GMT+0530 (India Standard Time)
// Modified: Fri Dec 04 2020 11:49:51 GMT+0530 (India Standard Time)
// 

const { tick } = require("../utils/progress");

const { ACCOUNTS_TO_SKIP, DIR } = require("../constants");
const { analyse } = require("./processObject");

const { chain } = require('stream-chain');

const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/streamArray');

const fs = require('fs');

const aggregate = (file) => {
    let total = 0;
    let max_balance = 0;
    let rich_account = '';
    let n_accounts = 0;

    // Streamable json file 
    const pipeline = chain([
        fs.createReadStream(DIR + file),
        parser(),
        streamArray()
    ]);

    pipeline.on('error', error => console.log(error));
    
    // Process each account object in json
    pipeline.on('data', (data) => {
        if (ACCOUNTS_TO_SKIP.includes(data.value.account_number)) return
        ++n_accounts;
        total += data.value.balance;
        if (data.value.balance > max_balance) { max_balance = data.value.balance; rich_account = data.value.account_number; };
    });

    // Calculate and print totals on completion
    pipeline.on('end', () => {
        // console.log(`Total: ${total} coins (${n_accounts} accounts)\nRichest account: ${rich_account} (${max_balance} coins)`);
        tick();
        analyse(file, total, n_accounts, max_balance, rich_account);
    });
}

module.exports = {
    aggregate
}