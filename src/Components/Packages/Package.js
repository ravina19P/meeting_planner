import React, { useEffect, useState } from 'react';
import { GetAllPackages } from '../Other/Common';
import axios from 'axios';
import myImage from '../images/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Package = () => {
    let [packagelist, setPackagelist] = useState([]);
    let [packageObj, setpackageObj] = useState({
        "packageId": 0,
        "packageName": "",
        "packageCost": 0,
        "packageDescription": "",
        "isPackageActive": true
    })
    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setisSaveLoader] = useState(false);

    useEffect(() => {
        GetAllPackages().then((data) => {
            setPackagelist(data)
            setIsLoader(false);
        });
        GetAllPackages();
    })
    const changeClientValue = (event, key) => {
        setpackageObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const changeClientCheckbox = (event, key) => {
        setpackageObj(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    }
    const savePackage = async () => {
        setisSaveLoader(true);
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Meeting/CreatePackage", packageObj);
            setisSaveLoader(false);
            if (result.data.result) {
                alert('Package Created');
                const updatedPackage = await GetAllPackages();
                setPackagelist(updatedPackage);
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
            setisSaveLoader(false);
        }
    }
    const onEdit = async (packageId) => {
        try {
            const result = await axios.get(`https://onlinetestapi.gerasim.in/api/Meeting/GetPackgeById?id=${packageId}`);
            setpackageObj(result.data.data)
            setFormstate(true);
        } catch (error) {
            alert('Error Occuored');
        }
    }
    const onDelete = async (packageId) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.post(`https://onlinetestapi.gerasim.in/api/Meeting/DeletePackgeById?id=${packageId}`);
            if (result.data.result) {
                alert('Package Deleted');
                const updatedPackage = await GetAllPackages();
                setPackagelist(updatedPackage);
            } else {
                alert(result.data.message)
            }
        }
    }
    const updatePackage = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdatePackge', packageObj);
        if (result.data.result) {
            alert('client Updated');
            const updatedPackage = await GetAllPackages();
            setPackagelist(updatedPackage);
        } else {
            alert(result.data.message)
        }
    }
    const reset = () => {
        setpackageObj({
            "packageId": 0,
            "packageName": "",
            "packageCost": 0,
            "packageDescription": "",
            "isPackageActive": true
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
                <Breadcrumb.Item href="/packages" active>packages</Breadcrumb.Item>
                <Breadcrumb.Item href="/activations">activations </Breadcrumb.Item>
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
                                <div className='col-10 text-center'> <strong> Package List</strong></div>
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
                                                <th>Package Name</th>
                                                <th>Package Cost</th>
                                                <th>Package Description</th>
                                                <th>IsPackageActive</th>
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
                                                packagelist.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1} </td>
                                                        <td> {item.packageName} </td>
                                                        <td>{item.packageCost}</td>
                                                        <td>{item.packageDescription} </td>
                                                        <td>{item.isPackageActive ? 'Yes' : 'No'}</td>
                                                        <td>
                                                            <button className='btn btn-sm btn-primary' onClick={() => { onEdit(item.packageId) }} ><FontAwesomeIcon icon={faEdit} style={{ fontSize: '15px' }} /></button>
                                                            <button className='btn btn-sm btn-danger ms-2' onClick={() => { onDelete(item.packageId) }}  ><FontAwesomeIcon icon={faTimes} style={{ fontSize: '15px' }} /></button>
                                                        </td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>}
                                    </table>}
                                {cardview && (
                                    <div className='row'>
                                        {packagelist.map((item) => (
                                            <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }} key={item.packageId}>
                                                <div className="card-body CardBG">
                                                    <h5 className="card-title">{item.packageName}</h5>
                                                    <p className="card-text">{item.packageDescription}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">PackageCost: ₹ {item.packageCost}</li>
                                                    <li className="list-group-item">IsPackageActive: {item.isPackageActive ? 'Yes' : 'No'}</li>
                                                </ul>
                                                <div className="card-footer d-flex justify-content-end">
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => { onEdit(item.packageId) }}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => { onDelete(item.packageId) }}>Delete</button>
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
                                        <strong>Create Package</strong>
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
                                        <label>Package Name</label>
                                        <input type='text' value={packageObj.packageName} onChange={(event) => { changeClientValue(event, 'packageName') }} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>Package Cost</label>
                                        <input type='text' value={packageObj.packageCost} onChange={(event) => { changeClientValue(event, 'packageCost') }} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Package Description</label>
                                        <input type='text' value={packageObj.packageDescription} onChange={(event) => { changeClientValue(event, 'packageDescription') }} className='form-control' />
                                    </div>
                                    <div className='col-6 mt-3 text-start'>
                                        <input type='checkbox' checked={packageObj.isPackageActive} onChange={(event) => { changeClientCheckbox(event, 'isPackageActive') }} id='fillId'  ></input>
                                        <label className='ms-2' htmlFor='fillId'>IsActive</label>
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-6 text-center'>
                                        <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                    </div>
                                    <div className='col-6 text-center'>
                                        {packageObj.packageId === 0 && <button className='btn btn-sm btn-success' onClick={savePackage} > {isSaveLoader && <span className="spinner-border spinner-border-sm"></span>} Save Package</button>}
                                        {packageObj.packageId !== 0 && <button className='btn btn-sm btn-warning' onClick={updatePackage} > Update Package</button>}
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

export default Package;