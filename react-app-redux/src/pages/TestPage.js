import React from 'react';
import PropTypes from 'prop-types';
import Config from '../Config';

const ListItem = ({ item, onItemClick }) => {
  const handleClick = () => {
    onItemClick(item.id);
  };

  return (
    <li onClick={handleClick} role="presentation">
      {item.name}
    </li>
  );
};
ListItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  onItemClick: PropTypes.func.isRequired
};

const List = ({ items }) => {
  const handleClick = (itemId) => {
    console.log('onItemClick in List', itemId);
  };
  return (
    <ul>
      {items.map(item =>
        <ListItem key={item.id} item={item} onItemClick={handleClick} />)}
    </ul>
  );
};
List.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired
};

const TestPage = () => {
  console.log('Config.someData : ', Config.someData);
  const items = [
    { id: 'a1', name: 'react' },
    { id: 'a2', name: 'angular' }
  ];
  return (
    <div>
      <h1>
          TestPage
      </h1>
      <List items={items} />
    </div>
  );
};
export default TestPage;
