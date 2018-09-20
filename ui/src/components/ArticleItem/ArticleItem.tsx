import { StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { IItem } from 'types';

type ClassNames = 'description' | 'content';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  description: {
    marginBottom: 12
  },
  content: {
    whiteSpace: 'pre-wrap'
  }
});

interface IProps extends WithStyles<typeof styles> {
  item: IItem;
}

class ArticleItem extends React.PureComponent<IProps> {

  public item: IItem = this.props.item;

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    const item = this.props.item;

    return [
      <Typography variant="headline" component="h2" key="title">{item.title}</Typography>,
      <Typography className={classes.description} color="textSecondary" key="description">{item.description}</Typography>,
      <p key="content" className={"ql-editor " + classes.content} dangerouslySetInnerHTML={{ __html: item.content }} />
    ];
  }
}

export default withStyles(styles, { withTheme: true })(ArticleItem);