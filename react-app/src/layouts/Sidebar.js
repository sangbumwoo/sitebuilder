import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

function searchTree(element, matchingTitle) {
  if (element.path === matchingTitle) {
    return element;
  } if (element.children != null) {
    let i;
    let result = null;
    for (i = 0; result == null && i < element.children.length; i += 1) {
      result = searchTree(element.children[i], matchingTitle);
    }
    return result;
  }
  return null;
}

const Sidebar = withRouter(({ match, menus }) => {
  if (menus.length === 0) {
    return null;
  }

  let i = 0;
  let mIndex = -1;
  for (i = 0; i < menus.length; i += 1) {
    const result = searchTree({ title: 'root', children: menus[i].children }, match.params.boardId);
    // console.log('result', i, match.params.boardId, result);
    if (result) {
      mIndex = i;
      break;
    }
  }
  // console.log(mIndex);
  if (mIndex === -1) {
    return (
      <div className="w3-container w3-col m3">
        side
      </div>);
  }

  return (
    <div className="w3-container w3-col m3">
      {/* {match.params.boardId} */}
      <ul className="w3-ul">
        {menus[mIndex].children.map(menu => (menu.children.length > 0
          ? (
            <li key={menu.id}>
              {menu.title}
              <ul className="w3-ul">
                {menu.children.map(subMenu => (
                  <NavLink
                    key={subMenu.id}
                    to={`/${subMenu.path}/${subMenu.type}`}
                    activeClassName="w3-pink"
                    style={{ display: 'block' }}
                  >
                    {subMenu.title}
                  </NavLink>
                ))}
              </ul>
            </li>
          )
          : (
            <li className="w3-display-container" key={menu.id}>
              <NavLink
                to={`/${menu.path}/${menu.type}`}
                activeClassName="w3-pink"
                style={{ display: 'block' }}
              >
                {menu.title}
              </NavLink>
              {' '}
            </li>
          )
        ))}
      </ul>
      {' . '}
    </div>
  );
});

export default Sidebar;
