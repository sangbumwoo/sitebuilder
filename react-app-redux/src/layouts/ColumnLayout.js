import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const ColumnLayout = ({ children, menus }) => (
  <div className="w3-row" style={{ maxWidth: 960, margin: '0 auto' }}>
    <Sidebar menus={menus} className="w3-container w3-col m3" />
    <div className="w3-container w3-col m9">
      {children}
      {/* {menus.map((menu) => {
        console.log(menu.title);
        return null;
      })} */}
    </div>
  </div>
);
ColumnLayout.propTypes = {
  children: PropTypes.element.isRequired,
  menus: PropTypes.instanceOf(Array).isRequired
};

export default ColumnLayout;
