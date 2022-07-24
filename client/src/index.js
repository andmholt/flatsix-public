import axios from 'axios'
import ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)