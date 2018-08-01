import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { withRouter } from 'react-router'
import { compose } from 'recompose';
import { history } from 'store'
import styled from 'styled-components';

type ClassNames = 'flex';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  flex: {
    flexGrow: 1,
  }
});

interface IProps extends WithStyles<typeof styles> {
  match: any
  location: any,
  history: any,
  theme: any
}

interface IState {
  value: number,
}

class NavBar extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.deduceTabValue()
    }
  }

  public handleChange = (event: any, value: any) => {
    this.setState({ value });

    if (value === 0) {
      history.push('/');
    } else if (value === 1) {
      history.push('/tags');
    }

  };

  public render() {

    const { classes } = this.props;
    const { theme } = this.props;

    const StyledTabs = styled(Tabs)`
      background: ${theme.palette.secondary.main}
    `;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            HatsuPortal
            </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        <StyledTabs value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
        >
          <Tab label="Items" />
          <Tab label="Tags" />
        </StyledTabs>
      </AppBar>
    )
  }

  private deduceTabValue = () => {
    if (this.props && this.props.location) {
      const path = this.props.location.pathname;
      if (path === '/') {
        return 0;
      }
      else if (path === '/tags') {
        return 1;
      }
      else {
        return 0;
      }
    } else {
      return 0;
    }
  };
}

export default compose(
  withTheme(),
  withStyles(styles)
)(withRouter(NavBar));