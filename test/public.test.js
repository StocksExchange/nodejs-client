'use strict';

const StocksExchange = require('../lib/stocks-exchange-client');
const expect  = require("chai").expect;

const se = new StocksExchange({
    tokenObject: {
        access_token: null,
        refresh_token: null
    }
}, null);

function publicPing() {
    return new Promise((resolve) => {
        se.publicPing((res) => resolve(res));
    })
}

function publicTwitter() {
    return new Promise((resolve) => {
        se.publicTwitter((res) => resolve(res));
    })
}

describe('Check Public Methods', () => {
    it('methods PING', async () => {
        const res = await publicPing().then((res) => res)
        const ping = JSON.parse(res);
        expect(ping.success).to.eql(true)
        expect(ping.data).to.be.an('Object')
        expect(ping.data).to.have.own.property('server_datetime');
        expect(ping.data).to.have.own.property('server_timestamp');
    })

    it('methods TWITTER', async () => {
        const res = await publicTwitter().then((res) => res)
        const ping = JSON.parse(res);
        expect(ping.success).to.eql(true)
        expect(ping.data).to.be.an('Array')
        expect(ping.data[0]).to.have.own.property('name');
        expect(ping.data[0]).to.have.own.property('twit_link');
    })
})