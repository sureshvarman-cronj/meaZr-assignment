import Express  from 'express';
import fs       from 'fs';
import compress from 'compression';
import path     from 'path';
import engine   from 'consolidate';
import bodyParser from 'body-parser';
import favicon  from 'serve-favicon';

import routeConfig   from './serverconfig/routes';

require('babel/register');

const app   = new Express();
const compression = new compress();

// temporary allow for CROS
if (process.env.NODE_ENV != 'production') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
    next();
  });
}

// compressing static contents
app.use(compression);

// limit for request and response object
app.use(bodyParser.json({limit: '150mb'}));


// express view settings
app.engine('html', engine.mustache);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');

// express static path
app.use(Express.static(path.join(__dirname, '../public')));

// app.use(favicon(path.join(__dirname + '/public/images/favicon.ico'));
app.use(favicon('public/images/GL-meaZr-logo-64x64.png'));

routeConfig(app);

export default app;
