import { Button, Card, CardActions, CardContent, Chip, StyleRulesCallback, TextField, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { IItem, IItemUpdateRequest } from 'types';

type ClassNames = 'card' | 'description' | 'actionButton' | 'editContainer' | 'textField' | 'textArea' | 'chipsContainer' | 'chip';

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
  editContainer: {
    display: 'flex',
    flexDirection: 'column'
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
  loggedIn: boolean;
  update: (itemUpdate: IItemUpdateRequest) => void;
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

  public editMode = () => {
    this.setState({ edit: true });
  }

  public cancel = () => {
    this.setState({ edit: false });
  }

  public save = () => {
    this.setState({ edit: false });
    this.props.update(this.createUpdatePayload());
  }

  public createUpdatePayload = (): IItemUpdateRequest => {
    return {
      id: this.item.id,
      type: this.item.type,
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      tags: []
    };
  }

  public handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [name]: event.target.value
    });
  }

  public render() {
    const { classes } = this.props;

    let actions;

    const tags = [];

    for (const tag of this.item.tags) {
      tags.push(<Chip
        className={classes.chip}
        key={tag.id}
        label={tag.name}
        component="a"
        clickable={true}
      />);
    }

    if (this.props.loggedIn && this.state.edit) {
      actions =
        <CardActions>
          <Button size="small" color="secondary" variant="contained" className={classes.actionButton} onClick={this.cancel}>Cancel</Button>
          <Button size="small" color="primary" variant="contained" className={classes.actionButton} onClick={this.save}>Save</Button>
        </CardActions>;
    } else if (this.props.loggedIn) {
      actions =
        <CardActions>
          <Button size="small" onClick={this.editMode}>Edit</Button>
        </CardActions>;
    }

    return (
      <Card className={classes.card}>
        {!this.state.edit ? (
          <CardContent>
            <Typography variant="headline" component="h2">
              {this.state.title}
            </Typography>
            <Typography className={classes.description} color="textSecondary">
              {this.state.description}
            </Typography>
            <Typography paragraph={true}>
              {this.state.content}
            </Typography>
            <div className={classes.chipsContainer}>
              {tags}
            </div>
          </CardContent>
        ) : (
            <CardContent className={classes.editContainer}>
              <TextField
                label="Title"
                value={this.state.title}
                onChange={this.handleChange('title')}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                label="Description"
                value={this.state.description}
                onChange={this.handleChange('description')}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                label="Content"
                multiline={true}
                value={this.state.content}
                onChange={this.handleChange('content')}
                className={classes.textArea}
                margin="normal"
              />
            </CardContent>
          )}

        {actions}
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ArticleItem);