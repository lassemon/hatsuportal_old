import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { IRootState } from 'types';


export interface IProps {}

export interface IState {}

interface IActionProps {
}

class Test extends React.Component<IProps & IActionProps, IState> {
  
  public render() {
    return (
      <div>
        I am test
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): Partial<IProps> => {
  return {
  }
};

// Turns an object whose values are action creators, into an object with the same keys,
// but with every action creator wrapped into a dispatch call so they may be invoked directly.
const mapDispatchToProps = (dispatch: Dispatch<Action>): IActionProps => {
  return bindActionCreators({
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
