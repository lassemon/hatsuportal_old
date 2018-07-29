import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import WebAsset  from '@material-ui/icons/WebAsset';
import * as React from 'react';
import styled from 'styled-components';

interface IProps { 
  items: string[];
  header: string;
}
interface IState { }

class ItemList extends React.Component<IProps, IState> {
  public render() {

    const items = this.props.items || []

    const StyledList = styled(List)`
        > div + div {
          border-top: 1px solid rgba(0, 0, 0, 0.12);
        }
    `;

    const convertedItems = items.map((item: any, index: number) => {
      return (
        <ListItem button={true} key={index}>
          <ListItemIcon>
            <WebAsset />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            secondary={item.description}
          />
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