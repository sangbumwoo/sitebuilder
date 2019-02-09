import React from 'react';

const Save = ({match}) => {
    return (
        <div>
          Save - { match.params.id } 
        </div>
    );
};

export default Save;