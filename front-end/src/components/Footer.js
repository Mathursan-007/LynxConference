import React from "react";
import '../styles/footer.css'
class Footer extends React.Component {
    render() {
        return (
            <div className="footer-basic s">
                <footer>
                    <div className="social">
                        <a href="#"><i className="fa fa-facebook text-light"></i></a>
                        <a href="#"><i className="fa fa-twitter text-light"></i></a>
                        <a href="#"><i className="fa fa-instagram text-light"></i></a>
                        <a href="#"><i className="fa fa-linkedin text-light"></i></a>
                        <br/><br/>
                        <h2>Contact Us</h2>
                        <hr class='hrStyles'/>
                        <p>Software Engineering Research Unit, Faculty of Computing, Lynx Institute, Sri Lanka</p>
                        <p>Telephone: +94 71 238 9567 | Email: lynx@gmail.com</p>
                        <p className="copyright">© 2021 Lynx Institute. All Rights Reserved</p>
                    </div>
                </footer>
            </div>
        );
    }
}
export default Footer;