import React  from 'react';
function CallForPaperDetailsRequest(props){



    return(


        <div>
            <h2>{props.request.details.name}</h2>
            <img src={props.request.details.photo}/>
            <p><b>Last modified:</b>{props.request.last_modified}</p>
        </div>


    )


}


export default CallForPaperDetailsRequest;