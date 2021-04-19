import { createStore, combineReducers } from '@reduxjs/toolkit';
import User from '../modules/user/store';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const userConfig = {
  key: 'user',
  storage,
}

const rootReducer = combineReducers({
  root: persistReducer(userConfig, User),
})

const persistedReducer = persistReducer(rootConfig, rootReducer)

// User persisted storage
let store = createStore(persistedReducer)
let persist = persistStore(store)


export {
  store, persist
}
