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

            maintainAspectRatio:false,
            animations: {
                tension: {
                    easing: 'linear',
                    from: 1,
                    to: 0
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Submission over last 5 days',
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
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Days',
                        color: '#fff',
                        font: {
                            family: 'Times',
                            size: 20,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: {top: 20, left: 0, right: 0, bottom: 0}
                    },
                    ticks:{
                        color:'#fff',
                    }
                }, y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Number of Submissions',
                        color: '#fff',
                        font: {
                            family: 'Times',
                            size: 20,
                            style: 'bold',
                            lineHeight: 1.2
                        },
                        padding: {top: 20, left: 0, right: 0, bottom: 0}
                    },
                    ticks:{
                      color:'#fff'
                    }
                }


            },
            responsive: true


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
            ]
    }





        return(


            <div className="card col-lg-6 mt-5 ml-1 mr-2"  style={{height:"80vh",maxWidth:"80vh",backgroundColor:'#0b0b8a'}}>
                <Line options={options} data={data}/>
            </div>

        )
    }


}

export default SubmissionsChart;