import {
  Button, Card, CardActions, CardContent, CircularProgress, Divider, Drawer,
  IconButton, StyleRulesCallback, Typography, withStyles, WithStyles
} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import { clearFetchedItem, clearItemErrors, createItem, deleteItem, toggleManageItem, updateItem } from 'actions/items';
import classnames from 'classnames';
import ArticleItemEdit from 'components/ArticleItem/ArticleItemEdit';
import ErrorMessage from 'components/ErrorMessage';
import Modal from 'components/Modal';
import Tags from 'components/Tags';
import 'css/quill-custom.css';
import { debounce } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import theme from 'theme';
import { IItem, IItemInsertRequest, IItemUpdateRequest, IRootState, ITag } from 'types';
import EditableItem from 'utils/EditableItem';

const drawerWidth = 240;
const closedDrawerWidth = 48;

type ClassNames = 'root' | 'drawerContainer' | 'drawerPaper' | 'card' | 'cardShift' | 'listItem' |
  'itemHeader' | 'itemDescription' | 'areYouSureTitle' | 'areYouSureActionContainer' | 'actionButton';

const styles: StyleRulesCallback<ClassNames> = () => ({
  root: {
    display: 'flex'
  },
  drawerContainer: {
    flex: '0 0 auto'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  card: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    boxShadow: 'none',
    borderRadius: 0
  },
  cardShift: {
    marginLeft: closedDrawerWidth - drawerWidth,
    width: '100%'
  },
  listItem: {
    height: 'auto',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: 0
  },
  itemHeader: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  itemDescription: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
    margin: theme.spacing.unit
  }
});

interface IActionProps {
  createItem: typeof createItem;
  updateItem: typeof updateItem;
  deleteItem: typeof deleteItem;
  clearItemErrors: typeof clearItemErrors;
  clearFetchedItem: typeof clearFetchedItem;
  toggleManageItem: typeof toggleManageItem;
}

interface IStateProps {
  loadingItemUpdate: boolean;
  itemUpdateError: boolean;
  loadingItemInsert: boolean;
  itemInsertError: boolean;
  managingItem: boolean;
  loggedIn: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  items: IItem[];
}

interface IState {
  drawerOpen: boolean;
  deletingItem: boolean;
  item: EditableItem;
  deleteCandidate?: IItem;
  itemNotValidError: boolean;
}

class ItemManage extends React.Component<IActionProps & IStateProps & IProps, IState> {

  public itemChanged = debounce((newItem: EditableItem) => {
    this.clearErrors();
    this.setState({
      item: Object.assign(this.state.item, newItem)
    });
  }, 250, { 'maxWait': 1000 });

  public constructor(props: IActionProps & IStateProps & IProps) {
    super(props);

    const editableItem = new EditableItem({});

    this.state = {
      drawerOpen: true,
      deletingItem: false,
      itemNotValidError: false,
      item: editableItem
    };
  }

  public findItem = (itemId: number) => {
    return this.props.items.find(item => item.id === itemId);
  }


