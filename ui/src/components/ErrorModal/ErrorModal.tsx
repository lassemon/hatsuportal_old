import { Button, StyleRulesCallback, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import Modal from 'components/Modal';
import * as React from 'react';
import { IError } from 'types';

type ClassNames = 'errorContainer' | 'errorIndicatorIcon' | 'errorTitle' | 'errorContent' | 'errorMessage' | 'reloadButton';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  errorContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    flex: '9',
    justifyContent: 'space-between'
  },
  errorIndicatorIcon: {
    flex: '1',
    margin: '0 .3em 0 0',
    minWidth: '.5em',
    background: theme.palette.error.main,
    color: 'white',
    textAlign: 'center'
  },
  errorTitle: {
    flex: '0 0 100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  errorContent: {
    flex: '0 0 100%'
  },
  errorMessage: {
    whiteSpace: 'pre-wrap',
    margin: '0'
  },
  reloadButton: {
    boxShadow: 'none',
    margin: '.5em 0  .5em auto'
  }
});

interface IProps extends WithStyles<typeof styles> {
  error: IError;
}

interface IState {
  reloading: boolean;
}

class ErrorModal extends React.PureComponent<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = { reloading: false };
  }

  public handleReload = () => {
    this.setState(() => {
      return { reloading: true };
    });
    location.reload();
  }

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={true} modalApi={{
          disableBackdropClick: true
        }}>
          <Typography variant="display3" className={classes.errorIndicatorIcon}>
            !
          </Typography>
          <div className={classes.errorContainer}>
            <Typography variant="title" gutterBottom={true} className={classes.errorTitle}>
              {this.props.error.title}
            </Typography>
            <Typography variant="body2" className={classes.errorContent}>
              <p className={classes.errorMessage}>{this.props.error.message}</p>
            </Typography>
            <Button
              disabled={this.state.reloading}
              className={classes.reloadButton}
              color="secondary"
              variant="contained"
              onClick={this.handleReload}>
              Reload
          </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ErrorModal);