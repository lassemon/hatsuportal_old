import * as React from 'react';
import './Spinner.scss';

class Spinner extends React.Component {
  public render() {
    return (
      <div>
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    );
  }
}

export default Spinner;