  public itemClicked = (itemId: number) => () => {
    if (this.state.item.id !== itemId) {
      const selectedItem = this.findItem(itemId);
      if (selectedItem) {
        this.props.toggleManageItem(true);
        this.setState(() => {
          return {
            item: new EditableItem(selectedItem || {})
          };
        });
      }
    }
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

  public newItem = () => {
    this.clearErrors();
    this.props.clearFetchedItem();
    this.props.toggleManageItem(false);
    this.clearItem();
  }

  public clearItem = () => {
    this.setState({
      item: new EditableItem({})
    });
  }

  public tagsChanged = (tags: ITag[]) => {
    this.clearErrors();
    const newItem = new EditableItem(this.state.item || {});
    newItem.tags = tags;
    this.setState({
      item: newItem
    });
  }

  public cancel = () => {
    this.setState({
      deletingItem: false,
      deleteCandidate: undefined
    });
  }

  public saveItem = () => {
    this.clearErrors();
    this.setState({
      itemNotValidError: false
    });

    const item = this.state.item;
    if (!item.hasErrors()) {
      if (this.props.managingItem) {
        this.props.updateItem(this.createUpdatePayload(item));
      } else {
        this.props.createItem(this.createInsertPayload(item));
      }
    } else {
      this.setState({
        item: new EditableItem(item || {}).validateAll(),
        itemNotValidError: true
      });
    }
  }

  public createInsertPayload = (item: EditableItem): IItemInsertRequest => {
    return {
      type: 'article',
      title: item.title,
      description: item.description,
      content: item.content,
      tags: item.tags.map(tag => tag.id)
    };
  }

  public createUpdatePayload = (item: EditableItem): IItemUpdateRequest => {
    const tagUpdate = item.tags ? item.tags.map(tag => tag.id) : [];
    const completeItem = this.findItem(item.id);
    if (item && completeItem) {
      return {
        id: completeItem.id,
        type: completeItem.type,
        title: item.title,
        description: item.description,
        content: item.content,
        tags: tagUpdate
      };
    } else {
      throw new Error("Item is not valid for update");
    }
  }

  public deleteItem = () => {
    if (this.state.deleteCandidate) {
      this.setState({
        deletingItem: false,
        deleteCandidate: undefined
      });
      this.props.deleteItem(this.state.deleteCandidate.id);
    }
  }

  public clearErrors = () => {
    this.props.clearItemErrors();
    this.setState({
      itemNotValidError: false
    });
  }

  public render() {
    const items = this.props.items || [];
    const { classes } = this.props;

    const StyledList = styled(MenuList)`
      > li + li {
        border-top: 1px solid ${theme.palette.divider};
      }
    `;

    const convertedItems = items.map((item: IItem, index: number) => {
      return (
        <MenuItem
          selected={this.state.item && item.id === this.state.item.id}
          button={true}
          className={classes.listItem}
          key={index}
          onClick={this.itemClicked(item.id)}>
          <ListItemText
            primary={item.title}
            secondary={item.description}
            classes={{ primary: classes.itemHeader, secondary: classes.itemDescription }}
          />
          <IconButton color="inherit" aria-label="Menu" onClick={this.itemDelete(item)}>
            <ClearIcon />
          </IconButton>
        </MenuItem>
      );
    });

    const areYouSureDialog = (
      <Modal open={this.state.deletingItem}>
        <Typography className={classes.areYouSureTitle} variant="body2" gutterBottom={true}>
          Are you sure you want to delete item <strong>{this.state.deleteCandidate ? this.state.deleteCandidate.title : ''}</strong>?
        </Typography>
        <div className={classes.areYouSureActionContainer}>
          <Button size="small" color="secondary" variant="contained" className={classes.actionButton} onClick={this.cancel}>Cancel</Button>
          <Button size="small" color="primary" variant="contained" className={classes.actionButton} onClick={this.deleteItem}>Delete</Button>
        </div>
      </Modal>
    );

    const currentItemEqualsSavedItem = EditableItem.equals(this.state.item, new EditableItem(this.findItem(this.state.item.id) || {}));
    const saveButtonDisabled = this.props.loadingItemInsert || this.props.loadingItemUpdate || currentItemEqualsSavedItem;

    return (
      <div className={classes.root}>
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
            <Divider />
            <Button size="small" color="primary" variant="contained" className={classes.actionButton} onClick={this.newItem}>New Item</Button>
          </Drawer>
        </div>
        <Card className={classnames(classes.card, {
          [classes.cardShift]: !this.state.drawerOpen
        })}>
          <CardContent>
            <ArticleItemEdit item={this.state.item} itemChanged={this.itemChanged} />
            <Tags tags={this.state.item.tags} edit={true} tagsChanged={this.tagsChanged} />
            {this.state.itemNotValidError && <ErrorMessage error={{ message: 'Item is not valid' }} />}
            {this.props.itemInsertError && <ErrorMessage error={{ message: 'Item insert failed' }} />}
            {this.props.itemUpdateError && <ErrorMessage error={{ message: 'Item update failed' }} />}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              className={classes.actionButton}
              onClick={this.saveItem}
              disabled={saveButtonDisabled}
            >
              Save
            </Button>
          </CardActions>
          {this.props.loadingItemInsert || this.props.loadingItemUpdate && <CircularProgress size={25} />}
        </Card>
        {areYouSureDialog}
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
    managingItem: state.items.managingItem,
    loggedIn: state.auth.loggedIn
  };
};


const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { updateItem, createItem, deleteItem, clearItemErrors, clearFetchedItem, toggleManageItem },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ItemManage));