import React, { useEffect, useState } from 'react';
import { GetAdminDashboardData } from '../Other/Common';
import styles from './Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    let [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        GetAdminDashboardData().then((data) => {
            setDashboardData(data)
            console.log(data);
        });
        GetAdminDashboardData();
    }, [])

    return (
        <div>
            <div className={`${styles.sidebar}`}>
                <a href="#home"><FontAwesomeIcon icon={faHome} style={{ fontSize: '15px' }} /> Home</a>
                <a href="#services"><FontAwesomeIcon icon={faWrench} style={{ fontSize: '15px' }} /> Services</a>
                <a href="#clients"><FontAwesomeIcon icon={faUser} style={{ fontSize: '15px' }} /> Clients</a>
                <a href="#contact"><FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '15px' }} /> Contact</a>
            </div>
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <div className={`card mt-3`}>
                            <div className='card-header bg-success'>
                                <h5 className="custom-text">Admin Dashboard</h5>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Package Name</th>
                                            <th>client Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="col-5">
                        <div className={`card mt-3`}>
                            <div className='card-header bg-success'>
                                <h5 className="custom-text">ClientAdmin Dashboard</h5>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Package Name</th>
                                            <th>client Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className={`card mt-3`}>
                            <div className='card-header bg-success'>
                                <h5 className="custom-text">Client User Dashboard</h5>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Package Name</th>
                                            <th>client Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



