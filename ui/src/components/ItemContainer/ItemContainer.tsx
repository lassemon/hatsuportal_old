import { Button, Card, CardActions, CardContent, CircularProgress, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import { toggleEditItem, updateItem } from 'actions/items';
import ArticleItem from 'components/ArticleItem/ArticleItem';
import ErrorMessage from 'components/ErrorMessage';
import Tags from 'components/Tags';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IItem, IItemUpdateRequest, IRootState, ITag } from 'types';
import EditableItem from 'utils/EditableItem';
import ArticleItemEdit from '../ArticleItem/ArticleItemEdit';
import VideoItem from '../VideoItem/VideoItem';

type ClassNames = 'card' | 'actionButton';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  card: {
    minWidth: 275
  },
  actionButton: {
    boxShadow: 'none'
  }
});

interface IActionProps {
  updateItem: typeof updateItem;
  toggleEditItem: typeof toggleEditItem;
}

interface IStateProps {
  loadingItemUpdate: boolean;
  itemUpdateError: boolean;
  editingItem: boolean;
  loggedIn: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  item: IItem;
}

interface IState {
  item: EditableItem;
  itemNotValidError: boolean;
}

class ItemContainer extends React.Component<IActionProps & IStateProps & IProps, IState> {

  public constructor(props: IActionProps & IStateProps & IProps) {
    super(props);
    this.state = {
      item: new EditableItem(this.props.item),
      itemNotValidError: false
    };
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public openEditMode = () => {
    this.props.toggleEditItem(true);
  }

  public cancel = () => {
    this.setState({
      item: new EditableItem(this.props.item)
    });
    this.props.toggleEditItem(false);
  }

  public save = () => {
    this.setState({
      itemNotValidError: false
    });

    const item = this.state.item;
    if (!item.hasErrors()) {
      this.props.updateItem(this.createUpdatePayload());
    } else {
      this.setState({
        item: item.validateAll(),
        itemNotValidError: true
      });
    }
  }

  public itemChanged = (newItem: EditableItem) => {
    this.setState({
      item: Object.assign(this.state.item, newItem)
    });
  }

  public tagsChanged = (tags: ITag[]) => {
    const newItem = new EditableItem(this.state.item);
    newItem.tags = tags;
    this.setState({
      item: newItem
    });
  }

  public createUpdatePayload = (): IItemUpdateRequest => {
    const item = this.state.item;
    const tagUpdate = item.tags ? item.tags.map(tag => tag.id) : [];
    if (item) {
      return {
        id: this.props.item.id,
        type: this.props.item.type,
        title: item.title,
        description: item.description,
        content: item.content,
        tags: tagUpdate
      };
    } else {
      throw new Error("Item is not valid for update");
    }
  }

  public render() {
    const { classes } = this.props;
    const item = this.props.item;
    let actions;

    if (this.props.loggedIn && this.props.editingItem) {
      actions =
        <CardActions>
          <Button size="small" color="secondary" variant="contained" className={classes.actionButton} onClick={this.cancel}>Cancel</Button>
          <Button size="small" color="primary" variant="contained" className={classes.actionButton} onClick={this.save}>Save</Button>
        </CardActions>;
    } else if (this.props.loggedIn) {
      actions =
        <CardActions>
          <Button size="small" onClick={this.openEditMode}>Edit</Button>
        </CardActions>;
    }

    const videoItem = (
      <Card className={classes.card}>
        <VideoItem item={item} />
        {actions}
      </Card>
    );

    const articleItem = (
      <Card className={classes.card}>
        <CardContent>
          {this.props.editingItem ?
            (
              <div>
                <ArticleItemEdit item={this.state.item} itemChanged={this.itemChanged} />
                <Tags tags={item.tags} edit={this.props.editingItem} tagsChanged={this.tagsChanged} />
              </div>
            ) : (
              <div>
                <ArticleItem item={item} />
                <Tags tags={item.tags} />
              </div>
            )
          }
          {this.props.loadingItemUpdate && <CircularProgress size={25} />}
          {this.state.itemNotValidError && <ErrorMessage error={{ message: 'Item is not valid' }} />}
          {this.props.itemUpdateError && <ErrorMessage error={{ message: 'Item update failed' }} />}
        </CardContent>
        {actions}
      </Card>
    );

    switch (item.type) {
      case 'video':
        return videoItem;
      case 'article':
        return articleItem;
      default:
        return articleItem;
    }
  }
}

const mapStateToProps = (state: IRootState): Partial<IStateProps> => {
  return {
    loadingItemUpdate: state.items.loadingItemUpdate,
    itemUpdateError: state.items.itemUpdateError,
    editingItem: state.items.editingItem,
    loggedIn: state.auth.loggedIn
  };
};


const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { toggleEditItem, updateItem },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ItemContainer));
