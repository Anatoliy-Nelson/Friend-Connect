import React from 'react'
import './index.css'
import App from 'app/App'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'
import './variable.css'


const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

