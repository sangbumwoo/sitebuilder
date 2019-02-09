import React from 'react';
import PropTypes from 'prop-types';

const FullLayout = ({ children }) => (
  <div className="w3-row" style={{ maxWidth: 960, margin: '0 auto' }}>
    <div className="w3-container w3-col m12 w3-padding">
      {children}
    </div>
  </div>
);
FullLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default FullLayout;
