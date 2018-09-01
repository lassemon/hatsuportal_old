import { Chip, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { ITag } from 'types';

type ClassNames = 'tagsContainer' | 'tag';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  tagsContainer: {
    textAlign: 'right'
  },
  tag: {
    marginRight: theme.spacing.unit,
    height: '2em',
    fontSize: theme.typography.fontSize * 0.8
  }
});

interface IProps extends WithStyles<typeof styles> {
  tags: ITag[];
}

class Tags extends React.PureComponent<IProps> {

  public render() {
    const { classes } = this.props;
    const tagChips = [];

    for (const tag of this.props.tags) {
      tagChips.push(<Chip
        className={classes.tag}
        key={tag.id}
        label={tag.name}
        component="a"
        clickable={true}
      />);
    }

    return (
      <div className={classes.tagsContainer}>
        {tagChips}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Tags);