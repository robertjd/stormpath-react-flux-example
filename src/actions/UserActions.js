import { dispatch } from '../AppDispatcher';
import UserConstants from '../constants/UserConstants';

class UserActions {
  getSession(action) {
    dispatch({
      actionType: UserConstants.GET_SESSION,
      action: action
    });
  }

  login(options, callback) {
    dispatch({
      actionType: UserConstants.USER_LOGIN,
      options: options,
      callback: callback
    });
  }

  set(data) {
    dispatch({
      actionType: UserConstants.USER_SET,
      data: data
    });
  }

  logout(callback) {
    dispatch({
      actionType: UserConstants.USER_LOGOUT,
      callback: callback
    });
  }
}

export default new UserActions()