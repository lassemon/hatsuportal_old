import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchTags } from 'actions/tags';
import ItemList from 'components/ItemList';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IRootState, ITag, ITagsState } from 'types';

interface IActionProps {
  fetchTags: typeof fetchTags;
}

interface IProps {
  error: boolean;
  tags: ITag[];
  loading: boolean;
}

class HomeView extends React.Component<IActionProps & IProps> {

  public constructor(props: IActionProps & IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchTags();
  }

  public render() {
    const loading = this.props.loading;
    const tags = this.props.tags ? this.props.tags.map(tag => (
      {
        title: tag.name,
        description: ''
      }
    )) : [];

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
    error: state.tags.error,
    tags: state.tags.tags,
    loading: state.tags.loading
  };
};

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
