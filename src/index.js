import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
// Redux implementation
import { Provider } from 'react-redux'
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'

// App
import App from './App'
import Header from './modules/header'
import Footer from './modules/footer'

// Material-ui implementation
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#000000',
                },
                a: {
                    color: '#fff !important'
                },
                button: {
                    borderColor: '#00ff00 !important'
                },
                fieldset: {
                    borderColor: '#00ff00 !important'
                },
                label: {
                    color: '#00ff00 !important'
                }
            },
        },
    },
    palette: {
        background: {
            paper: "#000"
        },
        text: {
            primary: '#00ff00',
            secondary: '#00ff00'
        },
        primary: {
            light: '#000000',
            main: '#000000',
            dark: '#000000',
            contrastText: '#00ff00',
        },
        secondary: {
            light: '#000000',
            main: '#000000',
            dark: '#000000',
            contrastText: '#00ff00',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        type: 'dark',
    },
})

ReactDOM.render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Header />
                    <App />
                    <Footer />
                </PersistGate>
            </Provider>
        </ThemeProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
