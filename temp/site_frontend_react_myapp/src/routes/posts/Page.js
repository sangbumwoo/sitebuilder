import React from 'react';

const Page = ({match}) => {
    return (
        <div>
          Page : {match.params.post} 
        </div>
    );
};

export default Page;