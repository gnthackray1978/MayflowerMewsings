import  React from 'react';

function FDDescendantsBody(props) {

    var {rows} = props;

    if(!rows) rows = [];

    return ( 
        <div> {rows.length} 
        </div>
    );


}


export default FDDescendantsBody;