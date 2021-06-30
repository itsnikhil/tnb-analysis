// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// constants.js (c) 2020
// Desc: Configuration file
// Created:  Fri Dec 04 2020 00:44:29 GMT+0530 (India Standard Time)
// Modified: Wed Dec 16 2020 16:20:56 GMT+0530 (India Standard Time)
// 

const DIR = 'account_backups/';
const OUT_FILE_NAME = 'out';

// Outliers
const ACCOUNTS_TO_SKIP = [
    "23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5", //TREASURY (new)
    "6ad6deef2a65642a130fb081dacc2010c7521678986ed44b53a845bc00dd3924", //TREASURY
    "9bfa37627e2dba0ae48165b219e76ceaba036b3db8e84108af73a1cce01fad35", //TREASURY (old)
    "f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535", // Payments (Taiwo Odetola)
    "addf211d203c077bc5c6b78f41ddc68481804539de4bd3fd736fa853514551c0", // Payments (Rajput Usman)
    "c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d", // Payments (Nikhil Taneja)
    "9cb647da9ea1445c361e6d734a6ee0fce4896230392947713686697dd586495b", // Payments (Tawanda Makunike)
    "0d304450eae6b5094240cc58b008066316d9f641878d9af9dd70885f065913a0", // Held lot of value in past, now has 0
    "ca85c141c945866dd32af37ad669855458eb3f9e5d1a4530d852c3c745de11a7", // Held lot of value in past, now has 0
    "a7381dce0249efc26130dd226ecc0df3154009a0210adc4cac869e4a2cb92d65", // Held lot of value in past, now has 0
    "0c9e43fd6630e213a088bf816425c294248ae496129dadb03137c151a2a22ff6", // Held lot of value in past, now has 0
    "0000000000000000000000000000000000000000000000000000000000000000", // TREASURY burnt dump account
    "7658a980ecc4458bad84be5bb239968cf7be96fa18a1197bef3d62f9b93e5410"  // Faucet account 
]

module.exports = {
    DIR,
    OUT_FILE_NAME,
    ACCOUNTS_TO_SKIP
}
