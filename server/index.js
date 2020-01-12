const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('app server listening on port ' + port);
});