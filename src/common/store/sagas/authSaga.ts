import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
} from '../slices/authSlice'

// Mock API calls - replace with actual API calls
async function loginApi(email: string, password: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (email && password) {
    return {
      id: '1',
      name: 'Erica',
      email: email,
      avatar: '/users/erica.jpg',
    }
  }
  throw new Error('Invalid credentials')
}

async function logoutApi() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return true
}

function* handleLogin(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const user: Awaited<ReturnType<typeof loginApi>> = yield call(
      loginApi,
      action.payload.email,
      action.payload.password
    )
    yield put(loginSuccess(user))
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'Login failed'))
  }
}

function* handleLogout() {
  try {
    yield call(logoutApi)
    yield put(logoutSuccess())
  } catch (error) {
    // Even if logout fails, clear local state
    yield put(logoutSuccess())
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin)
  yield takeLatest(logoutRequest.type, handleLogout)
}
