import React from "react";
import '../styles/footer.css'
class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="footer-basic s text-center" >


                        <h3>Contact Us</h3>

                        <p>Software Engineering Research Unit, Faculty of Computing, SLIIT UNI, Sri Lanka</p>
                        <p>Telephone: +94 71 238 9567 | Email:  sliit@gmail.com</p>


                        <div className="social" >
                            <a href="#"><i className="fa fa-facebook text-light"></i></a>
                            <a href="#"><i className="fa fa-twitter text-light"></i></a>
                            <a href="#"><i className="fa fa-instagram text-light"></i></a>
                            <a href="#"><i className="fa fa-linkedin text-light"></i></a>
                        </div>
                        <br/>


                        <p className="copyright" >© 2021 Lynx Institute. All Rights Reserved</p>

                    </div>
                </footer>
            </div>

        );
    }
}
export default Footer;
