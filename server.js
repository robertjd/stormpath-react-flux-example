var stormpath = require('express-stormpath');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use('/', express.static(path.join(__dirname, 'build')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

stormpath.init(app, {
  web: {
    me: {
      enabled: true,
      uri: "/api/me"
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
    },
    forgotPassword: {
      enabled: true,
      uri: "/api/forgot"
    }
  }
});

app.use(morgan('combined'));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
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