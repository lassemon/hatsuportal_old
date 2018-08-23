import { globalError as globalErrorAction } from 'actions/error';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IError, IErrorState, IRootState } from 'types';
import ErrorModal from './ErrorModal';

interface IActionProps {
  globalErrorAction: typeof globalErrorAction;
}

interface IProps {
  globalError: IError;
}

class ErrorModalContainer extends React.Component<IActionProps & IProps, IErrorState> {

  public constructor(props: IActionProps & IProps) {
    super(props);
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.globalErrorAction({ title: 'Oh no!', message: errorInfo.componentStack });
  }

  public render() {
    return (
      this.props.globalError ?
        (
          <div>
            <ErrorModal error={this.props.globalError} />
          </div>
        ) :
        (
          this.props.children
        )
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IErrorState> => {
  return {
    globalError: state.error.globalError
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators(
    { globalErrorAction },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModalContainer);