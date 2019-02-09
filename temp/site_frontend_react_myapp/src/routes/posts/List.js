import React from 'react';



const posts = [
    { title: 'react.js', type: 'page' }, // type: page, list, tabs ...
    { title: 'vue.js', type: 'list' },
    { title: 'angular.js', type: 'tabs' },
]

const listItems = posts.map(post => 
    (
        <li
            key={post.title}
            to={`/posts/${post.title}/${post.type}`}
        >
            {post.title}
        </li>
    )
);

const List = ({match}) => {
return (
  <div>
    <div>List : {match.params.post}</div>
    <div>LIST</div>
    <ul>
      {listItems}
    </ul>
  </div>
);
};

export default List;