import React from 'react';

function WorkshopRequest(props) {
    return (
        <div>
            <h1>{props.request.details.name}</h1>
            <p>{props.request.details.description}</p>
        </div>
    )
}

export default WorkshopRequest;