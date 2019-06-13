import { takeEvery, put, putResolve, call, all, select } from 'redux-saga/effects'
import { setRunes, setSpreads } from './actions/actions'
import * as actionTypes from './constants/ActionTypes'

export function* onFetchRunes() {
    yield takeEvery(actionTypes.GET_RUNES, function* fetchRecords() {
      try {
          const runes: Array<Rune> = yield select((state: State) => state.runes)
          if (runes.length === 0) {
            const response = yield call(fetch, './data/data.json');
            const responseBody = yield call([response,'json']);
            yield put(setRunes(responseBody));
          }
      } catch (e) {
        yield put({type: actionTypes.RUNES_REQUEST_FAILED, e})
      }
    });
  }

  export function* onFetchSpreads() {
    yield takeEvery(actionTypes.GET_SPREADS, function* fetchRecords() {
      try {
          const spreads: Array<Spread> = yield select((state: State) => state.spreads)
          if (spreads.length === 0) {
            const response = yield call(fetch, './data/spreads.json');
            const responseBody = yield call([response,'json']);
            yield put(setSpreads(responseBody));
          }
      } catch (e) {
          yield put({type: actionTypes.SPREADS_REQUEST_FAILED, e})
      }
    });
  }

  export function* onInit() {
    yield takeEvery(actionTypes.INIT, function* init(action) {
       yield putResolve({type: actionTypes.GET_SPREADS})
       yield putResolve({type: actionTypes.GET_RUNES})
       yield put({type: actionTypes.SET_SELECTED_SPREAD, payload: {
        selected_spread: parseInt((action as any).spread_number, 10)
       }})
    });
  }
  
  export default function* rootSaga() {
    yield all([
      onInit(),
      onFetchRunes(),
      onFetchSpreads()
    ])
  }  
