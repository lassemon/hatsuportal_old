import VideoItem from 'components/Item/VideoItem';
import * as React from 'react';
import { IItem } from 'types';

interface IProps {
  item: IItem;
  loggedIn: boolean;
}

class ItemContainer extends React.Component<IProps> {

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const item = this.props.item;

    return (
      <VideoItem item={item} loggedIn={this.props.loggedIn} />
    );
  }
}

export default ItemContainer;