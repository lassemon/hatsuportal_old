import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Modal from 'components/Modal';
import * as React from 'react';

type ClassNames = 'loginTitle' | 'loginInput' | 'loginButtonBar' | 'loginButton';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  loginTitle: {
    flex: '0 0 100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  loginInput: {
    [theme.breakpoints.down('sm')]: {
      flex: '0 0 100%'
    },
    [theme.breakpoints.up('md')]: {
      flex: '0 0 48%'
    },
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  loginButtonBar: {
    flex: '0 0 100%',
    textAlign: 'right',
    marginTop: theme.spacing.unit * 4
  },
  loginButton: {
    marginLeft: theme.spacing.unit,
    boxShadow: 'none'
  }
});

interface IProps extends WithStyles<typeof styles> {
  username: string;
  password: string;
  handleChange: (event: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
}

class LoginModal extends React.PureComponent<IProps> {
  public state = {
    open: false,
    showPassword: false
  };

  public handleOpen = () => {
    this.setState({ open: true });
  }

  public handleClose = () => {
    this.setState({ open: false });
  }

  public handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !this.state.showPassword }));
  }

  public render() {
    const { classes } = this.props;

    return (
      <Modal open={this.state.open}
        loginText="Login"
        handleOpen={this.handleOpen}
        handleClose={this.handleClose} >
        <Typography variant="title" id="modal-title" className={classes.loginTitle}>
          HatsuPortal Login
        </Typography>
        <FormControl className={classes.loginInput}>
          <InputLabel htmlFor="login-username">Username</InputLabel>
          <Input
            id="login-username"
            value={this.props.username}
            onChange={this.props.handleChange('username')}
          />
        </FormControl>
        <FormControl className={classes.loginInput}>
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <Input
            id="login-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.props.password}
            onChange={this.props.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div className={classes.loginButtonBar}>
          <Button
            className={classes.loginButton}
            color="secondary"
            variant="contained"
            onClick={this.handleClose}>
            Cancel
              </Button>
          <Button
            className={classes.loginButton}
            color="primary"
            variant="contained"
            onClick={this.props.handleLogin}>
            Login
              </Button>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginModal);