import React from 'react'
import SwapPage from './pages/SwapPage/SwapPage'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { SwapPageProvider } from './pages/SwapPage/context'

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <SwapPageProvider>
            <SwapPage />
          </SwapPageProvider>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
