import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Theme, withTheme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as React from 'react';
import { compose } from 'redux';

type ClassNames = 'paper' | 'loginTitle' | 'loginInput' | 'loginButtonBar' | 'loginButton';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  paper: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'absolute',
    width: '70%',
    maxWidth: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2
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
  theme: Theme;
}

class LoginModal extends React.PureComponent<IProps> {
  public state = {
    open: false,
    username: '',
    password: '',
    showPassword: false
  };

  public handleOpen = () => {
    this.setState({ open: true });
  }

  public handleClose = () => {
    this.setState({ open: false });
  }

  public handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value
    });
  }

  public handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !this.state.showPassword }));
  }

  public handleLogin = () => {
    /*tslint:disable */
    console.log(this.state.password);
    /*tslint:enable*/
  }

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color="inherit" onClick={this.handleOpen}>Login</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title" className={classes.loginTitle}>
              HatsuPortal Login
            </Typography>
            <FormControl className={classes.loginInput}>
              <InputLabel htmlFor="login-username">Username</InputLabel>
              <Input
                id="login-username"
                value={this.state.username}
                onChange={this.handleChange('username')}
              />
            </FormControl>
            <FormControl className={classes.loginInput}>
              <InputLabel htmlFor="login-password">Password</InputLabel>
              <Input
                id="login-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
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
                onClick={this.handleLogin}>
                Login
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default compose(
  withTheme(),
  withStyles(styles)
)(LoginModal);