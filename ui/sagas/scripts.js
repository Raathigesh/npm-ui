import { call, put } from 'redux-saga/effects';

import { actions } from '../ducks/scripts';
import { getJson, getStream } from '../api';
import { streamToDispatch } from './utils';

export function* fetchScripts() {
  const { scripts } = yield call(getJson, '/scripts');
  yield put(actions.setScripts(scripts));
}

export function* runScript({ name }) {
  const reader = yield call(getStream, `/scripts/run/${name}`);
  yield* streamToDispatch(reader, actions.scriptLogAppend);
}
