var AppDispatcher = require('../AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var EventEmitter = require('events').EventEmitter;

var _session = false;
var _sessionError = null;
var _sessionResolved = false;

function handleJsonResponse(callback) {
  return function (result) {
    var data = result.responseJSON || {};
    if (result.status === 200) {
      callback(null, data);
    } else {
      var message = data.error || 'Invalid request.';
      callback(new Error(message));
    }
  };
}

function makeRequest(method, path, data) {
  $.ajax({
    type: method,
    url: path,
    dataType: 'json',
    accepts: {
      text: 'application/json'
    },
    success: handleJsonResponse(callback),
    error: handleJsonResponse(callback)
  });
}

function requestCurrentSession(callback) {
  $.ajax({
    type: 'GET',
    url: '/api/session',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    accepts: {
      text: 'application/json'
    },
    success: function (result) {
      callback(null, result);
    },
    error: function (err) {
      callback(err);
    }
  });
}

function requestAuthenticate(options, callback) {
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data: JSON.stringify(options),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: handleJsonResponse(callback),
    error: handleJsonResponse(callback)
  });
}

function requestRegister(options, callback) {
  $.ajax({
    type: 'POST',
    url: '/api/register',
    data: JSON.stringify(options),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: handleJsonResponse(callback),
    error: handleJsonResponse(callback)
  });
}

function requestLogout(callback) {
  $.ajax({
    type: 'GET',
    url: '/api/logout',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: handleJsonResponse(callback),
    error: handleJsonResponse(callback)
  });
}

class UserStore extends EventEmitter {
  isAuthenticated(callback) {
    var assertSession = function () {
      return _session !== null
    };

    if (callback) {
      this.resolveSession(function (err, result) {
        if (err) {
          return callback(err);
        }

        callback(null, _session !== null);
      }) 
    } else {
      return assertSession();
    }
  }

  authenticate(options, callback) {
    var self = this;

    this.reset();

    requestAuthenticate(options, function (err, result) {
      if (err) {
        return callback(err);
      }

      self.resolveSession(callback);
    });
  }

  register(options, callback) {
    requestRegister(options, callback);
  }

  logout(callback) {
    var self = this;

    requestLogout(function (err) {
      if (err) {
        return callback(err);
      }

      self.reset();

      callback();
    });
  }

  resolveSession(callback) {
    var self = this;

    if (_sessionResolved) {
      return callback && callback(_sessionError, _session);
    }

    requestCurrentSession(function (err, result) {
      self.reset(true);

      if (err) {
        _sessionError = err;
      } else {
        _session = result;
      }

      if (callback) {
        callback(_sessionError, _session);
      }

      self.emitChange();
    });
  }

  getSession() {
    if (!_sessionResolved) {
      this.resolveSession();
    }
    return _session;
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    return this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  reset(resolved) {
    _sessionError = null;
    _sessionResolved = resolved || false;

    for (var key in _session) {
      delete _session[key];
    }

    this.emitChange();
  }
}

var userStore = new UserStore();
userStore.resolveSession();

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch(action.actionType) {
    case UserConstants.GET_SESSION:
      getSession();
      break;
  }

  return true;
});

module.exports = userStore;