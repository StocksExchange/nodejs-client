'use strict';

const request = require('request'),
    httpBuildQuery = require('http-build-query');

class PublicMethodsApiV3 {

    constructor(options, url) {
        this.options = options;
        this.url = url;
        this.parent_url = url;
    }

    publicPing(cb) {
        this.url = this.parent_url + '/public/ping';
        this.request({}, (res) => cb(res))
    }

    publicTwitter(cb) {
        this.url = this.parent_url + '/public/twitter';
        this.request({}, (res) => cb(res))
    }

    publicChart(currencyPairId, candlesType, params, cb) {
        this.url = this.parent_url + '/public/chart/' + currencyPairId + '/' + candlesType;
        this.request(params, (res) => cb(res))
    }

    publicOrderbook(currencyPairId, params, cb) {
        this.url = this.parent_url + '/public/orderbook/' + currencyPairId;
        this.request(params, (res) => cb(res))
    }

    publicTrades(currencyPairId, params, cb) {
        this.url = this.parent_url + '/public/trades/' + currencyPairId;
        this.request(params, (res) => cb(res))
    }

    publicTicker(currencyPairId, cb) {
        this.url = this.parent_url + '/public/ticker/' + currencyPairId;
        this.request({}, (res) => cb(res))
    }

    allPublicTicker(cb) {
        this.url = this.parent_url + '/public/ticker';
        this.request({}, (res) => cb(res))
    }

    publicCurrencyPairsById(currencyPairId, cb) {
        this.url = this.parent_url + '/public/currency_pairs/' + currencyPairId;
        this.request({}, (res) => cb(res))
    }

    publicCurrencyPairsListByCode(code, cb) {
        this.url = this.parent_url + '/public/currency_pairs/list/' + code;
        this.request({}, (res) => cb(res))
    }

    publicMarkets(cb) {
        this.url = this.parent_url + '/public/markets';
        this.request({}, (res) => cb(res))
    }

    publicCurrencyById(currencyId, cb) {
        this.url = this.parent_url + '/public/currencies/' + currencyId;
        this.request({}, (res) => cb(res))
    }

    publicCurrency(cb) {
        this.url = this.parent_url + '/public/currencies';
        this.request({}, (res) => cb(res))
    }

    request(params, callback, method = 'GET', type = 'url') {
        var options, url, self = this;
        var data = params || {};
        var post_data = httpBuildQuery(data);

        url = self.url + (post_data === '' ? '' : '?' + post_data);
        options = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'stocks.exchange-client'
            },
            url: url
        };

        if (type === 'form') {
            options.form = data;
            options.url = self.url;
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }

        request(options, function (err, res, body) {
            return callback(body)
        });
    }
}

module.exports = PublicMethodsApiV3;
