import React  from 'react';
function NewsRequest(props){



    return(


        <div>
            <h3>{props.request.details.name}</h3>
            <p>{props.request.details.description}</p>
            <p>{props.request.last_modified}</p>
        </div>


    )


}


export default NewsRequest;