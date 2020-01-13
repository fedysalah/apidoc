const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const exphbs = require('express-handlebars');
const redoc = require('redoc-express');
const app = express();


app.use(compression());
app.enable('trust proxy');


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(function (req, res, next) {
    if (req.secure) {
        next();
    } else {
        if (process.env.MODE === 'DEV') {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(path.resolve(__dirname, '..', 'public')));


app.get(
    `/redoc`,
    redoc({
      title: 'Documentation',
      specUrl: 'http://localhost:3000/openapi/api-test.yaml',
    })
  );


app.get('/openapi/api-test.yaml', function (req, res) {
    res.sendFile(path.join(__dirname,  'openapi', 'api-test.yaml'));
});

app.get('/*', function (req, res) {
    if (process.env.MODE === 'PROD') {
        res.render('home', { publicUrl: '../public/bundle' });
     } else {
        res.render('home', { publicUrl: 'http://localhost:3001' });
    }
});

module.exports = app;
