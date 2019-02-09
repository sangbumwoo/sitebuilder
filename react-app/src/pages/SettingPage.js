import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Example from '../components/Example';
import TrickInput from '../components/TrickInput';
import Calculator from '../components/Calculator';

function Child({ onAction, onResetAction }) {
  return (
    <div>
      <button onClick={onAction} type="button">
        {' '}
        Click Me!
      </button>
      <button type="button" onClick={onResetAction}>
        Reset
      </button>
    </div>
  );
}
Child.propTypes = {
  onAction: PropTypes.func.isRequired,
  onResetAction: PropTypes.func.isRequired
};

class CountingParent extends React.Component {
  state = {
    actionCount: 0
  };

  handleAction = () => {
    // const { actionCount } = this.state;
    // console.log('Child says', action);
    // this.setState(
    //   { actionCount: actionCount + 1 }
    // );

    this.setState(state => ({ actionCount: state.actionCount + 1 }));
  };

  handleResetAction = () => {
    this.setState(
      { actionCount: 0 }
    );
  };

  render() {
    const { actionCount } = this.state;
    return (
      <div>
        <Child onAction={this.handleAction} onResetAction={this.handleResetAction} />
        {' '}
        <p>
          Clicked
          {' '}
          {actionCount}
          {' '}
          times
        </p>
      </div>
    );
  }
}

const SettingPage = withRouter(({ match }) => (
  <div>
    <Calculator />
    TrickInput :
    <TrickInput />
    Example Input :
    <Example />
    <div>
      {match.params.boardId}
      {' '}
      - SettingPage
    </div>
    <CountingParent />
  </div>
));

export default SettingPage;
