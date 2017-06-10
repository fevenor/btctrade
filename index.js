var util = require('util'),
    request = require('request'),
    VError = require('verror');

var btctrade = function btctrade(key, secret) {
    this.key = key;
    this.secret = secret;
    this.server = 'https://api.btctrade.com/api/';
}

btctrade.prototype.publicRequest = function (method, coin, callback) {
    var functionName = 'btctrade.publicRequest()';
    var url;

    if (method == null) {
        var error = new VError('%s 缺少方法', functionName);
        return callback(error);
    }
    if (method === 'ticker' || method === 'depth' || method === 'trades') {
        url = this.server + method;
    } else {
        var error = new VError('%s没有这种方法: %s', functionName, method);
        return callback(error);
    }

    if (coin == null) {
        var error = new VError('%s 缺少币种', functionName);
        return callback(error);
    }

    if (coin === 'btc' || coin === 'eth' || coin === 'ltc' || coin === 'doge' || coin === 'ybc') {
        url = url + '?coin=' + coin;
    } else {
        var error = new VError('%s 未知币种: %s', functionName, coin);
        return callback(error);
    }
    if (!callback || typeof (callback) != 'function') {
        var error = new VError('%s 缺少输出参数', functionName);
        return callback(error);
    }


    request.get(url, function (err, response, body) {
        var error = null;
        if (err) {
            error = new VError('%s 请求失败', functionName);
            error.name = err.code;
        } else if (response.statusCode != 200) {
            error = new VError('%s 请求失败: %s', functionName, response.statusMessage);
            error.name = response.statusCode;
        }
        callback(error, body);
    })

};

btctrade.prototype.getTicker = function getTicker(coin, callback) {
    this.publicRequest('ticker', coin, callback);
};

btctrade.prototype.getDepth = function getDepth(coin, callback) {
    this.publicRequest('depth', coin, callback);
};

btctrade.prototype.getTrades = function getTrades(coin, callback) {
    this.publicRequest('trades', coin, callback);
};

// @export
module.exports = btctrade
