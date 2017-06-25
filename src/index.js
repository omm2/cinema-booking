import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './state/store'
import App from './containers/App/App.jsx'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for material-ui
injectTapEventPlugin()

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'))
registerServiceWorker()
