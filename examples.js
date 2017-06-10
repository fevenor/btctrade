var btctrade = require('./index.js')
var client = new btctrade();
client.getTicker('eth',console.log);
client.getDepth('eth',console.log);
client.getTrades('eth',console.log);