import { takeLatest, put, call, all } from 'redux-saga/effects'
import { setRunes, setSpreads } from './actions/actions'
import * as actionTypes from './constants/ActionTypes'

export function* onFetchRunes() {
    yield takeLatest(actionTypes.GET_RUNES, function* fetchRecords() {
      try {
          const response = yield call(fetch, 'data/data.json');
          const responseBody = yield call(response.json());
          console.log(responseBody);
          yield put(setRunes(responseBody));
      } catch (e) {
          return;
      }
    });
  }

  export function* onFetchSpreads() {
    yield takeLatest(actionTypes.GET_SPREADS, function* fetchRecords() {
      try {
          const response = yield call(fetch, 'data/spreads.json');
          const responseBody = yield call([response,'json']);
          yield put(setSpreads(responseBody));
      } catch (e) {
          console.log(e.message)
          return;
      }
    });
  }
  
  export default function* rootSaga() {
    yield all([
      onFetchRunes(),
      onFetchSpreads()
    ])
  }  
