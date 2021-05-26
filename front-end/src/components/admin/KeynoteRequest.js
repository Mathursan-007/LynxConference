import React from 'react';
function KeynoteRequest(props) {


    return (
        <div>
            <img src={props.request.details.photo} width={200} height={200}/>
            <h1>{props.request.details.name}</h1>
            <p>{props.request.details.description}</p>
        </div>
    )


}


export default KeynoteRequest;