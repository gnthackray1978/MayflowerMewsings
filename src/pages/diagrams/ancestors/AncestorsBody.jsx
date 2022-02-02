import  React from 'react';

function AncestorsBody(props) {

    var {rows} = props;

    if(!rows) rows = [];

    return ( 
        <div> {rows.length} 
        </div>
    );
}


export default AncestorsBody;