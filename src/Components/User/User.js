import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import myImage from '../images/loader.gif';
import { GetAllusers, GetClientData } from '../Other/Common';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const UserComponent = () => {
    const [clientNames, setClientNames] = useState([]);
    const [users, setUsers] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setisSaveLoader] = useState(false);
    const [newUser, setNewUser] = useState({
        userId: 0,
        clientId: 0,
        userName: '',
        userPassword: '',
        clientName: '',
        createdDate: new Date(),
        lastUpdated: new Date(),
        isActive: true,
        role: ''
    });

    useEffect(() => {
        GetAllusers().then((data) => {
            setUsers(data)
            setIsLoader(false);
        });
        GetAllusers();
        GetClientData().then((data) => {
            setClientNames(data)

        });
        GetClientData();
    }, []);

    const saveUser = async () => {
        setisSaveLoader(true);
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Meeting/AddUsers", newUser);
            setisSaveLoader(false);
            if (result.data.result) {
                alert('user Created');
                const updateduser = await GetAllusers();
                setUsers(updateduser);
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
            setisSaveLoader(false);
        }

    }

    const editUser = async (userId) => {
        try {
            const result = await axios.get(`https://onlinetestapi.gerasim.in/api/Meeting/GetUsersById?id=${userId}`);
            setNewUser(result.data.data)
            setFormstate(true);
        } catch (error) {
            alert('Error Occuored');
        }
    };

    const deleteUser = async (userId) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.post(`https://onlinetestapi.gerasim.in/api/Meeting/DeleteUsersById?id=${userId}`);
            if (result.data.result) {
                alert('User Deleted');
                const updateduser = await GetAllusers();
                setUsers(updateduser);
            } else {
                alert(result.data.message)
            }
        }
    }

    const UpdateUser = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateUser', newUser);
        if (result.data.result) {
            alert('User Updated');
            const updateduser = await GetAllusers();
            setUsers(updateduser);
        } else {
            alert(result.data.message)
        }
    }

    const onchangehandler = (event, key) => {
        setNewUser(prevObj => ({ ...prevObj, [key]: event.target.value }))
    };

    const toggleIsActive = (event) => {
        setNewUser((prevObj) => ({ ...prevObj, isActive: event.target.checked }));
    };

    const resetForm = () => {
        setNewUser({
            userId: 0,
            clientId: 0,
            userName: '',
            userPassword: '',
            clientName: '',
            createdDate: new Date(),
            lastUpdated: new Date(),
            isActive: true,
            role: ''
        });
    };

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
                <Breadcrumb.Item href="/clients"> clients</Breadcrumb.Item>
                <Breadcrumb.Item href="/user" active> user</Breadcrumb.Item>
                <Breadcrumb.Item href="/rooms">rooms </Breadcrumb.Item>
                <Breadcrumb.Item href="/bookRoom"> bookRoom</Breadcrumb.Item>
                <Breadcrumb.Item href="/bookingCalander">bookingCalander </Breadcrumb.Item>
            </Breadcrumb>
            <div className='row'>
                <div className={formstate ? 'col-8' : 'col-12'}>
                    <div className='card'>
                        <div className='card-header bg-primary text-white row'>
                            <div className='col-10 text-center'> <strong> User List</strong></div>
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
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Client Name</th>
                                        <th>Role</th>
                                        <th>Actions</th>
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
                                <tbody>
                                    {users.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.userName}</td>
                                            <td>{item.userPassword}</td>
                                            <td>{item.clientName}</td>
                                            <td>{item.role}</td>
                                            <td>
                                                <button className='btn btn-sm btn-primary me-2' onClick={() => editUser(item.userId)} >
                                                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '15px' }} />
                                                </button>
                                                <button className='btn btn-sm btn-danger' onClick={() => deleteUser(item.userId)} >
                                                    <FontAwesomeIcon icon={faTimes} style={{ fontSize: '15px' }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                        </div>
                        {cardview && <div className='card-body bg-light'>
                            <div className='row'>
                                {users.map((item) => (
                                    <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }} key={item.packageId}>
                                        <div className="card-body CardBG">
                                            <h5 className="card-title">{item.userName}</h5>
                                            <p className="card-text"><strong>{item.clientName}</strong></p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Password:  {item.userPassword}</li>
                                            <li className="list-group-item">Role:  {item.role}</li>
                                        </ul>
                                        <div className="card-footer d-flex justify-content-end">
                                            <button className="btn btn-sm btn-primary me-2" onClick={() => { editUser(item.userId) }}>Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => { deleteUser(item.userId) }}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                </div>
                {formstate && <div className='col-4'>
                    <div className='card'>                   
                        <div className='card-header bg-primary text-white'>
                                <div className='row align-items-center'>
                                    <div className='col-10'>
                                        <strong> New User</strong>
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
                                    <label className='form-label'>Username:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter username'
                                        value={newUser.userName}
                                        onChange={(event) => { onchangehandler(event, 'userName') }}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>Password:</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        placeholder='Enter password'
                                        value={newUser.userPassword}
                                        onChange={(event) => { onchangehandler(event, 'userPassword') }}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label className='form-label'>Client Name:</label>
                                    <select
                                        className='form-control'
                                        value={newUser.clientId}
                                        onChange={(event) => { onchangehandler(event, 'clientId') }}
                                    >
                                        <option value="">Select Client</option>
                                        {clientNames.map((client) => (
                                            <option key={client.clientId} value={client.clientId}>
                                                {client.clientName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-6 text-start'>
                                    <label className='form-label'>Role:</label>
                                    <select
                                        className='form-control'
                                        value={newUser.role}
                                        onChange={(event) => { onchangehandler(event, 'role') }}
                                    >
                                        <option value=''>Select Role</option>
                                        <option value='client'>Client</option>
                                        <option value='admin'>Admin</option>
                                        <option value='clientuser'>Client User</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-6 mt-3 text-start'>
                                <label>IsActive:</label>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    value={newUser.isActive}
                                    onChange={(event) => { toggleIsActive(event, 'isActive') }}
                                />
                            </div>
                            <div className='row pt-2'>
                                <div className='col-6 text-center'>
                                    <button className='btn btn-sm btn-success' onClick={resetForm}> Reset</button>
                                </div>
                                <div className='col-6 text-center'>
                                    {newUser.userId === 0 && <button className='btn btn-sm btn-success' onClick={saveUser} > {isSaveLoader && <span class="spinner-border spinner-border-sm"></span>} Save Package</button>}
                                    {newUser.userId !== 0 && <button className='btn btn-sm btn-warning' onClick={UpdateUser} > Update Package</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default UserComponent;