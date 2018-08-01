import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchTags } from 'actions/tags';
import ItemList from 'components/ItemList';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IRootState } from 'types';

export interface IProps {
  error: boolean;
  tags: any[];
  loadingTags: boolean;
}

export interface IState { }

interface IActionProps {
  fetchTags: typeof fetchTags;
}

class HomeView extends React.Component<IProps & IActionProps, IState> {
  public componentDidMount() {
    this.props.fetchTags();
  }

  public render() {
    const loadingTags = this.props.loadingTags;
    const tags = this.props.tags.map(tag => ({ title: tag.name }));

    return (
      <div>
        {loadingTags ? (
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

const mapStateToProps = (state: IRootState): Partial<IProps> => {
  return {
    error: state.items.error,
    tags: state.tags.tags,
    loadingTags: state.tags.loadingTags
  }
};

// Turns an object whose values are action creators, into an object with the same keys,
// but with every action creator wrapped into a dispatch call so they may be invoked directly.
const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { fetchTags },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
