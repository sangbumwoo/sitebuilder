import React from 'react';

const Tabs = ({match}) => {
    return (
        <div>
            Tabs     : {match.params.post} 
        </div>
    );
};

export default Tabs;