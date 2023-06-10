import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <ul className="social">
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa fa-vk" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-telegram"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <p className="copyright">Copyright &copy; 2022 LuxGame Club - Design: Mr.Radik</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;