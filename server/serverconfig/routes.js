var bodyParser = require('body-parser');

module.exports = function(app, passport) {
  app.use(bodyParser.json());

  // needs to configure the api here

  app.get('/*', function(req, res) {
      res.render('index.html');
  });

  // ------------------------------------
  // View Rendering - Isomorphic
  // ------------------------------------
  function getInitialState () {
    const counter = this.request.query.counter ?
      parseInt(this.request.query.counter) : 0;

    return new Promise(res => res({ counter }));
  }

};
