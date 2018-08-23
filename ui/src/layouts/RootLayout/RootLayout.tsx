import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import ErrorModal from 'components/ErrorModal';
import NavBar from 'components/NavBar';
import * as React from 'react';
import styled from 'styled-components';

type ClassNames = 'root';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  }
});

class RootLayout extends React.Component<WithStyles<typeof styles>> {

  public render() {
    const { classes } = this.props;
    const Main = styled.main`
      padding: 1em;
    `;

    return (
      <div key="main" className={classes.root} role="main">
        <ErrorModal>
          <NavBar />
          <Main>
            {this.props.children}
          </Main>
        </ErrorModal>
      </div>
    );
  }
}

export default withStyles(styles)(RootLayout);