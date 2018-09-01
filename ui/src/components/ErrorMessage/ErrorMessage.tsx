import { Paper, StyleRulesCallback, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { IError } from 'types';

type ClassNames = 'errorContainer' | 'errorIndicatorIcon' | 'errorTitle' | 'errorContent' | 'errorMessage';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  errorContainer: {
    display: 'flex',
    flexFlow: 'row',
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
  errorContent: {
    flex: '0 0 95%',
    padding: '0 .5em .5em 0'
  },
  errorTitle: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  errorMessage: {
    whiteSpace: 'pre-wrap',
    margin: '0'
  }
});

interface IProps extends WithStyles<typeof styles> {
  error: IError;
}

class ErrorBox extends React.PureComponent<IProps> {

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.errorContainer}>
        <Typography variant="display3" className={classes.errorIndicatorIcon}>
          !
          </Typography>
        <div className={classes.errorContent}>
          <Typography variant="title" gutterBottom={true} className={classes.errorTitle}>
            {this.props.error.title}
          </Typography>
          <Typography variant="body2">
            <p className={classes.errorMessage}>{this.props.error.message}</p>
          </Typography>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ErrorBox);