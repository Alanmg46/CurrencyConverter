import { takeEvery, select, call } from 'redux-saga/effects';

import { SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION } from '../actions/currencies';

const getLatestRate = currency => fetch(`https://frankfurter.app/current?from=${currency}`);

function* fetchLatestConversionRates(action) {
  try {
    let { currency } = action;
    if (currency === undefined) {
      currency = yield select(state => state.currencies.baseCurrency);
    }
    console.log('currency', currency);

    const response = yield call(getLatestRate, currency);
    const result = yield response.json();

    console.log('result', result);
  } catch (err) {
    console.log('Saga error', err);
  }
}

function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
}

export default rootSaga;


