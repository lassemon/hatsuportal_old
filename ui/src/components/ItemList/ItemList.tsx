import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import WebAsset from '@material-ui/icons/WebAsset';
import Tags from 'components/Tags';
import * as React from 'react';
import { history } from 'store';
import styled from 'styled-components';
import theme from 'theme';
import { IItem } from 'types';

interface IProps {
  items: IItem[];
  header: string;
}

class ItemList extends React.Component<IProps> {

  public constructor(props: IProps) {
    super(props);
  }

  public itemClicked = (itemId: number) => () => {
    history.push('items/' + itemId);
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
        <Typography variant="title">{this.props.header}</Typography>
        <StyledList>
          {(
            convertedItems
          )}
        </StyledList>
      </div>
    );
  }
}

export default ItemList;