import { dispatch } from '../AppDispatcher';
import UserConstants from '../constants/UserConstants';

class UserActions {
  login(options, callback) {
    dispatch({
      actionType: UserConstants.USER_LOGIN,
      options: options,
      callback: callback
    });
  }

  register(options, callback) {
    dispatch({
      actionType: UserConstants.USER_REGISTER,
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