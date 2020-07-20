# STEX (former Stocks.Exchange)  (Node JS API client)
STEX (former Stocks.Exchange) provides all the core exchange functionality, and additional merchant tools available via the HTTP API where all returned messages are in JSON. It's much easier to work with the API by using one of the clients provided by STEX, so while this page describes the API in case you want or need to build your own client, the examples use the Node JS client.

[![NPM](https://nodei.co/npm/stocks-exchange-client.png?compact=false)](https://npmjs.org/package/stocks-exchange-client)

## Requirements
- Node.js
- npm (Node.js package manager)
## Dependent Libraries
- "crypto-js": "^3.1.9-1",
- "fs": "0.0.1-security",
- "http-build-query": "^0.7.0",
- "jsonfile": "^5.0.0",
- "pkg": "^4.3.3",
- "request": "^2.87.0"

## General
The base URL for all the requests other than public methods is 
```
https://api3.stex.com
```

## Getting started
- [Sandbox API](https://apidocs.stex.com)

To get started with the Node JS API client, here's a snippet for creating a client with existing credentials:
> In order to use the API functions, you must have an API key and API secret, which is generated in the user profile.

## Usage
```bash
npm install stocks-exchange-client --save
```

After install use for example this code!

### Example WebSocket API
```javascript
const StocksExchange = require('stocks-exchange-client').client;
const option = {
    client: {
        id: '',
        secret: ''
    },
    tokenObject: {
        'access_token': '',
        'refresh_token': '',
    },
    accessTokenUrl: 'https://api3.stex.com/oauth/token',
    scope: 'trade profile reports withdrawal',
};
const se = new StocksExchange(option, null);
se.subscribeOrderFillCreated(702,function (res) {
    console.log('subscribeOrderFillCreated', res);
});

se.subscribeGlassTotalChanged(702, 'buy', function (res) {
    console.log('subscribeGlassTotalChanged', res);
});

se.subscribeGlassRowChanged(702, 'sell', function (res) {
    console.log('subscribeGlassRowChanged', res);
});

se.subscribeBestPriceChanged(702, 'ask', function (res) {
    console.log('subscribeBestPriceChanged', res);
});

se.subscribeCandleChanged(702, '1', function (res) {
    console.log('subscribeCandleChanged', res);
});

se.subscribeBalanceChanged(1, function (res) {
    console.log('subscribeBalanceChanged', res);
});

se.subscribeUserOrder(0, 702, 'sell', function (res) {
    console.log('subscribeUserOrder', res);
});

se.subscribeUserOrderDeleted(0, 702, function (res) {
    console.log('subscribeUserOrderDeleted', res);
});

se.subscribeUserOrderFillCreated(0, 702, function (res) {
    console.log('subscribeUserOrderFillCreated', res);
});
```

### Example API
```javascript
const StocksExchange = require('stocks-exchange-client').client;
const option = {
    client: {
        id: '',
        secret: ''
    },
    tokenObject: {
        'access_token': '',
        'refresh_token': '',
    },
    accessTokenUrl: 'https://api3.stex.com/oauth/token',
    scope: 'push',
};
const se = new StocksExchange(option, null);

// Get general information about the current user
se.profileInfo(function (res) {
    console.log(res);
});

//Get a list of user wallets
se.profileWallets({
    sort:'DESC',
    sortBy: 'BALANCE'
}, function (res) {
    console.log(res);
});

//Single wallet information
se.profileWalletsById(0, function (res) {
    console.log(res);
});

//Create a wallet for given currency
se.newProfileWalletsByCurrencyId(0, function (res) {
    console.log(res);
});

//Get deposit address for given wallet
se.profileWalletsAddressById(0, function (res) {
    console.log(res);
});

//Create new deposit address
se.newProfileWalletsAddressById(0, function (res) {
    console.log(res);
});

//Get a list of deposits made by user
se.profileDeposits({
    sort:'DESC',
    limit: 100
}, function (res) {
    console.log(res);
});

//Get deposit by id
se.profileDepositsById(0, function (res) {
    console.log(res);
});

//Get a list of withdrawals made by user
se.profileWithdrawals({
    sort:'DESC',
    limit: 100
}, function (res) {
    console.log(res);
});

//Get withdrawal by id
se.profileWithdrawalsById(0, function (res) {
    console.log(res);
});

//Create withdrawal request
se.createProfileWithdrawals(0, 1, 'test', null,function (res) {
    console.log(res);
});

//Cancel unconfirmed withdrawal
se.profileWithdrawalCancelById(0, function (res) {
    console.log(res);
});

//Get past orders
se.reportsOrders({
    orderStatus:'ALL',
    limit: 100
}, function (res) {
    console.log(res);
});

//Get specified order details
se.reportsOrdersById(0, function (res) {
    console.log(res);
});

//List your currently open orders
se.tradingOrders(function (res) {
    console.log(res);
});

//Delete all active orders
se.deleteAllTradingOrders(function (res) {
    console.log(res);
});

//List your currently open orders for given currency pair
se.tradingOrdersById(756, function (res) {
    console.log(res);
});

//Delete active orders for given currency pair
se.deleteTradingOrdersById(756, function (res) {
    console.log(res);
});

//Create new order and put it to the orders processing queue
se.createTradingOrdersById(0, {
    type: 'SELL',
    amount: 1,
    price: 1
}, function (res) {
    console.log(res);
});

//Get a single order
se.tradingOrderByOrderId(53518170, function (res) {
    console.log(res);
});

//Cancel order
se.cancelTradingOrderByOrderId(0, function (res) {
    console.log(res);
});

//Test API is working and get server time
se.publicPing(function (res) {
    console.log(res);
});

//A list of candles for given currency pair
se.publicChart(756, '1D', {
    limit: 100,
    timeStart: 1514805801,
    timeEnd: new Date().getTime()
}, function (res) {
    console.log(res);
});

//Orderbook for given currency pair
se.publicOrderbook(756, {
    limit_bids: 100,
    limit_asks: 100
}, function (res) {
    console.log(res);
});

//Trades for given currency pair
se.publicTrades(756, {
    sort: 'DESC',
    from: 1514805801,
    till: new Date().getTime(),
    limit: 100
}, function (res) {
    console.log(res);
});

//Ticker for currency pair
se.publicTicker(756 , function (res) {
    console.log(res);
});

//Tickers list for all currency pairs
se.allPublicTicker( function (res) {
    console.log(res);
});

//Get currency pair information
se.publicCurrencyPairsById(756, function (res) {
    console.log(res);
});

//Available currency pairs
se.publicCurrencyPairsListByCode('BTC', function (res) {
    console.log(res);
});

//Available markets
se.publicMarkets(function (res) {
    console.log(res);
});

//Get currency info
se.publicCurrencyById(1, function (res) {
    console.log(res);
});

//Available Currencies
se.publicCurrency(function (res) {
    console.log(res);
});
```

### Example API use Server-To-Server integrations
```javascript
    const StocksExchange = require('stocks-exchange-client').client;
    const option = {
        tokenObject: {
            'access_token': '<access_token_hash>',
        },
        accessTokenUrl: 'https://api3.stex.com/oauth/token',
        scope: 'profile trade withdrawal reports push settings',
        s2s:true
    };
    const se = new StocksExchange(option, null);
```

## Common Errors
### Here is a list with common errors and their descriptions:
  1.    Invalid Key - not generated key or the key does not correspond to the a user
  2.    Invalid Sign - bad hash-code
  3.    Invalid Nonce - wrong or empty parameter Nonce
  4.    Duplicate Request - parameter Nonce is not unique
  5.    Invalid Method - this method is wrong or missing 
  6.    The credentials are invalid - not valid Api Key or Sign  	
