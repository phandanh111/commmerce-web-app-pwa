import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/global.scss'
import { Provider } from 'react-redux'
import { store } from '@/stores/Store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
