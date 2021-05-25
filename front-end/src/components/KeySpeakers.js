import React from 'react'
import '../styles/keyspeakers.css'
import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/js/bootstrap.js';

class KeySpeakers extends React.Component{
    render() {
        return(

               <div>
                   <div className='container'>

                       <input type="radio" name="r" id='r1' checked/>
                           <input type="radio" name="r" id='r2'/>
                               <input type="radio" name="r" id='r3'/>
                                   <input type="radio" name="r" id='r4'/>

                                       <div className='Slider'>
                                           <div className='slide One'>
                                               <div className='Content'>
                                                   <div>
                                                       <h2>This Is Title Section One</h2>
                                                       <p>
                                                           Lorem Ipsum is simply dummy text of the printing and
                                                           typesetting industry.
                                                       </p>
                                                       <a href="#">Learn More</a>
                                                   </div>
                                               </div>
                                               <div className="ImageContent">
                                                   <img
                                                       src="https://4.bp.blogspot.com/-UupKb9CWLpw/XxDCvhfcKrI/AAAAAAAAAHY/YR1_o8AieFIktkzRKigxqOnMm7auHX7MACNcBGAsYHQ/s1600/image07.jpg"/>
                                               </div>
                                           </div>
                                           <div className='slide Two'>
                                               <div className='Content'>
                                                   <div>
                                                       <h2>This Is Title Section Two</h2>
                                                       <p>
                                                           Lorem Ipsum is simply dummy text of the printing and
                                                           typesetting industry.
                                                       </p>
                                                       <a href="#">Learn More</a>
                                                   </div>
                                               </div>
                                               <div className="ImageContent">
                                                   <img
                                                       src="https://3.bp.blogspot.com/-E_nTly2KMCg/XxDB0PG4E9I/AAAAAAAAAHQ/fBEhedzDQ2YMqmUoPsTfh19xbm7gvFWVgCPcBGAsYHg/s1600/image08.jpg"/>
                                               </div>
                                           </div>
                                           <div className='slide Three'>
                                               <div className='Content'>
                                                   <div>
                                                       <h2>This Is Title Section Three</h2>
                                                       <p>
                                                           Lorem Ipsum is simply dummy text of the printing and
                                                           typesetting industry.
                                                       </p>
                                                       <a href="#">Learn More</a>
                                                   </div>
                                               </div>
                                               <div className="ImageContent">
                                                   <img
                                                       src="https://3.bp.blogspot.com/-_HHywRbdSvs/XwygqxQom9I/AAAAAAAAAHI/wasuf6tD9FgfWAuqvLXh729-myCavjnCQCPcBGAYYCw/s1600/image11.jpg"/>
                                               </div>
                                           </div>
                                           <div className='slide Foor'>
                                               <div className='Content'>
                                                   <div>
                                                       <h2>This Is Title Section Foor</h2>
                                                       <p>
                                                           Lorem Ipsum is simply dummy text of the printing and
                                                           typesetting industry.
                                                       </p>
                                                       <a href="#">Learn More</a>
                                                   </div>
                                               </div>
                                               <div className="ImageContent">
                                                   <img
                                                       src="https://1.bp.blogspot.com/-Ra13YXIWa44/XxDC37uvHxI/AAAAAAAAAHc/-u3dbTuI_O871A0b0uK03bkVqkXAkf2EwCNcBGAsYHQ/s320/image04.jpg"/>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="Navigation">
                                           <label htmlFor='r1'><span></span></label>
                                           <label htmlFor='r2'><span></span></label>
                                           <label htmlFor='r3'><span></span></label>
                                           <label htmlFor='r4'><span></span></label>
                                       </div>
                   </div>
               </div>





        )
    }


}