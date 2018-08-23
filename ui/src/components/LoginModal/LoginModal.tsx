import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Modal from 'components/Modal';
import * as React from 'react';
import { IUser } from 'types';

type ClassNames = 'loginLogoutContainer' | 'loginTitle' | 'loginInput' | 'loginButtonLoader' | 'loginButtonBar' | 'loginModalButton' | 'logoutButton';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  loginLogoutContainer: {
    display: 'flex',
    alignItems: 'center'
  },
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
  loginButtonLoader: {
    flex: '0 0 50%',
    marginTop: theme.spacing.unit * 4
  },
  loginButtonBar: {
    flex: '0 0 50%',
    textAlign: 'right',
    marginTop: theme.spacing.unit * 4
  },
  loginModalButton: {
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    boxShadow: 'none'
  },
  logoutButton: {
    marginLeft: theme.spacing.unit,
    boxShadow: 'none'
  }
});

interface IProps extends WithStyles<typeof styles> {
  username: string;
  password: string;
  error: boolean;
  loading: boolean;
  loggedIn: boolean;
  user?: IUser;
  usernameChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  handleLogout: () => void;
  handleOpen?: () => void;
  handleClose?: () => void;
}

interface IState {
  open: boolean;
  showPassword: boolean;
}

class LoginModal extends React.PureComponent<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      showPassword: false
    };
  }

  public handleOpen = () => {
    this.setState({ open: true });
    if (typeof this.props.handleOpen === 'function') {
      this.props.handleOpen();
    }
  }

  public handleClose = () => {
    this.setState({ open: false });
    if (typeof this.props.handleClose === 'function') {
      this.props.handleClose();
    }
  }

  public handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !this.state.showPassword }));
  }

  public handleLogout = () => {
    this.handleClose();
    this.props.handleLogout();
  }

  public render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.loggedIn && this.props.user ? (
          <div className={classes.loginLogoutContainer}>
            <Typography variant="subheading" color="inherit">{this.props.user.email}</Typography>
            <Button color="primary" variant="contained" className={classes.logoutButton} onClick={this.handleLogout}>Logout</Button>
          </div>
        ) : (
            <Button color="inherit" onClick={this.handleOpen}>Login</Button>
          )}
        <Modal open={this.state.open && !this.props.loggedIn}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose} >
          <Typography variant="title" className={classes.loginTitle}>
            HatsuPortal Login
        </Typography>
          <FormControl className={classes.loginInput}>
            <InputLabel htmlFor="login-username">Username</InputLabel>
            <Input
              error={this.props.error}
              disabled={this.props.loading}
              id="login-username"
              value={this.props.username}
              onChange={this.props.usernameChanged}
            />
          </FormControl>
          <FormControl className={classes.loginInput}>
            <InputLabel htmlFor="login-password">Password</InputLabel>
            <Input
              error={this.props.error}
              disabled={this.props.loading}
              id="login-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.props.password}
              onChange={this.props.passwordChanged}
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
          <div className={classes.loginButtonLoader}>
            {this.props.loading && <CircularProgress size={25} />}
          </div>
          <div className={classes.loginButtonBar}>
            <Button
              disabled={this.props.loading}
              className={classes.loginModalButton}
              color="secondary"
              variant="contained"
              onClick={this.handleClose}>
              Cancel
              </Button>
            <Button
              disabled={this.props.loading}
              className={classes.loginModalButton}
              color="primary"
              variant="contained"
              onClick={this.props.handleLogin}>
              Login
              </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginModal);