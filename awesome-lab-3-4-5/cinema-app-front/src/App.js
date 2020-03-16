import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./store";
import PageContainer from "./components/page/PageContainer";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <PageContainer>
            </PageContainer>
        </BrowserRouter>
    </Provider>
);

export default App;
