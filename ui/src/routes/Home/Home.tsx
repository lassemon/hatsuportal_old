import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchItems } from 'actions/items';
import ItemList from 'components/ItemList';
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
  loadingItems: boolean;
}

class HomeView extends React.Component<IActionProps & IProps> {

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
            <ItemList
              header="Items"
              items={this.props.items}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IItemsState> => {
  return {
    itemsError: state.items.itemsError,
    items: state.items.items,
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
)(HomeView);
