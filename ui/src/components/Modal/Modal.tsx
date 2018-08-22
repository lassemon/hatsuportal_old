import MUIModal from '@material-ui/core/Modal';
import { Theme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

const getModalStyle = () => {
  return {
  };
};

const styles: StyleRulesCallback<'modal'> = (theme: Theme) => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '95%',
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'absolute',
    width: '70%',
    maxWidth: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1.5
  }
});

interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  /*tslint:disable no-any */
  modalApi?: any;
}

class Modal extends React.PureComponent<IProps> {

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <MUIModal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
          {...this.props.modalApi}
        >
          <div style={getModalStyle()} className={classes.modal}>
            {this.props.children}
          </div>
        </MUIModal>
      </div >
    );
  }
}

export default withStyles(styles, { withTheme: true })(Modal);