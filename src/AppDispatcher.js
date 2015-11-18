import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

export function dispatch(action) {
  return dispatcher.dispatch(action);
}

export function register(options) {
  return dispatcher.register(options);
}