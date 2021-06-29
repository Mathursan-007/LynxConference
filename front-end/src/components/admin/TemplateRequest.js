import React  from 'react';
function TemplateRequest(props){



    return(


        <div>
            <h2>{props.request.details.name}</h2>
            <a href={props.request.details.file} style={{color:'blue'}}>Download</a>
            <p><b>Last modified:</b>{props.request.last_modified}</p>
        </div>


    )


}


export default TemplateRequest;