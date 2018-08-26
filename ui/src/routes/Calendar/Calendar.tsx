import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

interface IProps {
  error: boolean;
  loading: boolean;
}

class CalendarView extends React.Component<IProps> {

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const loading = false;

    return (
      <div>
        {loading ? (
          <CircularProgress size={25} />
        ) : (
            <span>TODO: Implement Calendar</span>
          )}
      </div>
    );
  }
}

export default CalendarView;
