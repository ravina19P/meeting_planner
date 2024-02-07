import React, { useEffect, useState } from 'react';
import { GetClientData } from '../Other/Common';
import axios from 'axios';
import '../Other/Common.css';
import myImage from '../images/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Clients = () => {
    let [clientList, setClientList] = useState([]);
    let [clientObj, setclientObj] = useState({
        "clientId": 0,
        "clientName": "",
        "companyName": "",
        "address": "",
        "city": "",
        "pinCode": "",
        "state": "",
        "employeeStrength": 0,
        "gstNo": "",
        "contactNo": ""
    })
    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setisSaveLoader] = useState(false);
    useEffect(() => {
        GetClientData().then((data) => {
            setClientList(data)
            setIsLoader(false);
        });
        GetClientData();
    }, [])

    const changeClientValue = (event, key) => {
        setclientObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const saveClient = async () => {
        setisSaveLoader(true);
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Meeting/AddClients", clientObj);
            setisSaveLoader(false);
            if (result.data.result) {
                alert('Client Created');
                const updatedClientList = await GetClientData();
                setClientList(updatedClientList);
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
            setisSaveLoader(false);
        }

    }
    const onEdit = async (clientId) => {
        try {
            const result = await axios.get(`https://onlinetestapi.gerasim.in/api/Meeting/GetClientsById?id=${clientId}`);
            setclientObj(result.data.data)
            setFormstate(true);
        } catch (error) {
            alert('Error Occuored');
        }


    }
    const onDelete = async (clientId) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.post(`https://onlinetestapi.gerasim.in/api/Meeting/DeleteClients?id=${clientId}`);
            if (result.data.result) {
                alert('Client Deleted');
                const updatedClientList = await GetClientData();
                setClientList(updatedClientList);
            } else {
                alert(result.data.message)
            }
        }
    }
    const updateClient = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateClients', clientObj);
        if (result.data.result) {
            alert('client Updated');
            const updatedClientList = await GetClientData();
            setClientList(updatedClientList);
        } else {
            alert(result.data.message)
        }
    }
    const reset = () => {
        setclientObj({
            "clientId": 0,
            "clientName": "",
            "companyName": "",
            "address": "",
            "city": "",
            "pinCode": "",
            "state": "",
            "employeeStrength": 0,
            "gstNo": "",
            "contactNo": ""
        })
    }
    let [cardview, setCardview] = useState(false);
    const ShowCardView = () => {
        setCardview((prevCardview) => !prevCardview);
    };
    let [formstate, setFormstate] = useState(false);
    const ShowForm = () => {
        setFormstate((prevform) => !prevform);
    }
    return (
        <div className='container'>
            <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/packages">packages</Breadcrumb.Item>
                <Breadcrumb.Item href="/activations">activations </Breadcrumb.Item>
                <Breadcrumb.Item href="/clients" active> clients</Breadcrumb.Item>
                <Breadcrumb.Item href="/user"> user</Breadcrumb.Item>
                <Breadcrumb.Item href="/rooms">rooms </Breadcrumb.Item>
                <Breadcrumb.Item href="/bookRoom"> bookRoom</Breadcrumb.Item>
                <Breadcrumb.Item href="/bookingCalander">bookingCalander </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className='row'>
                    <div className={formstate ? 'col-8' : 'col-12'}>
                        <div className='card'>
                            <div className='card-header bg-primary text-white row'>
                                <div className='col-10 text-center'> <strong>Clients List</strong></div>
                                <div className='col-1'>
                                    <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faTh} onClick={ShowCardView} style={{ color: 'white', fontSize: '25px' }} /></div>
                                </div>
                                <div className='col-1'>
                                    <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faPlus} onClick={ShowForm} style={{ color: 'white', fontSize: '25px' }} /></div>
                                </div>
                            </div>
                            <div className='card-body'>
                                {!cardview && <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Client Name</th>
                                            <th>Company Name</th>
                                            <th>Address</th>
                                            <th>Employee Strength</th>
                                            <th>Contact No</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {
                                        isLoader && <tbody>
                                            <tr>
                                                <td colSpan='6' className="text-center">
                                                    <img src={myImage} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                    {!isLoader && <tbody>
                                        {
                                            clientList.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1} </td>
                                                    <td> {item.clientName} </td>
                                                    <td> {item.companyName}</td>
                                                    <td>{item.address} </td>
                                                    <td>{item.employeeStrength} </td>
                                                    <td>{item.contactNo} </td>
                                                    <td>
                                                        <button className='btn btn-sm btn-primary' onClick={() => { onEdit(item.clientId) }} > <FontAwesomeIcon icon={faEdit} style={{ fontSize: '15px' }} /></button>
                                                        <button className='btn btn-sm btn-danger m-2' onClick={() => { onDelete(item.clientId) }} > <FontAwesomeIcon icon={faTimes} style={{ fontSize: '15px' }} /></button>
                                                    </td>
                                                </tr>)
                                            })
                                        }

                                    </tbody>}
                                </table>}
                                {cardview && (
                                    <div className='row'>
                                        {clientList.map((item) => (
                                            <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }} key={item.packageId}>
                                                <div className="card-body CardBG">
                                                    <h5 className="card-title">{item.clientName}</h5>
                                                    <p className="card-text">{item.companyName}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Address: {item.address}</li>
                                                    <li className="list-group-item">EmployeeStrength: {item.employeeStrength}</li>
                                                    <li className="list-group-item">contactNo: {item.contactNo}</li>
                                                </ul>
                                                <div className="card-footer d-flex justify-content-end">
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => { onEdit(item.clientId) }}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => { onDelete(item.clientId) }}>Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {formstate && <div className='col-4'>
                        <div className='card'>                            
                            <div className='card-header bg-primary text-white'>
                                <div className='row align-items-center'>
                                    <div className='col-10'>
                                        <strong>New Client</strong>
                                    </div>
                                    <div className='col-2'>
                                        <div className="d-flex justify-content-end">
                                            <FontAwesomeIcon icon={faTimes} style={{ color: 'white', fontSize: '25px' }} onClick={ShowForm} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body custom-BG'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Client Name</label>
                                        <input type='text' value={clientObj.clientName} onChange={(event) => { changeClientValue(event, 'clientName') }} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>Company Name</label>
                                        <input type='text' value={clientObj.companyName} onChange={(event) => { changeClientValue(event, 'companyName') }} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>address</label>
                                        <input type='text' value={clientObj.address} onChange={(event) => { changeClientValue(event, 'address') }} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>city</label>
                                        <input type='text' value={clientObj.city} onChange={(event) => { changeClientValue(event, 'city') }} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Pin Code</label>
                                        <input type='text' value={clientObj.pinCode} onChange={(event) => { changeClientValue(event, 'pinCode') }} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>State</label>
                                        <input type='text' value={clientObj.state} onChange={(event) => { changeClientValue(event, 'state') }} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Employee Strength</label>
                                        <input type='text' value={clientObj.employeeStrength} className='form-control' onChange={(event) => { changeClientValue(event, 'employeeStrength') }} />
                                    </div>
                                    <div className='col-6'>
                                        <label>Gst No</label>
                                        <input type='text' value={clientObj.gstNo} className='form-control' onChange={(event) => { changeClientValue(event, 'gstNo') }} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>contactNo </label>
                                        <input type='text' value={clientObj.contactNo} className='form-control' onChange={(event) => { changeClientValue(event, 'contactNo') }} />
                                    </div>

                                </div>
                                <div className='row pt-2'>
                                    <div className='col-6 text-center'>
                                        <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                    </div>
                                    <div className='col-6 text-center'>
                                        {clientObj.clientId === 0 && <button className='btn btn-sm btn-success' onClick={saveClient} >{isSaveLoader && <span class="spinner-border spinner-border-sm"></span>} Save Client</button>}
                                        {clientObj.clientId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateClient} > Update Client</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Clients;