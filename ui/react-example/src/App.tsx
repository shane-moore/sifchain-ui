import React from 'react'
import SwapPage from './pages/SwapPage/SwapPage'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <SwapPage />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
