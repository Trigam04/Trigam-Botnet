const seedrandom = require('seedrandom');
const ut = require('./utilitrigam.js');
const logins = require('../pools/start.json');
const gex = require('../pools/quotes/gex.json');
const krabs = require('../pools/quotes/krabs.json');
const maui = require('../pools/quotes/maui.json');
const sans = require('../pools/quotes/sans.json');
const papyrus = require('../pools/quotes/papyrus.json');
const shrek = require('../pools/quotes/shrek.json');
const vector = require('../pools/quotes/vector.json');
const ping = require('../pools/ping.json');
module.exports = {
    login: (seed) => { return ut.randomElem(logins, seed) },
    // Quote
    gex: (seed) => { return ut.randomElem(gex, seed) },
    krabs: (seed) => { return ut.randomElem(krabs, seed) },
    maui: (seed) => { return ut.randomElem(maui, seed) },
    sans: (seed) => { return ut.randomElem(sans, seed) },
    papyrus: (seed) => { return ut.randomElem(papyrus, seed) },
    shrek: (seed) => { return ut.randomElem(shrek, seed) },
    vector: (seed) => { return ut.randomElem(vector, seed) },
    // Ping
    pingGeneral: (seed) => { return ut.randomElem(ping.general, seed) },
    pingVeryLow: (seed) => { return ut.randomElem(ping.veryLow, seed) },
    pingLow: (seed) => { return ut.randomElem(ping.low, seed) },
    pingMedium: (seed) => { return ut.randomElem(ping.medium, seed) },
    pingHigh: (seed) => { return ut.randomElem(ping.high, seed) },
    pingVeryHigh: (seed) => { return ut.randomElem(ping.veryHigh, seed) },
}