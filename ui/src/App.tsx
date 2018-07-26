import Home from 'layouts/Home/';
import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
