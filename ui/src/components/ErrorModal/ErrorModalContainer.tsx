import * as React from 'react';
import { connect } from 'react-redux';
import { IErrorState, IRootState } from 'types';
import ErrorModal from './ErrorModal';

class ErrorModalContainer extends React.PureComponent<IErrorState> {

  public render() {

    return (
      <div>
        {this.props.globalError &&
          (
            <div>
              <ErrorModal error={this.props.globalError} />
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IErrorState> => {
  return {
    globalError: state.error.globalError
  };
};

export default connect(
  mapStateToProps
)(ErrorModalContainer);