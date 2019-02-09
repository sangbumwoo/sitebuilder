import React from 'react';

const Home = ({history}) => {
    return (
        <div>
          Home  
          <button onClick={()=> history.push('/posts') }>posts</button>
        </div>
    );
};

export default Home;Home