import  React from 'react';

function DescendantsBody(props) {

    var {rows} = props;

    if(!rows) rows = [];

    return ( 
        <div> {rows.length + ' test'} 
        </div>
    );

}


export default DescendantsBody;