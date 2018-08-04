import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import styled from 'styled-components';

type ClassNames = 'root';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  root: {
    flexGrow: 1
  }
});

class MainContent extends React.Component<WithStyles<typeof styles>> {
  public render() {
    const Main = styled.main`
      padding: 1em;
    `;

    return (
      <Main>
        {this.props.children}
      </Main>
    );
  }
}

export default withStyles(styles)(MainContent);