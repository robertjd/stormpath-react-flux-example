class UserService {
	_handleJsonResponse(callback) {
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

	me(callback) {
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

	login(options, callback) {
	  $.ajax({
	    type: 'POST',
	    url: '/api/login',
	    data: JSON.stringify(options),
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8',
	    success: this._handleJsonResponse(callback),
	    error: this._handleJsonResponse(callback)
	  });
	}

	register(options, callback) {
	  $.ajax({
	    type: 'POST',
	    url: '/api/register',
	    data: JSON.stringify(options),
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8',
	    success: this._handleJsonResponse(callback),
	    error: this._handleJsonResponse(callback)
	  });
	}

	logout(callback) {
	  $.ajax({
	    type: 'GET',
	    url: '/api/logout',
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8',
	    success: this._handleJsonResponse(callback),
	    error: this._handleJsonResponse(callback)
	  });
	}
}

export default new UserService()