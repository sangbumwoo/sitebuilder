import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onCloseModalContent(evt) {
    evt.stopPropagation(this); // use this to clear eslint error
  }

  onKeyUp = (e) => {
    const { show, onClose } = this.props;
    if (e.which === 27 && show) {
      onClose(e);
    }
  };

  render() {
    const { show, onClose, children } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div
        className="w3-modal"
        style={{ display: 'block' }}
        onClick={onClose}
        role="presentation"
      >
        <div className="w3-modal-content">
          <div className="w3-container" onClick={this.onCloseModalContent} role="presentation">
            <span
              className="w3-button w3-display-topright"
              onClick={onClose}
              role="presentation"
            >
              &times;
            </span>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
