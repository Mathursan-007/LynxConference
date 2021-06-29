import React  from 'react';

function ConferenceDetailsRequest(props){


    return(


        <div>
            <h2>{props.request.details.name}</h2>
            <p>{props.request.details.institute}</p>
            <p>{props.request.details.faculty}</p>
            <p><b>From:</b>{props.request.details.start_date}</p>
            <p><b>To:</b>{props.request.details.end_date}</p>
            <p><b>Description:</b><br/>{props.request.details.description}</p>
            <p><b>Last modified:</b>{props.request.last_modified}</p>
        </div>


    )


}


export default ConferenceDetailsRequest;