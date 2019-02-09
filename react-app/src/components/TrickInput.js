import React from 'react';

class TrickInput extends React.Component {
  state = { text: 'try typing something' };

  handleChange = () => {
    this.setState({ text: 'haha nope' });
  };

  render() {
    const { text } = this.state;
    return (
      <input type="text" value={text} onChange={this.handleChange} />
    );
  }
}

export default TrickInput;
