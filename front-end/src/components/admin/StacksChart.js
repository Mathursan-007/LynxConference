import React from 'react';
import axios from "axios";
import {Pie} from 'react-chartjs-2'
import '../../styles/analytics.css'



class StacksChart extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            stacks:[]

        }
    }

    componentDidMount() {

        axios.get("http://localhost:5000/admin/uploads")
            .then(response=>{

                let papers=response.data.filter(upload=>{
                    return upload.type=="research"
                })

                let stacks=[]


                papers.map(paper=>{                                 //retrieving stacks from papers
                    //console.log(paper.stacks.split(","))
                    paper.stacks.split(",").map(stack=>{
                        stacks.push(stack)
                    })
                })



                this.setState({stacks:stacks})

            })
            .catch(error=>{
                console.log(error)
            })

    }



    render() {

        const options={

            maintainAspectRatio:false,
            plugins: {
                title: {
                    display: true,
                    text: 'Stacks used by researchers',
                    color:'#fff',
                    font:{
                        size:18
                    }
                },
                legend: {
                    labels: {
                        color:'#fff'
                    }
                }
            }

        }


        let labels=[]
        this.state.stacks.map(stack=>{
            if(labels.includes(stack.toString())==false){     //graph labels
                labels.push(stack)
            }
        })

        let counts=labels.map(label=>{
            let count=0
            this.state.stacks.map(stack=>{
                if(label==stack){
                    count++
                }
            })
            return count
        })

        const data={

            labels:labels,
            datasets:[
                {
                    data:[
                        ...counts
                    ],
                    backgroundColor:[
                        'rgba(255,99,132,0.87)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(230,189,87,0.6)',
                        'rgba(156,230,87,0.6)',
                        'rgba(87,230,192,0.6)',
                        'rgba(230,128,87,0.6)',
                        'rgba(233,229,222,0.6)',
                        'rgba(230,132,87,0.6)',
                        'rgba(223,230,87,0.6)',
                        'rgba(6,255,236,0.86)',
                        'rgba(234,5,5,0.6)',
                        'rgba(87,63,1,0.6)',
                        'rgba(230,87,163,0.6)',
                        'rgba(192,179,185,0.61)',
                        'rgba(3,62,187,0.6)',
                        'rgba(244,124,3,0.6)',
                        'rgba(187,87,230,0.6)',
                        'rgba(230,227,219,0.6)',
                        'rgba(255,3,3,0.6)',
                        'rgba(87,230,101,0.6)',
                        'rgba(6,237,204,0.6)'
                    ],
                    hoverBorderColor:'black'

                }
            ],


        }



        return(



            <div className="card col-md-6 mt-5 ml-4 mr-4"  style={{height: "80vh",maxWidth: "80vh",backgroundColor:'#0b0b8a'}}>
                <Pie options={options} data={data}/>
            </div>

        )


    }


}

export default StacksChart;