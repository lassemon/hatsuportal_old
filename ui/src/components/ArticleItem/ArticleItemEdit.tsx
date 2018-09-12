import { StyleRulesCallback, TextField, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { } from 'types';
import EditableItem from 'utils/EditableItem';

type ClassNames = 'root' | 'description' | 'actionButton' | 'textField' | 'textArea' | 'chipsContainer' | 'chip';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 1em 0'
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
  item: EditableItem;
  itemChanged: (item: EditableItem) => void;
}

interface IState {
  edit: boolean;
  item: EditableItem;
}

class ArticleItem extends React.PureComponent<IProps, IState> {

  public item: EditableItem = this.props.item;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      edit: false,
      item: props.item
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.item !== this.props.item) {
      this.setState({ item: nextProps.item });
    }
  }

  public handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let newItem;
    newItem = new EditableItem(this.state.item || {});
    newItem[name] = event.target.value;
    newItem.validate(name);
    this.setState({
      item: newItem
    });
    this.props.itemChanged(newItem);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          error={this.state.item.titleError}
          required={true}
          label="Title"
          value={this.state.item.title}
          onChange={this.handleChange('title')}
          className={classes.textField}
          margin="normal"
          key="title"
        />
        <TextField
          error={this.state.item.descriptionError}
          required={true}
          label="Description"
          value={this.state.item.description}
          onChange={this.handleChange('description')}
          className={classes.textField}
          margin="normal"
          key="description"
        />
        <TextField
          error={this.state.item.contentError}
          required={true}
          label="Content"
          multiline={true}
          value={this.state.item.content}
          onChange={this.handleChange('content')}
          className={classes.textArea}
          margin="normal"
          key="content"
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ArticleItem);