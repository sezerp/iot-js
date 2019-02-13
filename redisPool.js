const redis = require("redis");
const redisConfig = require('./secrets/redisConfiguration');
const client = redis.createClient();

client.on("error", function (err) {
    console.error(err);
});
    
module.exports = client;