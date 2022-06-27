import logo from './logo.svg';
import './App.css';
import Dashboard from "./views/dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TokenGenerator from "./components/tokenGenerator/token_generator";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "@reduxjs/toolkit";
import tokenGenerator from "./store/reducers/tokenGenerator";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tokenGenerator: tokenGenerator,
})

function App() {

    const store = createStore(
        rootReducer, (
            compose(
                applyMiddleware(thunk),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        )
    )

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<TokenGenerator/>}/>
                    <Route path={'/token-generator'} element={<TokenGenerator/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
        // <div>
        //     <Dashboard/>
        // </div>
    );
}

export default App;
