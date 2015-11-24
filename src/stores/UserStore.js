var AppDispatcher = require('../AppDispatcher');

var BaseStore = require('../stores/BaseStore');
var UserService = require('../services/UserService');
var UserConstants = require('../constants/UserConstants');
var UserActions = require('../actions/UserActions');

var _session = false;
var _sessionError = null;
var _sessionResolved = false;

class UserStore extends BaseStore {
  constructor() {
    super();
    this.resolveSession();
  }

  isAuthenticated(callback) {
    var assertSession = function () {
      return _session !== false
    };

    if (callback) {
      this.resolveSession(function (err, result) {
        if (err) {
          return callback(err);
        }

        callback(null, assertSession());
      }) 
    } else {
      return assertSession();
    }
  }

  login(options, callback) {
    var self = this;

    this.reset();

    UserService.login(options, function (err, result) {
      if (err) {
        return callback(err);
      }

      self.resolveSession(callback);
    });
  }

  register(options, callback) {
    UserService.register(options, callback);
  }

  logout(callback) {
    var self = this;

    UserService.logout(function (err) {
      if (err) {
        return callback(err);
      }

      self.reset();
      self.emitChange();

      callback();
    });
  }

  resolveSession(callback) {
    var self = this;

    if (_sessionResolved) {
      return callback && callback(_sessionError, _session);
    }

    UserService.me(function (err, result) {
      self.reset(true);

      if (err) {
        _sessionError = err;
      } else {
        _sessionResolved = true;
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

  reset(resolved) {
    _session = false;
    _sessionError = null;
    _sessionResolved = resolved || false;
  }
}

var userStore = new UserStore();

AppDispatcher.register(function (payload) {
  switch(payload.actionType) {
    case UserConstants.USER_LOGIN:
      userStore.login(payload.options, payload.callback);
      break;
    case UserConstants.USER_LOGOUT:
      userStore.logout(payload.callback);
      break;
  }

  return true;
});

module.exports = userStore;