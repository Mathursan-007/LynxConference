import React from 'react';
import axios from "axios";
import Upload from "./Upload";
import {Pie,Bar,Doughnut} from 'react-chartjs-2'



class Uploads extends React.Component{


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

                papers.map(paper=>{
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


        let labels=[]
        this.state.stacks.map(stack=>{
            if(labels.includes(stack.toString())==false){
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
                         label:this.state.date,
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
                         ]
                     }
                 ]

            }



        return(

            <div>
                {/*<table>*/}
                {/*    <tr>*/}
                {/*        <thead>*/}
                {/*        <th>ID</th>*/}
                {/*        <th>Type</th>*/}
                {/*        <th>Status</th>*/}
                {/*        </thead>*/}
                {/*    </tr>*/}
                {/*    <tbody>*/}
                {/*    {this.state.uploads.map(upload=>{*/}
                {/*        return <Upload upload={upload} key={upload._id}/>*/}
                {/*    })*/}
                {/*    }*/}
                {/*    </tbody>*/}
                {/*</table>*/}

                  <Pie options={options} data={data}/>
            </div>

        )


    }


}

export default Uploads;