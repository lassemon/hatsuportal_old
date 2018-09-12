
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import RootLayout from 'layouts/RootLayout';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import Calendar from 'routes/Calendar';
import Home from 'routes/Home';
import Item from 'routes/Item';
import ItemManage from 'routes/ItemManage';
import store, { history } from 'store';
import theme from 'theme';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <RootLayout>
              <Route exact={true} path="/" component={Home} key="home" />
              <Route exact={true} path="/calendar" component={Calendar} key="tags" />
              <Switch>
                <Route exact={true} path="/items/manage" component={ItemManage} key="manageItems" />
                <Route exact={true} path="/items/:id" component={Item} key="item" />
              </Switch>
            </RootLayout>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
