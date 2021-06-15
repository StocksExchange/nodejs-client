'use strict';
const io = require("socket.io-client");

class WebcosketApiV3 {

    constructor(client) {
        this.socket = io.connect("https://socket.stex.com");
        this.client = client;
    }

    subscribeRate(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\Ticker", (obj) => cb(obj));
    }

    subscribeOrderFillCreated(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\OrderFillCreated", (obj) => cb(obj));
    }

    subscribeGlassTotalChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\GlassTotalChanged", (obj) => cb(obj));
    }

    subscribeGlassRowChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\GlassRowChanged", (obj) => cb(obj));
    }

    subscribeBestPriceChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\BestPriceChanged", (obj) => cb(obj));
    }

    subscribeCandleChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\CandleChanged", (obj) => cb(obj));
    }

    subscribeBalanceChanged(channel, cb) {
        this.subscribePrivate(channel, 'BalanceChanged', (obj) => cb(obj))
    }

    subscribeUserOrder(channel, cb) {
        this.subscribePrivate(channel, 'UserOrder', (obj) => cb(obj))
    }

    subscribeUserOrderDeleted(channel, cb) {
        this.subscribePrivate(channel, 'UserOrderDeleted', (obj) => cb(obj))
    }

    subscribeUserOrderFillCreated(channel, cb) {
        this.subscribePrivate(channel, 'UserOrderFillCreated', (obj) => cb(obj))
    }

    subscribe(name, cb) {
        this.socket.on('connect', () => console.log('Connected'));
        this.socket.on('connect_failed', () => {
            throw new Error('Sorry, there seems to be an issue with the connection!');
        });
        this.socket.on('disconnect', () => console.log('Disconnect'));
        this.socket.on('error', () => {
            throw new Error('Undefined Error')
        });
        this.socket.on('reconnect_failed', () => {
            throw new Error('Reconnect_failed');
        });
        this.socket.on(name, (msg, obj) => {
            cb(obj)
        });
    }

    subscribePrivate(channel, name, cb) {
        const self = this;
        this.client.getToken((err, token) => {
            self.socket.emit('subscribe', {
                channel: channel,
                auth: {headers: {Authorization: 'Bearer ' + token}}
            });
            self.subscribe("App\\Events\\" + name, (obj) => {
                cb(obj)
            });
        });
    }
}

module.exports = WebcosketApiV3;
