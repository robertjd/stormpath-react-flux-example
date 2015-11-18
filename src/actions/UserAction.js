import { dispatch } from '../AppDispatcher';
import UserConstants from '../constants/UserConstants';

export function getSession(action) {
  dispatch({
    source: UserConstants.GET_SESSION,
    action: action
  });
}