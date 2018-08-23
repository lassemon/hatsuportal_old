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
  error: boolean;
  items: IItem[];
  loading: boolean;
}

class Home extends React.Component<IActionProps & IProps> {

  public constructor(props: IActionProps & IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchItems();
  }

  public render() {
    const loading = this.props.loading;
    const items = this.props.items ? this.props.items.map(item => (
      {
        title: item.title,
        description: item.description
      }
    )) : [];

    return (
      <div>
        {loading ? (
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

const mapStateToProps = (state: IRootState): Partial<IItemsState> => {
  return {
    error: state.items.error,
    items: state.items.items,
    loading: state.items.loading
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
)(Home);
