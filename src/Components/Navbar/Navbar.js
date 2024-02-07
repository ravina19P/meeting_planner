import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightToBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const userInfoString = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userInfoString);
    useEffect(() => {
        const userInfo = localStorage.getItem("userinfo");
        if (userInfo !== null) {
            setIsLogin(true)
        }
    }, [])
    const logout = () => {
        localStorage.clear();
        window.location.href = "/Login"

    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <div className="container-fluid">
                    {userInfo !== null &&
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to='/Dashboard'>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/packages">Packages</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/activations">Activations</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/clients">Clients</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/rooms">Rooms</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookRoom">Book Room</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookingCalander">Booking Calander</Link>
                            </li>
                        </ul>
                    }
                    <ul className="navbar-nav">
                        {isLogin && <Link className="nav-link" >
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faUserCircle} style={{ color: 'white', fontSize: '25px', marginRight: '10px' }} />
                                    <span style={{ color: 'white', fontSize: '15px', marginRight: '10px' }}>{userInfo.userName}</span>
                                </div>
                                <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: 'white', fontSize: '25px' }} onClick={() => logout()} />
                            </div>
                        </Link>}
                        {!isLogin && <li className="nav-item">
                            <Link className="nav-link" to="/Login">
                                <FontAwesomeIcon icon={faUser} style={{ color: 'white', fontSize: '25px' }} />
                            </Link>
                        </li>}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
