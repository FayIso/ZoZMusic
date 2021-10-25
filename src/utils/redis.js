const redis = require("redis");
const rclient = redis.createClient();

rclient.on("error", (error) => console.error(error));

rclient.on("ready", () => {
    console.log("\n - Redis Ready :)");
});

rclient.on("connect", () => {
    console.log("\n - Redis Connected :)");
});

rclient.on("end", () => {
    console.log("\n - Redis Ended :)");
});

module.exports = {
    redisClient: rclient,
    redis: redis,
};