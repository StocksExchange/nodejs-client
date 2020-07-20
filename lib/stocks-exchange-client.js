'use strict';

const pjson = require('../package.json'),
    publicMethodV3 = require('./v3/public-methods.js'),
    privateMethodsV3 = require('./v3/private-methods.js'),
    websocketV3 = require('./v3/websocket.js'),
    tokenProvider = require('./v3/refresh.js');

class StocksExchange {
    constructor(options, url, api_version) {
        var self = this;
        self.api_version = api_version || 3;
        self.options = options || {};
        self.pjson = pjson;
        self.url = url || 'https://api3.stex.com';
        if (options.client) {
            self.client_id = options.client.id || null;
            self.client_secret = options.client.secret || null;
        }
        self.access_token = options.tokenObject.access_token || null;
        self.refresh_token = options.tokenObject.refresh_token || null;
        self.expires_in = options.tokenObject.expires_in || null;
        self.scope = options.scope || null;
        self.s2s = options.s2s || false;
        self.accessTokenUrl = options.accessTokenUrl || 'https://api3.stex.com/oauth/token';
        self.client = new tokenProvider(self.accessTokenUrl, {
            client_id: self.client_id,
            client_secret: self.client_secret,
            refresh_token: self.refresh_token,
            access_token: self.access_token,
            expires_in: self.expires_in,
            scope: self.scope,
            s2s: self.s2s
        });
        var options_new = self.options;
        var url_new = self.url;
        self.privateV2 = new privateMethodsV3(options_new, url_new, self.client);
        self.publicV2 = new publicMethodV3(options_new, url_new);
        self.websocketV3 = new websocketV3(self.client);
    }

    version() {
        return this.pjson.version
    }

    // API V3

    validOptionV3(cb) {
        this.client_id
        && this.client_secret
        && this.access_token
        && this.refresh_token
        && this.scope
        && this.accessTokenUrl ? cb(true) : cb(false);
    }

    subscribeRate(cb) {
        return this.websocketV3.subscribeRate('rate', function (res) {
            cb(res)
        });
    }

