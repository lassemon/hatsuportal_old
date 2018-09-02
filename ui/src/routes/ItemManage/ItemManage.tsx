import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchItems } from 'actions/items';
import ItemManage from 'components/ItemManage';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IItem, IItemsState, IRootState } from 'types';

interface IActionProps {
  fetchItems: typeof fetchItems;
}

interface IProps {
  itemsError: boolean;
  items: IItem[];
  item: IItem;
  loadingItems: boolean;
}

class ItemManageView extends React.Component<IActionProps & IProps> {

  public constructor(props: IActionProps & IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchItems();
  }

  public render() {
    const loading = this.props.loadingItems;
    const items = this.props.items ? this.props.items : [];

    return (
      <div>
        {loading || items.length < 1 ? (
          <CircularProgress size={25} />
        ) : (
            <ItemManage item={this.props.item} items={this.props.items} />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IItemsState> => {
  return {
    itemsError: state.items.itemsError,
    items: state.items.items,
    item: state.items.item,
    loadingItems: state.items.loadingItems
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { fetchItems },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemManageView);
