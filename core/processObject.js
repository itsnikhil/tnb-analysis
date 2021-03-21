// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// processObject.js (c) 2020
// Desc: Process object data for analysis
// Created:  Fri Dec 04 2020 00:43:14 GMT+0530 (India Standard Time)
// Modified: Mon Dec 07 2020 16:38:48 GMT+0530 (India Standard Time)
// 

const { tick } = require("../utils/progress");
const { write } = require("../utils/csv_writer");

const { ACCOUNTS_TO_SKIP, DIR } = require("../constants");
const { analyse: analyseArray } = require("./processArray");

const { chain } = require('stream-chain');

const { parser } = require('stream-json');
const { streamObject } = require('stream-json/streamers/StreamObject');

const fs = require('fs');
const path = require('path');

const SortedSet = require('js-sorted-set');

const analyse = (file, total, n_accounts, max_balance, rich_account) => {
    // Streamable json file 
    const pipeline = chain([
        fs.createReadStream(DIR + file),
        parser(),
        streamObject()
    ]);

    // Data structure to maintain wealth of top 50%
    let top50 = new SortedSet({
        comparator: function (a, b) {
            return (b.bal - a.bal)
            // if (a.bal !== b.bal) return (b.bal - a.bal)
            // else return a.cnt - b.cnt
        }
    })

    // If data is structured as array of objects instead of object of objects
    pipeline.on('error', () => analyseArray(file, total, n_accounts, max_balance, rich_account));

    // Process each account object in json
    pipeline.on('data', (data) => {
        // Guard clause to remove outliers
        if (ACCOUNTS_TO_SKIP.includes(data.key)) return
        // Add first 50% accounts to sorted set
        if (top50.length < Math.round(50 / 100 * n_accounts)) {
            try {
                top50.insert({ bal: data.value.balance, addr: data.key });
            } catch (error) {
                // // Handle diplicate balance
                // let iterator = top50.findIterator({ bal: data.value.balance, cnt: 1 });
                // let k = 2;
                // while (iterator.next().value() != null && iterator.next().value().bal === data.value.balance) {
                //     k++;
                //     iterator = iterator.next();
                // }
                // top50.insert({ bal: data.value.balance, cnt: k });
            }
        }
        else {
            let end = top50.endIterator().previous().value();
            // Update top 50%
            if (data.value.balance > end.bal) {
                try {
                    top50.remove(end);
                    top50.insert({ bal: data.value.balance, addr: data.key });
                } catch (error) {
                    // // Handle diplicate balance
                    // let iterator = top50.findIterator({ bal: data.value.balance, cnt: 1 });
                    // let k = 2;
                    // while (iterator.next() != null && iterator.next().value() != null && iterator.next().value().bal === data.value.balance) {
                    //     k++;
                    //     iterator = iterator.next();
                    // }
                    // top50.insert({ bal: data.value.balance, cnt: k });
                }
            }
        }
    });

    // Calculate and print totals on completion
    pipeline.on('end', () => {
        try {
            // console.log(top50);
            fs.writeFileSync(path.join(__dirname, "../web/js/richlist.json"), JSON.stringify(top50.map(e => ({bal: e.bal, addr: e.addr}))))
        } catch (err) {
            console.error(err)
        }
        let top5Wealth = 0;
        let top10Wealth = 0;
        let top25Wealth = 0;
        let top50Wealth = 0;
        top50.map(function (wealth, idx) {
            // console.log(wealth);
            if (idx < Math.round(5 / 100 * n_accounts)) top5Wealth += wealth.bal;
            else if (idx < Math.round(10 / 100 * n_accounts)) top10Wealth += wealth.bal;
            else if (idx < Math.round(25 / 100 * n_accounts)) top25Wealth += wealth.bal;
            else top50Wealth += wealth.bal;
        })
        top10Wealth += top5Wealth;
        top25Wealth += top10Wealth;
        top50Wealth += top25Wealth;

        // console.log(`Total: ${total} coins (${n_accounts} accounts)\nRichest account: ${rich_account} (${max_balance} coins)`);
        // console.log(`Top 5% (${Math.round(5 / 100 * n_accounts)} accounts) wealth: ${top5Wealth} (${(top5Wealth / total).toFixed(2) * 100}%)`);
        // console.log(`Top 10% (${Math.round(10 / 100 * n_accounts)} accounts) wealth: ${top10Wealth} (${(top10Wealth / total).toFixed(2) * 100}%)`);
        // console.log(`Top 25% (${Math.round(25 / 100 * n_accounts)} accounts) wealth: ${top25Wealth} (${(top25Wealth / total).toFixed(2) * 100}%)`);
        // console.log(`Top 50% (${Math.round(50 / 100 * n_accounts)} accounts) wealth: ${top50Wealth} (${(top50Wealth / total).toFixed(2) * 100}%)`);

        // Write to CSV
        write([
            file.substring(0, file.length - 5), // Date
            0, // Shift (can be calculated in excel)
            total, // Total
            n_accounts, // Accounts
            max_balance, // Max balance
            rich_account, // Richest
            top5Wealth, // Top 5% wealth
            (top5Wealth / total), // Top 5% ownership
            Math.round(5 / 100 * n_accounts), // Top 5% accounts
            top10Wealth, // Top 10% wealth
            (top10Wealth / total), // Top 10% ownership
            Math.round(10 / 100 * n_accounts), // Top 10% accounts
            top25Wealth, // Top 25% wealth
            (top25Wealth / total), // Top 25% ownership
            Math.round(25 / 100 * n_accounts), // Top 25% accounts
            top50Wealth, // Top 50% wealth
            (top50Wealth / total), // Top 50% ownership
            Math.round(50 / 100 * n_accounts) // Top 50% accounts
        ]);
        tick();
    });
}

module.exports = {
    analyse
}