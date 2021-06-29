import React from 'react';
function KeynoteRequest(props) {


    return (
        <div>
            <img src={props.request.details.photo} width={200} height={200}/>
            <h2>{props.request.details.name}</h2>
            <p><b>Last modified:</b>{props.request.details.description}</p>
        </div>
    )


}


export default KeynoteRequest;