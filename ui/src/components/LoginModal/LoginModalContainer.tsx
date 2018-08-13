import * as React from 'react';
import LoginModal from './LoginModal';

class LoginModalContainer extends React.PureComponent {
  public state = {
    username: '',
    password: ''
  };

  public handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value
    });
  }

  public handleLogin = () => {
    /*tslint:disable */
    console.log(this.state.password);
    /*tslint:enable*/
  }

  public render() {

    return (
      <LoginModal
        username={this.state.username}
        password={this.state.password}
        handleChange={this.handleChange}
        handleLogin={this.handleLogin} />
    );
  }
}

export default LoginModalContainer;