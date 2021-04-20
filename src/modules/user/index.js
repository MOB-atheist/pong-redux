import React, { useState } from 'react'
import { store, persistor } from '../../app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function UserModule() {
    const [user, setUser] = useState({
        Id: void 0,
        NickName: void 0,
        Status: void 0,
    })

    console.log('state', store.getState())

    const Save = (values) => {}

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <div>Usuário</div>
            </PersistGate>
        </Provider>
    )
}
