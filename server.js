const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const FormData = require('form-data')
const port = process.env.PORT || 8080

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('./styles'))
app.use(express.static('./images'))

app.set('views', './views')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('listening at ports 8080')
})

app.get('/contact', (req, res) => {
    res.render('contact')
  })

  app.get('/about', (req, res) => {
    res.render('about')
  })

  app.get('/portal', (req, res) => {
    res.render('portal')
  })

  app.get('/giphymon', (req, res) => {
    res.render('giphymon')
  })
  
  app.post('/thanks', (req, res) => {
    const url = 'https://script.google.com/macros/s/AKfycbyph7bkSZMh7Rglua-f0ZBHGJcsQnJ6QDbq_CpA5pHx_mbwUpuU/exec';
    const data = new FormData()
    const fields = Object.keys(req.body);

    fields.forEach(field => {
        data.append(field, req.body[field])
    })
    data.append('TimeStamp', Date())
    
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    data.submit(url, function(err, res) {
    })

    res.render('thanks', { contact: req.body })
  })


app.get('/', (req, res) => {
    const data = {
      person: {
        firstName: 'Efren',
        lastName: 'Gomez',
      }
    }
    res.render('index', {
        firstName: 'Efren',
        lastName: 'Gomez',
      })
})