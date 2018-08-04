import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchItems } from 'actions/items';
import ItemList from 'components/ItemList';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IItem, IRootState } from 'types';

export interface IProps {
  error: boolean;
  items: IItem[];
  loadingItems: boolean;
}

interface IActionProps {
  fetchItems: typeof fetchItems;
}

class HomeView extends React.Component<IProps & IActionProps> {
  public componentDidMount() {
    this.props.fetchItems();
  }

  public render() {
    const loadingItems = this.props.loadingItems;
    const items = this.props.items.map(item => (
      {
        title: item.title,
        description: item.description
      }
    ));

    return (
      <div>
        {loadingItems ? (
          <CircularProgress size={25} />
        ) : (
            <ItemList
              header="Items"
              items={items}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IProps> => {
  return {
    error: state.items.error,
    items: state.items.items,
    loadingItems: state.items.loadingItems
  };
};

// Turns an object whose values are action creators, into an object with the same keys,
// but with every action creator wrapped into a dispatch call so they may be invoked directly.
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
