import React from 'react';
import {NavLink} from 'react-router-dom';

const TopMenus = (props) => {
    return props.menus.map(menu => {
        return (
            <NavLink
                className="w3-bar-item w3-button"
                to={menu.to}
                activeStyle={{ color: "green" }}
                key={menu.title}
            >
                {menu.title}
            </NavLink>
        );
    });
};

export default TopMenus;