import React from 'react';
import StacksChart from "./StacksChart";
import SubmissionsChart from "./SubmissionsChart";



class Analytics extends React.Component{


    constructor(props) {

        super(props);

    }


    render() {

        return(

            <div className={"row"}>
                <StacksChart/>
                <SubmissionsChart/>
            </div>

        )


    }


}

export default Analytics;