
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import RootLayout from 'layouts/RootLayout';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import Home from 'routes/Home'
import Test from 'routes/Test'
import store, { history } from 'store';
import theme from 'theme'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <RootLayout>
            <Route exact={true} path="/" component={Home} key="home" />
            <Route path="/foo" component={Test} key="foo" />
          </RootLayout>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
