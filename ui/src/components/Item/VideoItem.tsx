import { Button, Card, CardActions, CardContent, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { IItem } from 'types';

type ClassNames = 'card' | 'title' | 'description';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  card: {
    minWidth: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  description: {
    marginBottom: 12
  }
});

interface IProps extends WithStyles<typeof styles> {
  item: IItem;
  loggedIn: boolean;
}

class VideoItem extends React.PureComponent<IProps> {

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const item = this.props.item;
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography className={classes.description} color="textSecondary">
            {item.description}
          </Typography>
          <Typography paragraph={true}>
            {item.content}
          </Typography>
        </CardContent>
        <CardActions>
          {this.props.loggedIn &&
            <Button size="small">Edit</Button>
          }
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(VideoItem);