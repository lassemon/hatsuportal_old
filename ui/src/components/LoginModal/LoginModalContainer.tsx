import { login, loginReset, logout } from 'actions/auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IAuthState, IRootState, IUser } from 'types';
import LoginModal from './LoginModal';

interface IActionProps {
  login: typeof login;
  loginReset: typeof loginReset;
  logout: typeof logout;
}

interface IProps {
  loginError: boolean;
  loginLoading: boolean;
  logoutError: boolean;
  logoutLoading: boolean;
  loggedIn: boolean;
  user?: IUser;
}

interface IState {
  username: string;
  password: string;
}

class LoginModalContainer extends React.PureComponent<IActionProps & IProps, IState> {

  public constructor(props: IActionProps & IProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  public passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      'password': event.target.value
    });
  }

  public usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      'username': event.target.value
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
        passwordChanged={this.passwordChanged}
        usernameChanged={this.usernameChanged}
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