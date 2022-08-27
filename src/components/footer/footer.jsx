import React from "react";
import logo from "../../logo.png";

const Footer = () => <footer className=" shadow page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
            <a href="/" className="text-dark text-decoration-none">
              <img alt="logo" src={logo} width="30px" />
              <h5 className="text-uppercase">Englishour</h5>
            </a>
                <p>A fun and creative way of learning English</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Englishour</h5>
                <ul className="list-unstyled">
                    <li><a href="/" className="text-decoration-none">Resources</a></li>
                    <li><a href="/" className="text-decoration-none">About Us</a></li>
                    <li><a href="/" className="text-decoration-none">Contact</a></li>
                    <li><a href="/" className="text-decoration-none">Blog</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Help</h5>
                <ul className="list-unstyled">
                    <li><a href="/" className="text-decoration-none">Support</a></li>
                    <li><a href="/" className="text-decoration-none">Sign Up</a></li>
                    <li><a href="/" className="text-decoration-none">Sign In</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022 Copyright:
        <a href="/" className="text-decoration-none"> Englishour.com</a>
    </div>

</footer>

export default Footer;