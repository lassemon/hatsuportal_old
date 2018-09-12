import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WebAsset from '@material-ui/icons/WebAsset';
import Tags from 'components/Tags';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';
import theme from 'theme';
import { IItem } from 'types';

interface IItemParams {
  id: string;
}

interface IProps extends RouteComponentProps<IItemParams> {
  items: IItem[];
}

class ItemList extends React.Component<IProps> {

  public constructor(props: IProps) {
    super(props);
  }

  public itemClicked = (itemId: number) => () => {
    this.props.history.push('/items/' + itemId);
  }

  public render() {
    const items = this.props.items || [];

    const StyledList = styled(List)`
      > div + div {
        border-top: 1px solid ${theme.palette.divider};
      }
    `;

    const convertedItems = items.map((item: IItem, index: number) => {
      return (
        <ListItem button={true} key={index} onClick={this.itemClicked(item.id)}>
          <ListItemIcon>
            <WebAsset />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            secondary={item.description}
          />
          <Tags tags={item.tags} />
        </ListItem>
      );
    });

    return (
      <div>
        <StyledList>
          {(
            convertedItems
          )}
        </StyledList>
      </div>
    );
  }
}

export default withRouter(ItemList);