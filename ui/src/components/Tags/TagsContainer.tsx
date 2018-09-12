import { fetchTags } from 'actions/tags';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IRootState, ITag } from 'types';
import Tags from './Tags';
import TagsEdit from './TagsEdit';

interface IActionProps {
  fetchTags: typeof fetchTags;
}

interface IProps {
  edit?: boolean;
  tags: ITag[];
  tagsChanged?: (tags: ITag[]) => void;
}

interface IPartialGlobalStateProps {
  allTags: ITag[];
}

class TagsContainer extends React.Component<IActionProps & IPartialGlobalStateProps & IProps> {

  public constructor(props: IActionProps & IPartialGlobalStateProps & IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchTags();
  }

  public render() {
    return (
      this.props.edit ?
        (
          <TagsEdit
            tags={this.props.tags}
            tagSuggestions={this.props.allTags}
            edit={this.props.edit}
            tagsChanged={this.props.tagsChanged!} />
        ) : (
          <Tags tags={this.props.tags} />
        )
    );
  }
}

const mapStateToProps = (state: IRootState): IPartialGlobalStateProps => {
  return {
    allTags: state.tags.tags
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
)(TagsContainer);