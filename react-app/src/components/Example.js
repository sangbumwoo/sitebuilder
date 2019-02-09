import React from 'react';

class Example extends React.Component {
  state = { text: '' };

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    const { text } = this.state;
    return (
      <input type="text" value={text} onChange={this.handleChange} />
    );
  }
}

export default Example;
