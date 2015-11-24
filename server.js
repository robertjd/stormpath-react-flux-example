var stormpath = require('express-stormpath');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

stormpath.init(app, {
  web: {
    me: {
      enabled: true,
      uri: "/api/session"
    },
    register: {
      enabled: true,
      uri: "/api/register"
    },
    login: {
      enabled: true,
      uri: "/api/login"
    },
    logout: {
      enabled: true,
      uri: "/api/logout"
    }
  }
});

app.use(morgan('combined'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/static/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/js/jquery-2.1.4.min.js'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.on('stormpath.ready', function () {
  app.listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:3000');
  });
});