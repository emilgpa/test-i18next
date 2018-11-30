import * as React from "react"
import * as ReactDOM from "react-dom"
import styled from 'styled-components'
import {Provider} from "react-redux"
import { I18nextProvider } from 'react-i18next';
import {BrowserRouter as Router} from "react-router-dom";
import Async from 'react-code-splitting'

//import {App} from "./components/index";
import store from "./store/index"
import i18n from "./i18n/i18n"

//import App from "./components/app.loadable"

const App = () => <Async load={import(/* webpackChunkName: "app" */ './components/app')} />

// aqui comienza
export const main = () => {
    //const store = initStore({user: {user: user}} as IStore);
    ReactDOM.render(
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>,
        </I18nextProvider>,
        document.querySelector("#app")
    );
}
main();