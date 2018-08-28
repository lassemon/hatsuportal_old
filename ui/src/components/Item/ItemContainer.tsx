import ArticleItem from 'components/Item/ArticleItem';
import VideoItem from 'components/Item/VideoItem';
import * as React from 'react';
import { IItem, IItemUpdateRequest } from 'types';

interface IProps {
  item: IItem;
  loggedIn: boolean;
  update: (itemUpdate: IItemUpdateRequest) => void;
}

class ItemContainer extends React.Component<IProps> {

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const item = this.props.item;

    switch (item.type) {
      case 'video':
        return <VideoItem item={item} loggedIn={this.props.loggedIn} />;
      case 'article':
        return <ArticleItem item={item} loggedIn={this.props.loggedIn} update={this.props.update} />;
      default:
        return <ArticleItem item={item} loggedIn={this.props.loggedIn} update={this.props.update} />;
    }
  }
}

export default ItemContainer;