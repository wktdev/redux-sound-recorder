import React, { Component } from 'react';
import Controls from './containers/ControlsContainer';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import combinedReducers from "./reducers"


// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(combinedReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {

    render() {

       
       
        return ( 
          <Provider store = { store }>
            <div className = "App" >
            <Controls/>
            </div> 
          </Provider>
        );
    }
}

export default App;