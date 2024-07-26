import React, { useEffect, useState } from 'react';
import bg1 from '../images/bg1.png';
import bg2 from '../images/bg2.png';
import bg3 from '../images/bg3.png';
import { NavLink, useNavigate, Link } from 'react-router-dom';
const HomePage = () => {

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!localStorage.getItem("token"))
    //         navigate("/signup");
    // }, []);
    const navigate = useNavigate();
    const [showChatWindow, setShowChatWindow] = useState(false);

    const toggleChatWindow = () => {
        setShowChatWindow(!showChatWindow);
    };

    return (
        <>
            {/* <!-- Main header --> */}

            <div className="container-fluid main_header">
                <div className="row">
                    <div className="col-md-10 col-12 mx-auto">
                        <div className="row">

                            {/* <!-- left side div --> */}

                            <div className="col-md-6 col-12 main_header_left">
                                <Link to="/suggest"> <button>Suggest A Car</button></Link>
                                <br /><br />
                                <Link to="/predict"> <button>Predict Car Price</button></Link>
                                <br /><br />
                                <Link to="/rent"> <button>Rent A Car</button></Link>
                            </div>

                            {/* <!-- right side div --> */}

                            <div className="col-md-6 col-12 main_header_right">
                                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img className="w-100" src={bg1} alt="First slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="w-100" src={bg2} alt="Second slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="w-100" src={bg3} alt="Third slide" />
                                        </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat window */}
            {showChatWindow && (
                <div className="chat-window">
                    <iframe
                        src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=cbed452d-aff1-4944-9f07-280a82a3aa21"
                        title="Chat Window"
                        width="100%"
                        height="100%"
                    />
                </div>
            )}

            {/* Chat icon */}
            <div className="chat-icon-container"
                onClick={toggleChatWindow}>
                <img src='https://github.com/M-Saif-ARG/smartcarmatch/blob/master/frontend/src/images/chat.png?raw=true'
                    alt="Chat"
                    className="chat-icon" />
            </div>

        </>
    );
};

export default HomePage;