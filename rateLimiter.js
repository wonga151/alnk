const redisClient = require('./initRedis')

var moment = require('moment')

const WINDOW_SIZE_IN_HOURS = 24;
const MAX_WINDOW_REQUEST_COUNT = 5;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;

const getRequestCount = (req, res, next) => {
  try {
    if (!redisClient) {
      next(Error('Redis client does not exist!'));
    }
    // fetch records of current user using IP address, returns null when no record is found
    redisClient.get(req.ip, function (err, record) {
      if (err) throw err;
      const currentRequestTime = moment();
      console.log(record);

      //  if no record is found , create a new record for user and store to redis
      if (record == null) {
        let newRecord = [];
        let requestLog = {
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 0
        };
        newRecord.push(requestLog);
        redisClient.set(req.ip, JSON.stringify(newRecord));

        res.locals.data = newRecord;
        console.log("No records found, create new record")
        console.log(res.locals.data)
        next();
      }
      else {
        // if record is found, parse it's value and calculate number of requests users has made within the last window
        let data = JSON.parse(record);
        let windowStartTimestamp = moment()
          .subtract(WINDOW_SIZE_IN_HOURS, 'hours')
        // .unix();

        console.log("timestamp")
        console.log(windowStartTimestamp)
        let requestsWithinWindow = data.filter(entry => {
          return entry.requestTimeStamp > windowStartTimestamp;
        });

        let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
          return accumulator + entry.requestCount;
        }, 0);

        console.log(`Current number of requests: ${totalWindowRequestsCount}`)

        // if number of requests made is greater than or equal to the desired maximum, return error
        if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
          console.log("Too many requests")

          res.status(429)
          res.json({
            message: `You exceeded ${MAX_WINDOW_REQUEST_COUNT} requests / ${WINDOW_SIZE_IN_HOURS} hrs. Try again later.`,
            status: 429
          });
        }
        else {
          console.log("Have not reached limit on requests")
          res.locals.data = data;
          console.log("res local data")
          console.log(res.locals.data)
          next()
        }
      }
    });
  } catch (error) {
    console.log("rate limiter recieved an error from getting count ")
    next(error);
  }
}

module.exports = {
  getRequestCount,
  WINDOW_LOG_INTERVAL_IN_HOURS,
  WINDOW_SIZE_IN_HOURS,
}