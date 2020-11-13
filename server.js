const path = require('path')
const express = require('express');

var moment = require('moment')
var redis = require('redis')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup');
const monk = require('monk');
const compression = require('compression')
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk(process.env.MONGO_URI);

const redisClient = require('./initRedis.js')

const getRequestCount = require('./rateLimiter.js').getRequestCount
const WINDOW_LOG_INTERVAL_IN_HOURS = require('./rateLimiter.js').WINDOW_LOG_INTERVAL_IN_HOURS
const WINDOW_SIZE_IN_HOURS = require('./rateLimiter.js').WINDOW_SIZE_IN_HOURS

const urls = db.get('urls');

const expireAfterSeconds = WINDOW_SIZE_IN_HOURS * 360;
urls.createIndex({ createdAt: 1 }, { expireAfterSeconds: expireAfterSeconds });
urls.createIndex({ slug: 1 }, { unique: true });

const app = express();

app.use(compression())
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

var distDir = __dirname + "/dist";
app.use(express.static(distDir));
app.use(express.static('./public'));



app.get('/url/:slug', async (req, res, next) => {
  const { slug: slug } = req.params;

  try {
    const url = await urls.findOne({ slug });
    if (url) {
      res.json(url.url);
    }
    else {
      res.json({ message: "No url associated with this slug." })
    }
  } catch (error) {
    next(error)
  }
})

app.get('/search/:slug', async (req, res, next) => {
  const { slug: slug } = req.params;

  var regEx = new RegExp(`.*${slug}.*`, 'i')
  try {
    const slugs = await urls.find(
      { slug: regEx },
      { _id: 0 }
    )

    if (slugs) {
      res.json(slugs);
    }
    else {
      res.json({ message: `Error matching: ${slug}.` })
    }
  } catch (error) {
    next(error)
  }
})

const notFoundPath = path.join(__dirname, '/public/404.html');
app.get('/:id', async (req, res) => {
  const { id: slug } = req.params;

  try {
    const url = await urls.findOne({ slug });
    if (url) {
      res.redirect(url.url);
    }
    else {
      console.log("Slug: " + slug + " not found")
      res.status(404).sendFile(notFoundPath)
    }
  } catch (error) {
    console.log(error)
    res.status(404).sendFile(notFoundPath)

  }
})

const schema = yup.object().shape({
  slug: yup.string().trim().matches(/[\w\-]/i),
  url: yup.string().trim().matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g).required(),
})


app.post('/url', getRequestCount, async (req, res, next) => {
  let { slug, url } = req.body;
  console.log(req.body)

  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    await schema.validate({ slug, url })

    if (!slug) {
      slug = nanoid(5);
    }

    const newUrl = { slug, url, createdAt: new Date() }

    urls.insert(newUrl)
      .then(response => {
        const currentRequestTime = moment()
        let data = res.locals.data;

        let lastRequestLog = data[data.length - 1];
        let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
          .subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours')
          .unix();

        //  if interval has not passed since last request log, increment counter
        if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
          lastRequestLog.requestCount++;
          data[data.length - 1] = lastRequestLog;
        } else {
          //  if interval has passed, log new entry for current user and timestamp
          data.push({
            requestTimeStamp: currentRequestTime.unix(),
            requestCount: 1
          });
        }
        console.log(data)
        redisClient.set(req.ip, JSON.stringify(data), "EX", expireAfterSeconds, redis.print);
        res.json(response)
      })
      .catch(error => {
        let status;
        if (error.message.startsWith("E11000")) {
          error.message = "Slug in use."
          status = 409;
          res.status(409)
        }
        else {
          status = 400
          error.message = "Invalid URL"
          res.status(status)
        }
        console.log(error.message)
        res.json({ message: error.message, status: status })
      })
  }
  catch (error) {
    res.status(400)
    res.json({ message: "Invalid URL", status: 400 })
  }
})

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status)
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'error' : error.stack
  })
})

const port = process.env.PORT || 3080;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})