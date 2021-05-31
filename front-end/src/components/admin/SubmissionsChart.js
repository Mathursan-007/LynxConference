import React from 'react';
import axios from "axios";
import {Scatter,Line} from 'react-chartjs-2'



class SubmissionsChart extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            submissions:[]

        }
    }

    componentDidMount() {

        console.log(new Date())


        axios.get("http://localhost:5000/admin/uploads")
            .then(response=>{

                console.log(response.data)
                response.data.map(upload=>{
                    console.log(upload.date)
                })


            })
            .catch(error=>{
                console.log(error)
            })

    }



    render() {

        const options={

            maintainAspectRatio:true,
            title:{
                display:"Stacks",
                text:'Different types of stacks used by researchers',
                fontSize:25
            },
            legend:{
                display:"no",
                position:"bottom"
            }

        }


        const data={

            labels:['a','b','c','d','e'],
            datasets:[
                {
                    label:"hh",
                    data:[
                        54,100,310,218,112
                    ],
                    backgroundColor:[
                        'rgba(255,99,132,0.87)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(230,189,87,0.6)',
                    ]
                },
                {
                    label:"h",
                    data:[
                        54,105,77,218,12
                    ],
                    backgroundColor:[
                        'rgba(255,99,132,0.87)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(230,189,87,0.6)',
                    ]
                }
            ],

        }



        return(

            <div>
                <Line options={options} data={data}/>
            </div>

        )
    }


}

export default SubmissionsChart;