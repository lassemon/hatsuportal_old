import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Theme, withTheme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux';
import { history } from 'store';
import styled from 'styled-components';

type ClassNames = 'flex' | 'tabs';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  flex: {
    flexGrow: 1
  },
  tabs: {
    background: theme.palette.secondary.main
  }
});

interface IProps extends RouteComponentProps<string>, WithStyles<typeof styles> {
  theme: Theme
}

interface IState {
  value: number
}

class NavBar extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.deduceTabValue()
    }
  }

  public handleChange = (event: React.ChangeEvent<{}>, value: number) => {

    this.setState({ value });

    if (value === 0) {
      history.push('/');
    } else if (value === 1) {
      history.push('/tags');
    }

  };

  public render() {
    const { classes } = this.props;

    const StyledTabs = styled(Tabs)`
        [class*="indicator"]{
          background: white;
        }
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
          className={classes.tabs}
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