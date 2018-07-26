import * as React from 'react';

class RootLayout extends React.Component {
  public render() {
    return [
      (
        <div key="main" role="main">
          {this.props.children}
        </div>
      )
    ];
  }
}

export default RootLayout;