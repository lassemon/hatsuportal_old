import { Card, CardContent, Chip, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { IItem } from 'types';

type ClassNames = 'card' | 'description' | 'content' | 'controls' | 'playIcon' | 'chipsContainer' | 'chip';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  card: {
    minWidth: 275
  },
  description: {
    marginBottom: 12
  },
  content: {
    whiteSpace: 'pre-wrap'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
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
}

class VideoItem extends React.PureComponent<IProps> {

  public item: IItem = this.props.item;

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const item = this.props.item;
    const { classes } = this.props;

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

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography className={classes.description} color="textSecondary">
            {item.description}
          </Typography>
          <p key="content" className={"ql-editor " + classes.content} dangerouslySetInnerHTML={{ __html: item.content }} />
        </CardContent>
        <div className={classes.chipsContainer}>
          {tags}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(VideoItem);