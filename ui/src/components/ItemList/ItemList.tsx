import * as React from 'react';

interface IProps { 
  items: string[];
  header: string;
}
interface IState { }

class ItemList extends React.Component<IProps, IState> {
  public render() {

    const items = this.props.items.map((item: any, index: number) => {
      return (
        <li key={index}>{item.title}</li>
      );
    });

    return (
      <div>
        <h3>{this.props.header}</h3>
        <ul>
          {items}
        </ul>
      </div>
    );
    
  }
}

export default ItemList;