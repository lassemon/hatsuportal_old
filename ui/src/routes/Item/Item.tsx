import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchItem } from 'actions/items';
import Item from 'components/Item';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IItem, IItemsState, IRootState } from 'types';

interface IActionProps {
  fetchItem: typeof fetchItem;
}

interface IItemParams {
  id: number;
}

interface IProps extends RouteComponentProps<IItemParams> {
  itemError: boolean;
  item: IItem;
  loadingItem: boolean;
  loggedIn: boolean;
}

class ItemView extends React.Component<IActionProps & IProps> {

  public constructor(props: IActionProps & IProps) {
    super(props);
  }

  public componentDidMount() {
    const itemId = this.props.match.params.id;
    this.props.fetchItem(itemId);
  }

  public render() {

    const loading = this.props.loadingItem;
    const item = this.props.item;

    return (
      this.props.itemError ? (
        <div>Item not found</div>
      ) : (
          <div>
            {loading || !item ? (
              <CircularProgress size={25} />
            ) : (
                <Item item={item} loggedIn={this.props.loggedIn} />
              )}
          </div>
        )
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IItemsState> => {
  return {
    itemError: state.items.itemError,
    item: state.items.item,
    loadingItem: state.items.loadingItem,
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { fetchItem },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemView));