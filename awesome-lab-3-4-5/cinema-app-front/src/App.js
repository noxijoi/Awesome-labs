import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>

        </BrowserRouter>
      </Provider>
  );
}

export default App;
