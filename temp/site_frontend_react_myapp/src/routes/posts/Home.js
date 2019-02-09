import React from 'react';

const Home = ({match}) => {
    return (
        <div>
          Home : {match.params.post} 
        </div>
    );
};

export default Home;