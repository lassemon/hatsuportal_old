import { StyleRulesCallback, TextField, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { IEditableItem, IItem } from 'types';

type ClassNames = 'card' | 'description' | 'actionButton' | 'textField' | 'textArea' | 'chipsContainer' | 'chip';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  card: {
    minWidth: 275
  },
  description: {
    marginBottom: 12
  },
  actionButton: {
    boxShadow: 'none'
  },
  textField: {
    flex: '0 0 100%'
  },
  textArea: {
    flex: '0 0 100%'
  },
  chipsContainer: {
    textAlign: 'right'
  },
  chip: {
    marginRight: theme.spacing.unit,
    height: '2em',
    fontSize: theme.typography.fontSize * 0.8
  }
});

interface IProps extends WithStyles<typeof styles> {
  item: IItem;
  itemChanged: (item: IEditableItem) => void;
}

interface IState {
  edit: boolean;
  title: string;
  description: string;
  content: string;
}

class ArticleItem extends React.PureComponent<IProps, IState> {

  public item: IItem = this.props.item;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      edit: false,
      title: this.item.title,
      description: this.item.description,
      content: this.item.content
    };
  }

  public handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [name]: event.target.value
    });
    this.props.itemChanged({
      title: this.state.title,
      description: this.state.description,
      content: this.state.content
    });
  }

  public render() {
    const { classes } = this.props;

    return [
      <TextField
        label="Title"
        value={this.state.title}
        onChange={this.handleChange('title')}
        className={classes.textField}
        margin="normal"
        key="title"
      />,
      <TextField
        label="Description"
        value={this.state.description}
        onChange={this.handleChange('description')}
        className={classes.textField}
        margin="normal"
        key="description"
      />,
      <TextField
        label="Content"
        multiline={true}
        value={this.state.content}
        onChange={this.handleChange('content')}
        className={classes.textArea}
        margin="normal"
        key="content"
      />
    ];
  }
}

export default withStyles(styles, { withTheme: true })(ArticleItem);