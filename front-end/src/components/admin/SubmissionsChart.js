import React from 'react';
import axios from "axios";
import {Scatter,Line} from 'react-chartjs-2'
import '../../styles/analytics.css'



class SubmissionsChart extends React.Component{


    constructor(props) {
        super(props);
        this.state = {

            submissions:[],
            lastFiveDays:[],
            proposals:[],
            researchPapers:[]

        }
    }

    componentDidMount() {

        let lastFiveDays=[];

        for(let i=5;i>=0;i--){

            let day = new Date();
            day.setDate(day.getDate()-i)
            lastFiveDays.push(day.toDateString())

        }

        this.setState({lastFiveDays:lastFiveDays})
        //console.log()


        axios.get("http://localhost:5000/admin/uploads")
            .then(response=>{

                console.log(response.data)

                let workshops=[]
                let papers=[]

                response.data.map(upload=>{
                    if(this.state.lastFiveDays.includes(upload.date)){
                        if(upload.type=="workshop"){

                            workshops.push(upload)

                        }else if(upload.type=="research"){

                            papers.push(upload)
                        }
                    }
                })


                this.setState({proposals:workshops,researchPapers:papers})

            })
            .catch(error=>{
                console.log(error)
            })

    }



    render() {

        const options={

            maintainAspectRatio:false

        }



        let workshopSubmissions=[0,0,0,0,0,0]
        let researchSubmissions=[0,0,0,0,0,0]



        this.state.proposals.map(proposal=>{

            for(let i=5;i>=0;i--){

                let day = new Date()
                day.setDate(day.getDate()-i)
                if(day.toDateString()==proposal.date){

                    if(i==0){
                        workshopSubmissions[5-i]++;
                    }else if(i==1){
                        workshopSubmissions[5-i]++;
                    }else if(i==2){
                        workshopSubmissions[5-i]++;
                    }else if(i==3){
                        workshopSubmissions[5-i]++;
                    }else if(i==4){
                        workshopSubmissions[5-i]++;
                    }else if(i==5){
                        researchSubmissions[5-i]++;
                    }

                    break;
                }

            }

        })


        this.state.researchPapers.map(paper=>{

            for(let i=5;i>=0;i--){

                let day = new Date()
                day.setDate(day.getDate()-i)
                if(day.toDateString()==paper.date){
                    if(i==0){
                        researchSubmissions[5-i]++;
                    }else if(i==1){
                        researchSubmissions[5-i]++;
                    }else if(i==2){
                        researchSubmissions[5-i]++;
                    }else if(i==3){
                        researchSubmissions[5-i]++;
                    }else if(i==4){
                        researchSubmissions[5-i]++;
                    }else if(i==5){
                        researchSubmissions[5-i]++;
                    }

                    break;
                }

            }

        })



        const data={

            labels:this.state.lastFiveDays,
            datasets:[
                {
                    label:"Workshop",
                    data:[
                        ...workshopSubmissions
                    ],
                    backgroundColor:[
                        'rgba(113,2,18,0.87)',
                    ],
                    borderColor:'rgba(245,6,57,0.87)'
                },
                {
                    label:"Research",
                    data:[
                        ...researchSubmissions
                    ],
                    backgroundColor:[
                        'rgba(1,50,84,0.6)',
                    ],
                    borderColor:'rgba(12,157,237,0.6)'
                }
            ],

        }



        return(


            <div className="card back col-md-6 mt-5 ml-2 mr-2"  style={{height:"80vh",maxWidth:"80vh"}}>
                <Line options={options} data={data}/>
            </div>

        )
    }


}

export default SubmissionsChart;