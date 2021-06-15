'use strict';

const StocksExchange = require('../lib/stocks-exchange-client');
const pjson = require('../package.json');
const expect  = require("chai").expect;

const se = new StocksExchange({
    tokenObject: {
        access_token: null,
        refresh_token: null
    }
}, null);

it("version checking", function () {
    expect(pjson.version).to.equal(se.version())
});