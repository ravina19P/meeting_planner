import React, { useEffect, useState } from 'react';
import { GetAllClientPackags, GetAllPackages, GetClientData } from '../Other/Common';
import axios from 'axios';
import '../Other/Common.css';
import myImage from '../images/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Activations = () => {
    let [ActivationsList, setActivations] = useState([]);
    let [newActivationObj, setNewActivationObj] = useState({
        "clientPackageId": 0,
        "clientId": 0,
        "packageId": 0,
        "createdDate": new Date(),
        "lastUpdated": new Date(),
        "packageStartDate": "2024-01-04T09:54:25.578Z",
        "packageEndDate": "2024-01-04T09:54:25.578Z",
        "isActive": true
    })
    let [clientList, setClientList] = useState([]);
    let [packageNo, setPackageNo] = useState([]);

    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setisSaveLoader] = useState(false);
    useEffect(() => {
        GetAllClientPackags().then((data) => {
            setActivations(data)
            setIsLoader(false);
        });
        GetAllClientPackags();
        GetClientData().then((data) => {
            setClientList(data)
        });
        GetClientData();
        GetAllPackages().then((data) => {
            setPackageNo(data)
        });
        GetAllPackages();
    }, [])
    const changeActivationsValue = (event, key) => {
        setNewActivationObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const changeActivationCheckbox = (event, key) => {
        setNewActivationObj(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    }
    const SaveActivation = async () => {
        setisSaveLoader(true);
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Meeting/AddNewClientPackage", newActivationObj);
            setisSaveLoader(false);
            if (result.data.result) {
                alert('Activations Created');
                const updatedActivations = await GetAllClientPackags();
                setActivations(updatedActivations);
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
            setisSaveLoader(false);
        }

    }
    const reset = () => {
        setNewActivationObj({
            "clientPackageId": 0,
            "clientId": 0,
            "packageId": 0,
            "createdDate": "2024-01-04T09:54:25.578Z",
            "lastUpdated": "2024-01-04T09:54:25.578Z",
            "packageStartDate": "2024-01-04T09:54:25.578Z",
            "packageEndDate": "2024-01-04T09:54:25.578Z",
            "isActive": true
        })
    }
    const onEdit = async (clientPackageId) => {
        try {
            const result = await axios.get(`https://onlinetestapi.gerasim.in/api/Meeting/GetClientPackageById?id=${clientPackageId}`);
            setNewActivationObj(result.data.data)
            setFormstate(true);
        } catch (error) {
            alert('Error Occuored');
        }
    }
    const onDelete = async (clientPackageId) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.post(`https://onlinetestapi.gerasim.in/api/Meeting/DeleteClientPackageById?id=${clientPackageId}`);
            if (result.data.result) {
                alert('clientPackage Deleted');
                const updatedActivations = await GetAllClientPackags();
                setActivations(updatedActivations);
            } else {
                alert(result.data.message)
            }
        }
    }
    const updateActivation = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateClientPackage', newActivationObj);
        if (result.data.result) {
            alert('Activation Updated');
            const updatedActivations = await GetAllClientPackags();
            setActivations(updatedActivations);
        } else {
            alert(result.data.message)
        }
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
                <Breadcrumb.Item href="/activations" active>activations </Breadcrumb.Item>
                <Breadcrumb.Item href="/clients"> clients</Breadcrumb.Item>
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
                                <div className='col-10 text-center'> <strong>Activations List</strong></div>
                                <div className='col-1'>
                                    <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faTh} onClick={ShowCardView} style={{ color: 'white', fontSize: '25px' }} /></div>
                                </div>
                                <div className='col-1'>
                                    <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faPlus} onClick={ShowForm} style={{ color: 'white', fontSize: '25px' }} /></div>
                                </div>
                            </div>
                            <div className='card-body'>
                                {!cardview &&
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>IsActive</th>
                                                <th>Package Name</th>
                                                <th>Client Name</th>
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
                                                ActivationsList.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1} </td>
                                                        <td>{item.packageStartDate.split('T')[0]}</td>
                                                        <td>{item.packageEndDate.split('T')[0]}</td>
                                                        <td>{item.isActive ? 'Yes' : 'No'}</td>
                                                        <td>{item.packageName} </td>
                                                        <td>{item.clientName} </td>
                                                        <td>
                                                            <button className='btn btn-sm btn-primary' onClick={() => { onEdit(item.clientPackageId) }} > <FontAwesomeIcon icon={faEdit} style={{ fontSize: '15px' }} /></button>
                                                            <button className='btn btn-sm btn-danger ms-2' onClick={() => { onDelete(item.clientPackageId) }} > <FontAwesomeIcon icon={faTimes} style={{ fontSize: '15px' }} /></button>
                                                        </td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>}
                                    </table>}
                                {cardview && (
                                    <div className='row'>
                                        {ActivationsList.map((item) => (
                                            <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }} key={item.packageId}>
                                                <div className="card-body CardBG">
                                                    <h5 className="card-title">{item.clientName}</h5>
                                                    <p className="card-text"><strong>{item.packageName}</strong></p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Start Date:  {item.packageStartDate.split('T')[0]}</li>
                                                    <li className="list-group-item">End Date:  {item.packageEndDate.split('T')[0]}</li>
                                                    <li className="list-group-item">isActive: {item.isActive ? 'Yes' : 'No'}</li>
                                                </ul>
                                                <div className="card-footer d-flex justify-content-end">
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => { onEdit(item.clientPackageId) }}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => { onDelete(item.clientPackageId) }}>Delete</button>
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
                                        <strong>New Activation</strong>
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
                                        <select className='form-select' value={newActivationObj.clientId} onChange={(event) => { changeActivationsValue(event, 'clientId') }}  >
                                            <option>Select Client</option>
                                            {
                                                clientList.map((item) => {
                                                    return (<option value={item.clientId}>{item.clientName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>Package</label>
                                        <select className='form-select' value={newActivationObj.packageId} onChange={(event) => { changeActivationsValue(event, 'packageId') }}  >
                                            <option>Select packageName</option>
                                            {
                                                packageNo.map((item) => {
                                                    return (<option value={item.packageId}>{item.packageName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Package StartDate</label>
                                        <input type='date' value={newActivationObj
                                            .packageStartDate} onChange={(event) => { changeActivationsValue(event, 'packageStartDate') }} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>Package EndDate</label>
                                        <input type='date' value={newActivationObj
                                            .packageEndDate} onChange={(event) => { changeActivationsValue(event, 'packageEndDate') }} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <input
                                            className="form-check-input" type="checkbox" checked={newActivationObj.isActive} onChange={(event) => { changeActivationCheckbox(event, 'isActive') }} />
                                        <label className="form-check-label">
                                            IsActive
                                        </label>
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-6 text-center'>
                                        <button className='btn btn-sm btn-success' onClick={reset} > Reset</button>
                                    </div>
                                    <div className='col-6 text-center'>
                                        {newActivationObj.clientPackageId === 0 && <button className='btn btn-sm btn-success' onClick={SaveActivation} > {isSaveLoader && <span class="spinner-border spinner-border-sm"></span>} Save Activation</button>}
                                        {newActivationObj.clientPackageId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateActivation} > Update Activation</button>}
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

export default Activations;