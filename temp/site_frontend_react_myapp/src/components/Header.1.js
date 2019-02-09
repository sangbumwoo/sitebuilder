// import React from 'react';
// import {NavLink, Switch} from 'react-router-dom'
// import './Header.css';

// const posts = [
//     { title: 'react.js', type:'page' }, // type: page, list, tabs ...
//     { title: 'vue.js', type: 'list' },
//     { title: 'angular.js', type: 'tabs' },
// ]

// const listItems = posts.map(post => (
//   <NavLink
//     className="item"
//     key={post.title}
//     activeClassName="active"
//     to={`/posts/${post.title}/${post.type}`}
//   >
//     {post.title}
//   </NavLink>
// ));

// const Header = () => {
//     return <div>
//         <div className="header">
//           <NavLink to="/" className="item" exact activeClassName="active">
//             Home
//           </NavLink>
//           <NavLink to="/about/velopert" className="item" activeClassName="active">
//             About
//           </NavLink>
//           {/* <NavLink to="/posts" className="item" activeClassName="active">
//             Post
//           </NavLink>
//           <NavLink className="item" activeClassName="active" to="/posts/summit/page">
//             summit
//           </NavLink> */}
//           {listItems}
//         </div>
//       </div>;
// };

// export default Header;


import React, { Component } from 'react';
import { NavLink, Switch } from 'react-router-dom'
import './Header.css';

class Header extends Component {

    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    constructor(props) {

        // super(props);

        // const posts = [{ title: "react.js", type: "page" }, { title: "vue.js", type: "list" }, { title: "angular.js", type: "tabs" }]; // type: page, list, tabs ...

        // props.listItems = posts.map(post => console.log('aaa', post) ||  (
        //   <NavLink
        //     className="item"
        //     key={post.title}
        //     activeClassName="active"
        //     to={`/posts/${post.title}/${post.type}`}
        //   >
        //     {post.title}
        //   </NavLink>
        // ));
    }

    render() {
        return (
            <div>

                    <div className="header">
                        <NavLink to="/" className="item" exact activeClassName="active">
                            Home
          </NavLink>
                        <NavLink to="/about/velopert" className="item" activeClassName="active">
                            About
          </NavLink>
                        {/* <NavLink to="/posts" className="item" activeClassName="active">
            Post
          </NavLink>
          <NavLink className="item" activeClassName="active" to="/posts/summit/page">
            summit
          </NavLink> */}
                        {this.listItems}
                    </div>
                          
            </div>
        )
    };
    componentDidMount() {




    }
}

export default Header;