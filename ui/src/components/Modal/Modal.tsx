import Modal from '@material-ui/core/Modal';
import { Theme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const styles: StyleRulesCallback<'modal'> = (theme: Theme) => ({
  modal: {
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
  }
});

interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  loginText: string;
  handleOpen: () => void;
  handleClose: () => void;
}

class HatsuModal extends React.PureComponent<IProps> {

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.modal}>
            {this.props.children}
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HatsuModal);