import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./store";
import {Page} from "./components/Page";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Page>
            </Page>
        </BrowserRouter>
    </Provider>
);

export default App;
