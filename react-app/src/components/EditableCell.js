import React from 'react';
import PropTypes from 'prop-types';

class EditableCell extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    modifyValue: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      changedValue: null
    };
  }

  changeValue = (ev) => {
    this.setState({ changedValue: ev.target.value });
  }

  checkEndChanging = (ev) => {
    const { modifyValue } = this.props;
    const { changedValue } = this.state;
    if (ev.key === 'Enter') {
      this.setState(
        { editing: false },
        () => {
          modifyValue(changedValue);
        }
      );
    }
  }

  startEditing = () => {
    const { value } = this.props;
    this.setState({ editing: true, changedValue: value });
  }

  render() {
    const { editing, changedValue } = this.state;
    const { value } = this.props;

    return (
      <div className="EditableCell">
        {editing
          ? (
            <input
              type="text"
              value={changedValue}
              onChange={this.changeValue}
              onKeyPress={this.checkEndChanging}
            />
          )
          : (
            <div className="value" onClick={this.startEditing} role="presentation">
              {value}
            </div>
          )
        }
      </div>
    );
  }
}

export default EditableCell;
