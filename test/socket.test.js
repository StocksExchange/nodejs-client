'use strict';

const StocksExchange = require('../lib/stocks-exchange-client');
const expect = require("chai").expect;

const se = new StocksExchange({
    tokenObject: {
        access_token: null,
        refresh_token: null
    }
}, null);

describe('Check Sockets Public Methods', () => {
    it('methods Rate', (done) => {
        se.subscribeRate((res) => {
            expect(res).to.have.own.property('lastPriceDayAgo');
            done();
        })
    })
})