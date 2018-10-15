import { Action } from 'redux';

export function action(type: string, payload = {}): Action {
  return {type, ...payload}
};