import { login, loginReset, logout } from 'actions/auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IAuthState, IRootState } from 'types';
import LoginModal from './LoginModal';

interface IActionProps {
  login: typeof login;
  loginReset: typeof loginReset;
  logout: typeof logout;
}

class LoginModalContainer extends React.PureComponent<IAuthState & IActionProps> {
  public state = {
    username: '',
    password: ''
  };

  public handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value
    });
  }

  public handleClose = () => {
    this.setState({
      username: '',
      password: ''
    });
    this.props.loginReset();
  }

  public handleLogin = () => {
    this.props.login(this.state.username, this.state.password);
  }

  public handleLogout = () => {
    this.props.logout();
  }

  public render() {

    return (
      <LoginModal
        username={this.state.username}
        password={this.state.password}
        loading={this.props.loginLoading || this.props.logoutLoading}
        error={this.props.loginError || this.props.logoutError}
        loggedIn={this.props.loggedIn}
        user={this.props.user}
        handleChange={this.handleChange}
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        handleClose={this.handleClose} />
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IAuthState> => {
  return {
    loginError: state.auth.loginError,
    loginLoading: state.auth.loginLoading,
    logoutError: state.auth.logoutError,
    logoutLoading: state.auth.logoutLoading,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { login, loginReset, logout },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModalContainer);