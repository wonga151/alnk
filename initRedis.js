const redis = require('redis')
const redisClient = redis.createClient(process.env.REDIS_URL);

// redisClient.flushall(function (err, succeeded) {
//   console.log(succeeded); // will be true if successfull
// });

redisClient.on('connect', () => {
  console.log("Client connected to Redis...")
})

redisClient.on('ready', () => {
  console.log("Client connected to Redis and ready to use...")
})

redisClient.on('error', (error) => {
  console.log(error.message)
})

redisClient.on('end', () => {
  console.log("Client has been disconnected from Redis...")
})

module.exports = redisClient

