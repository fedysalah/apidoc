const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const exphbs = require('express-handlebars');
const app = express();

app.use(compression());
app.enable('trust proxy');


app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(function (req, res, next) {
    if (req.secure) {
        next();
    } else {
        if (process.env.MODE === 'PROD') {
            res.redirect('https://' + req.headers.host + req.url);
        } else {
           next()
        }
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get(`/redoc`, (req, res) => {
    res.render('redoc', { 
      title: 'Documentation',
      openApiUrl: 'http://localhost:3000/openapi/serlians-api.yaml',
    })
});

app.get(`/swagger`, (req, res) => {
    res.render('swagger', { 
      title: 'Documentation',
      openApiUrl: 'http://localhost:3000/openapi/serlians-api.yaml',
    })
});
  
app.get(`/rapidoc`,  (req, res) => {
  res.render('rapidoc', { 
      title: 'Documentation',
      openApiUrl: 'http://localhost:3000/openapi/serlians-api.yaml',
    });  
});

app.get('/openapi/serlians-api.yaml', function (req, res) {
    res.sendFile(path.join(__dirname,  'openapi', 'reference', 'serlians-api.v1.yaml'));
});

app.get('/*', function (req, res) {
    if (process.env.MODE === 'PROD') {
        res.render('home', { publicUrl: '../public/bundle' });
     } else {
        res.render('home', { publicUrl: 'http://localhost:3001' });
    }
});

module.exports = app;
