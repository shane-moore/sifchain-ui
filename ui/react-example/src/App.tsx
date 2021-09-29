import React from "react";
import "./App.css";
import { QueryParamProvider } from "use-query-params";
import SwapPage from "./pages/SwapPage/SwapPage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sifchain Frontend
        </a>
      </header>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <RecoilRoot>
            <Switch>
              <Route path="swap" component={SwapPage} />
              <Redirect path="*" to="swap" />
            </Switch>
          </RecoilRoot>
        </QueryParamProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
