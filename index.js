const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup');
const monk = require('monk');
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk("mongodb+srv://alnk1:oKoU9fssaTRtVnrs@alnk.zfzqd.mongodb.net/aknklinks?retryWrites=true&w=majority");

const urls = db.get('urls');

urls.createIndex({ slug: 1 }, { unique: true });

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

// app.get('/', (req, res) => {
//   res.json({
//     message: 'awlnk.lnk - Shorten your url1s'
//   })
// })

app.get('/url/:id', async (req, res, next) => {
  const { id: slug } = req.params;

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

app.get('/:id', async (req, res) => {
  const { id: slug } = req.params;

  try {
    const url = await urls.findOne({ slug });
    if (url) {
      res.redirect(url.url);
    }
    console.log("Slug: " + slug + " not found")
  } catch (error) {
    console.log(error)
  }
})


const schema = yup.object().shape({
  slug: yup.string().trim().matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
})

app.post('/url', async (req, res, next) => {
  let { slug, url } = req.body;
  console.log(req.body)

  try {
    await schema.validate({
      slug,
      url
    })

    if (!slug) {
      slug = nanoid(5);
    }

    slug = slug.toLowerCase();
    const newUrl = {
      slug,
      url
    }

    console.log(newUrl)

    const created = await urls.insert(newUrl);
    console.log("response created")
    console.log(created)
    res.json(created)

  } catch (error) {
    if (error.message.startsWith("E11000")) {
      error.message = "Slug in use."
    }
    console.log(error)
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

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})