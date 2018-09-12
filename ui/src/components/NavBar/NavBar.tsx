import AppBar from '@material-ui/core/AppBar';
import { Theme } from '@material-ui/core/styles';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginModal from 'components/LoginModal';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

type ClassNames = 'navRoot' | 'flex' | 'toolbar' | 'tabs' | 'tabsIndicator';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  navRoot: {
    boxShadow: 'none'
  },
  flex: {
    flexGrow: 1
  },
  toolbar: {
    background: theme.palette.secondary.main
  },
  tabs: {
    background: theme.palette.primary.main
  },
  tabsIndicator: {
    height: 5
  }
});

interface IProps extends RouteComponentProps<string>, WithStyles<typeof styles> { }

interface IState {
  value: number;
}

class NavBar extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.deduceTabValue()
    };
  }

  public handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    this.setState({ value });

    if (value === 0) {
      this.props.history.push('/');
    } else if (value === 1) {
      this.props.history.push('/calendar');
    }

  }

  public render() {
    const { classes } = this.props;

    return (
      <AppBar
        position="static"
        classes={{ root: classes.navRoot }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            HatsuPortal
          </Typography>
          <LoginModal />
        </Toolbar>
        <Tabs value={this.state.value}
          onChange={this.handleChange}
          classes={{ root: classes.tabs, indicator: classes.tabsIndicator }}
        >
          <Tab label="Items" />
          <Tab label="Calendar" />
        </Tabs>
      </AppBar>
    );
  }

  private deduceTabValue = () => {
    const path = this.props.location.pathname;
    if (path === '/') {
      return 0;
    }
    else if (path.includes('items')) {
      return 0;
    }
    else {
      return -1;
    }
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(NavBar));