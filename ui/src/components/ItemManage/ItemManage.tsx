import { Button, Card, CardActions, CardContent, Divider, Drawer, IconButton, StyleRulesCallback, Typography, withStyles, WithStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import { createItem, deleteItem, updateItem } from 'actions/items';
import Modal from 'components/Modal';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { history } from 'store';
import styled from 'styled-components';
import theme from 'theme';
import { IItem, IItemInsertRequest, IRootState } from 'types';
import EditableItem from 'utils/EditableItem';
import ArticleItemEdit from '../ArticleItem/ArticleItemEdit';
import ErrorMessage from '../ErrorMessage';

const drawerWidth = 240;

type ClassNames = 'root' | 'drawerContainer' | 'drawerPaper' | 'card' | 'listItem' | 'areYouSureTitle' | 'areYouSureActionContainer' | 'actionButton';

const styles: StyleRulesCallback<ClassNames> = () => ({
  root: {
    display: 'flex'
  },
  drawerContainer: {
    flex: `0 0 ${drawerWidth}px`
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  card: {
    flex: 'auto'
  },
  listItem: {
    padding: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px ${theme.spacing.unit}px`
  },
  areYouSureTitle: {
    flex: '0 0 100%'
  },
  areYouSureActionContainer: {
    flex: '0 0 100%',
    textAlign: 'right'
  },
  actionButton: {
    boxShadow: 'none',
    margin: `0 ${theme.spacing.unit}px`
  }
});

interface IActionProps {
  createItem: typeof createItem;
  updateItem: typeof updateItem;
  deleteItem: typeof deleteItem;
}

interface IStateProps {
  loadingItemUpdate: boolean;
  itemUpdateError: boolean;
  loadingItemInsert: boolean;
  itemInsertError: boolean;
  loggedIn: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  items: IItem[];
  item: IItem;
}

interface IState {
  drawerOpen: boolean;
  deletingItem: boolean;
  item: EditableItem;
  deleteCandidate?: IItem;
  itemNotValidError: boolean;
}

class ItemManage extends React.Component<IActionProps & IStateProps & IProps, IState> {

  public constructor(props: IActionProps & IStateProps & IProps) {
    super(props);
    this.state = {
      drawerOpen: true,
      deletingItem: false,
      itemNotValidError: false,
      item: new EditableItem({
        title: '',
        description: '',
        content: ''
      })
    };
  }

  public itemClicked = (itemId: number) => () => {
    history.push('/items/' + itemId);
  }

  public itemDelete = (item: IItem) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      deletingItem: true,
      deleteCandidate: item
    });
  }

  public handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  public itemChanged = (newItem: EditableItem) => {
    this.setState({
      item: Object.assign(this.state.item, newItem)
    });
  }

  public save = () => {
    this.setState({
      itemNotValidError: false
    });

    const item = this.state.item;
    if (!item.hasErrors()) {
      this.props.createItem(this.createInsertPayload(item));
      this.setState({
        item: new EditableItem({
          title: '',
          description: '',
          content: ''
        })
      });
    } else {
      this.setState({
        item: new EditableItem(item).validateAll(),
        itemNotValidError: true
      });
    }
  }

  public cancel = () => {
    this.setState({
      deletingItem: false,
      deleteCandidate: undefined
    });
  }

  public delete = () => {
    if (this.state.deleteCandidate) {
      this.setState({
        deletingItem: false,
        deleteCandidate: undefined
      });
      this.props.deleteItem(this.state.deleteCandidate.id);
    }
  }

  public createInsertPayload = (item: EditableItem): IItemInsertRequest => {
    return {
      type: 'article',
      title: item.title,
      description: item.description,
      content: item.content,
      tags: []
    };
  }

  public render() {
    const items = this.props.items || [];
    const { classes } = this.props;

    const StyledList = styled(List)`
      > div + div {
        border-top: 1px solid ${theme.palette.divider};
      }
    `;

    const convertedItems = items.map((item: IItem, index: number) => {
      return (
        <ListItem button={true} className={classes.listItem} key={index} onClick={this.itemClicked(item.id)}>
          <ListItemText
            primary={item.title}
            secondary={item.description}
          />
          <IconButton color="inherit" aria-label="Menu" onClick={this.itemDelete(item)}>
            <ClearIcon />
          </IconButton>
        </ListItem>
      );
    });

    const areYouSureDialog = (
      <Modal open={this.state.deletingItem}>
        <Typography className={classes.areYouSureTitle} variant="body2" gutterBottom={true}>
          Are you sure you want to delete item <strong>{this.state.deleteCandidate ? this.state.deleteCandidate.title : ''}</strong>?
        </Typography>
        <div className={classes.areYouSureActionContainer}>
          <Button size="small" color="secondary" variant="contained" className={classes.actionButton} onClick={this.cancel}>Cancel</Button>
          <Button size="small" color="primary" variant="contained" className={classes.actionButton} onClick={this.delete}>Delete</Button>
        </div>
      </Modal>
    );

    return (
      <div className={classes.root}>
        {areYouSureDialog}
        <div className={classes.drawerContainer}>
          <IconButton onClick={this.handleDrawerToggle}>
            {this.state.drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Divider />
          <Drawer
            variant="persistent"
            anchor={'left'}
            open={this.state.drawerOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <StyledList>
              {(
                convertedItems
              )}
            </StyledList>
          </Drawer>
        </div>
        <Card className={classes.card}>
          <CardContent>
            <ArticleItemEdit item={this.state.item} itemChanged={this.itemChanged} />
            {this.state.itemNotValidError && <ErrorMessage error={{ message: 'Item is not valid' }} />}
            {this.props.itemInsertError && <ErrorMessage error={{ message: 'Item insert failed' }} />}
            {this.props.itemUpdateError && <ErrorMessage error={{ message: 'Item update failed' }} />}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" variant="contained" className={classes.actionButton} onClick={this.save}>Save</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IStateProps> => {
  return {
    loadingItemUpdate: state.items.loadingItemUpdate,
    itemUpdateError: state.items.itemUpdateError,
    loadingItemInsert: state.items.loadingItemInsert,
    itemInsertError: state.items.itemInsertError,
    loggedIn: state.auth.loggedIn
  };
};


const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { updateItem, createItem, deleteItem },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ItemManage));