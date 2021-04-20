import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import reducer from './reducer'

const rootConfig = {
    key: 'user',
    storage: storage,
    stateReconciler: autoMergeLevel2 
}

const pReducer = persistReducer(rootConfig, reducer);

const store = createStore(pReducer);
const persistor = persistStore(store);

export { store, persistor }