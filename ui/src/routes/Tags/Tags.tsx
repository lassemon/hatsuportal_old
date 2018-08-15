import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchTags } from 'actions/tags';
import ItemList from 'components/ItemList';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IRootState, ITagsState } from 'types';

interface IActionProps {
  fetchTags: typeof fetchTags;
}

class HomeView extends React.Component<ITagsState & IActionProps> {
  public componentDidMount() {
    this.props.fetchTags();
  }

  public render() {
    const loading = this.props.loading;
    const tags = this.props.tags.map(tag => (
      {
        title: tag.name,
        description: ''
      }
    ));

    return (
      <div>
        {loading ? (
          <CircularProgress size={25} />
        ) : (
            <ItemList
              header="Tags"
              items={tags}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<ITagsState> => {
  return {
    error: state.items.error,
    tags: state.tags.tags,
    loading: state.tags.loading
  };
};

// Turns an object whose values are action creators, into an object with the same keys,
// but with every action creator wrapped into a dispatch call so they may be invoked directly.
const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { fetchTags },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