    subscribeOrderFillCreated(currency_pair_id, cb) {
        return this.websocketV3.subscribeOrderFillCreated('trade_c' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    subscribeGlassTotalChanged(currency_pair_id, type, cb) {
        return this.websocketV3.subscribeGlassTotalChanged((type || 'sell') + '_total_data' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    subscribeGlassRowChanged(currency_pair_id, type, cb) {
        return this.websocketV3.subscribeGlassRowChanged((type || 'sell') + '_data' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    subscribeBestPriceChanged(currency_pair_id, type, cb) {
        return this.websocketV3.subscribeBestPriceChanged('best_' + (type || 'bid') + '_price_' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    subscribeCandleChanged(currency_pair_id, chart_type, cb) {
        return this.websocketV3.subscribeCandleChanged('stats_data_' + (chart_type || '1') + '_' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    subscribeBalanceChanged(wallet_id, cb) {
        return this.websocketV3.subscribeBalanceChanged('private-balance_changed_w_' + wallet_id, function (res) {
            cb(res)
        });
    }

    subscribeUserOrder(user_id, currency_pair_id, type, cb) {
        return this.websocketV3.subscribeUserOrder('private-' + (type || 'sell') + '_user_data_u' + user_id + 'c' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    subscribeUserOrderDeleted(user_id, currency_pair_id, cb) {
        return this.websocketV3.subscribeUserOrderDeleted('private-del_order_u' + user_id + 'c' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    subscribeUserOrderFillCreated(user_id, currency_pair_id, cb) {
        return this.websocketV3.subscribeUserOrderFillCreated('private-trade_u' + user_id + 'c' + currency_pair_id, function (res) {
            cb(res)
        });
    }

    profileInfo(cb) {
        return this.privateV2.getProfileInfo(function (res) {
            cb(res)
        });
    }

    profileWallets(params, cb) {
        return this.privateV2.getProfileWallets(params, function (res) {
            cb(res)
        });
    }

    profileWalletsById(walletId, cb) {
        return this.privateV2.getProfileWalletsById(walletId, function (res) {
            cb(res)
        });
    }

    newProfileWalletsByCurrencyId(currencyId, cb) {
        return this.privateV2.setProfileWalletsByCurrencyId(currencyId, function (res) {
            cb(res)
        });
    }

    profileWalletsAddressById(walletId, cb) {
        return this.privateV2.getProfileWalletsAddressById(walletId, function (res) {
            cb(res)
        });
    }

    newProfileWalletsAddressById(walletId, cb) {
        return this.privateV2.setProfileWalletsAddressById(walletId, function (res) {
            cb(res)
        });
    }

    profileDeposits(params, cb) {
        return this.privateV2.getProfileDeposits(params, function (res) {
            cb(res)
        });
    }

    profileDepositsById(id, cb) {
        return this.privateV2.getProfileDepositsById(id, function (res) {
            cb(res)
        });
    }

    profileWithdrawals(params, cb) {
        return this.privateV2.getProfileWithdrawals(params, function (res) {
            cb(res)
        });
    }

    profileWithdrawalsById(id, cb) {
        return this.privateV2.getProfileWithdrawalsById(id, function (res) {
            cb(res)
        });
    }

    createProfileWithdrawals(currency_id, amount, address, additional_address, cb) {
        return this.privateV2.sendCreateProfileWithdrawals(
            currency_id,
            amount,
            address,
            additional_address, function (res) {
            cb(res)
        });
    }

    profileWithdrawalCancelById(withdrawalId, cb) {
        return this.privateV2.profileWithdrawalCancelById(withdrawalId, function (res) {
            cb(res)
        });
    }

    reportsOrders(params, cb) {
        return this.privateV2.getReportsOrders(params, function (res) {
            cb(res)
        });
    }

    reportsOrdersById(id, cb) {
        return this.privateV2.getReportsOrdersById(id, function (res) {
            cb(res)
        });
    }

    tradingOrders(cb) {
        return this.privateV2.getTradingOrders( function (res) {
            cb(res)
        });
    }

    deleteAllTradingOrders(cb) {
        return this.privateV2.deleteAllTradingOrders( function (res) {
            cb(res)
        });
    }

    tradingOrdersById(currencyPairId, cb) {
        return this.privateV2.getTradingOrdersById(currencyPairId, function (res) {
            cb(res)
        });
    }

    deleteTradingOrdersById(currencyPairId, cb) {
        return this.privateV2.deleteTradingOrdersById(currencyPairId, function (res) {
            cb(res)
        });
    }

    createTradingOrdersById(currencyPairId, params, cb) {
        return this.privateV2.createTradingOrdersById(currencyPairId, params, function (res) {
            cb(res)
        });
    }

    tradingOrderByOrderId(orderId, cb) {
        return this.privateV2.tradingOrderByOrderId(orderId, function (res) {
            cb(res)
        });
    }

    cancelTradingOrderByOrderId(orderId, cb) {
        return this.privateV2.cancelTradingOrderByOrderId(orderId, function (res) {
            cb(res)
        });
    }

    publicPing(cb) {
        return this.publicV2.publicPing(function (res) {
            cb(res)
        });
    }

    publicChart(currencyPairId, candlesType, params, cb) {
        return this.publicV2.publicChart(currencyPairId, candlesType, params, function (res) {
            cb(res)
        });
    }

    publicOrderbook(currencyPairId, params, cb) {
        return this.publicV2.publicOrderbook(currencyPairId, params, function (res) {
            cb(res)
        });
    }

    publicTrades(currencyPairId, params, cb) {
        return this.publicV2.publicTrades(currencyPairId, params, function (res) {
            cb(res)
        });
    }

    publicTicker(currencyPairId, cb) {
        return this.publicV2.publicTicker(currencyPairId, function (res) {
            cb(res)
        });
    }

    allPublicTicker(cb) {
        return this.publicV2.allPublicTicker(function (res) {
            cb(res)
        });
    }

    publicCurrencyPairsById(currencyPairId, cb) {
        return this.publicV2.publicCurrencyPairsById(currencyPairId, function (res) {
            cb(res)
        });
    }

    publicCurrencyPairsListByCode(code, cb) {
        return this.publicV2.publicCurrencyPairsListByCode(code, function (res) {
            cb(res)
        });
    }

    publicMarkets(cb) {
        return this.publicV2.publicMarkets(function (res) {
            cb(res)
        });
    }

    publicCurrencyById(currencyId, cb) {
        return this.publicV2.publicCurrencyById(currencyId, function (res) {
            cb(res)
        });
    }

    publicCurrency(cb) {
        return this.publicV2.publicCurrency(function (res) {
            cb(res)
        });
    }
}

module.exports = StocksExchange;
