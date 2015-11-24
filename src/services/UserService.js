class RequestPool {
  waiting = [];

  request(resolver, callback) {
    var waiting = this.waiting;

    waiting.push(callback);

    if (waiting.length === 1) {
      resolver(function () {
        while (waiting.length) {
          waiting.shift().apply(null, arguments);
        }
      });
    }
    
    return false;
  }
}

class UserService {
  constructor() {
    this.meRequestPool = new RequestPool();
  }

  _makeRequest(method, path, body, callback) {
    var options = {
      type: method,
      url: path,
      dataType: 'json',
      accepts: {
        text: 'application/json'
      },
      complete: function (result) {
        var data = result.responseJSON || {};
        if (result.status === 200) {
          callback(null, data);
        } else {
          var message = data.error || 'Invalid request.';
          callback(new Error(message));
        }
      }
    };

    if (body !== null) {
      options.contentType = 'application/json; charset=utf-8';
      options.data = JSON.stringify(body);
    }

    $.ajax(options);
  }

	me(callback) {
    var self = this;
    this.meRequestPool.request(function (resultCallback) {
      self._makeRequest('get', '/api/session', null, resultCallback);
    }, callback);
	}

	login(options, callback) {
    this._makeRequest('post', '/api/login', options, callback);
	}

	register(options, callback) {
    this._makeRequest('post', '/api/register', options, callback);
	}

	logout(callback) {
    this._makeRequest('get', '/api/logout', null, callback);
	}
}

export default new UserService()