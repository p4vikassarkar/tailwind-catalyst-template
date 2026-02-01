import { call, put, takeEvery } from 'redux-saga/effects';
import { increment } from '../slices/exampleSlice';

function* incrementAsync() {
  try {
    // Call an async function here, e.g., an API call
    yield call(() => new Promise((resolve) => setTimeout(resolve, 1000)));
    yield put(increment());
  } catch (error) {
    console.error(error);
  }
}

function* watchIncrementAsync() {
  yield takeEvery('example/incrementAsync', incrementAsync);
}

export default watchIncrementAsync;
