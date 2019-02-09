import React from 'react';
import PropTypes from 'prop-types';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  handleChange = (e) => {
    const { onTemperatureChange } = this.props;
    onTemperatureChange(e.target.value);
  }

  render() {
    const { temperature, scale } = this.props;
    return (
      <fieldset>
        <legend>
          Enter temperature in
          {' '}
          {scaleNames[scale]}
          :
        </legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}

TemperatureInput.propTypes = {
  scale: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  onTemperatureChange: PropTypes.func.isRequired
};

export default TemperatureInput;
