import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetClientData, getAllMeetingRooms } from '../Other/Common';
import myImage from '../images/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Rooms = () => {
    const [meetingRooms, setMeetingRooms] = useState([]);
    const [newMeetingRoom, setNewMeetingRoom] = useState({
        "roomId": 0,
        "roomName": "",
        "roomLocation": "",
        "roomSeatingCapacity": 0,
        "isRoomActive": true,
        "clientId": 0,
        "createdDate": new Date(),
        "lastUpdated": new Date()
    });
    let [clientList, setClientList] = useState([]);

    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setisSaveLoader] = useState(false);
    useEffect(() => {
        getAllMeetingRooms().then((data) => {
            setMeetingRooms(data)
            setIsLoader(false);
        });
        getAllMeetingRooms();

        GetClientData().then((data) => {
            setClientList(data)
        });
        GetClientData();
    }, []);

    const onChangeHandler = (event, key) => {
        setNewMeetingRoom((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    };
    const changeCheckbox = (event, key) => {
        setNewMeetingRoom(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    }

    const CreateRoom = async () => {
        setisSaveLoader(true);
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Meeting/CreateRoom", newMeetingRoom);
            setisSaveLoader(false);
            if (result.data.result) {
                alert('Room Created');
                const updatedRoom = await getAllMeetingRooms();
                setMeetingRooms(updatedRoom);
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
            setisSaveLoader(false);
        }
    };

    const editMeetingRoom = async (roomId) => {
        try {
            const result = await axios.get(`https://onlinetestapi.gerasim.in/api/Meeting/GetRoomById?id=${roomId}`);
            setNewMeetingRoom(result.data.data)
            setFormstate(true);
        } catch (error) {
            alert('Error Occuored');
        }
    }


    const deleteMeetingRoom = async (roomId) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.post(`https://onlinetestapi.gerasim.in/api/Meeting/DeleteRoomById?id=${roomId}`);
            if (result.data.result) {
                alert('Room Deleted');
                const updatedRoom = await getAllMeetingRooms();
                setMeetingRooms(updatedRoom);
            } else {
                alert(result.data.message)
            }
        }
    }

    const updateMeetingRoom = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateRoom', newMeetingRoom);
        if (result.data.result) {
            alert('Room Updated');
            const updatedRoom = await getAllMeetingRooms();
            setMeetingRooms(updatedRoom);
        } else {
            alert(result.data.message)
        }
    };

    const reset = () => {
        setNewMeetingRoom({
            "roomId": 0,
            "roomName": "",
            "roomLocation": "",
            "roomSeatingCapacity": 0,
            "isRoomActive": true,
            "clientId": 0,
            "createdDate": new Date(),
            "lastUpdated": new Date()
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
                <Breadcrumb.Item href="/clients"> clients</Breadcrumb.Item>
                <Breadcrumb.Item href="/user"> user</Breadcrumb.Item>
                <Breadcrumb.Item href="/rooms" active>rooms </Breadcrumb.Item>
                <Breadcrumb.Item href="/bookRoom"> bookRoom</Breadcrumb.Item>
                <Breadcrumb.Item href="/bookingCalander">bookingCalander </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className='row'>
                    <div className={formstate ? 'col-8' : 'col-12'}>
                        <div className='card'>
                            <div className='card-header bg-primary text-white row'>
                                <div className='col-10 text-center'>  <strong>Meeting Room List</strong> </div>
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
                                            <th>Room Name</th>
                                            <th>Room Location</th>
                                            <th>Seating Capacity</th>
                                            <th>Client Name</th>
                                            <th>Is Active</th>
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
                                    {!isLoader && <tbody>
                                        {meetingRooms.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1} </td>
                                                <td>{item.roomName}</td>
                                                <td>{item.roomLocation}</td>
                                                <td>{item.roomSeatingCapacity}</td>
                                                <td>{item.clientName}</td>
                                                <td>{item.isRoomActive ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-primary' onClick={() => editMeetingRoom(item.roomId)}>
                                                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '15px' }} />
                                                    </button>
                                                    <button className='btn btn-sm btn-danger ms-2' onClick={() => deleteMeetingRoom(item.roomId)}>
                                                        <FontAwesomeIcon icon={faTimes} style={{ fontSize: '15px' }} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>}
                                </table>}
                                {cardview && (
                                    <div className='row'>
                                        {meetingRooms.map((item) => (
                                            <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }} key={item.packageId}>
                                                <div className="card-body CardBG">
                                                    <h5 className="card-title">{item.roomName}</h5>
                                                    <p className="card-text">{item.roomLocation}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Seating Capacity: {item.roomSeatingCapacity}</li>
                                                    <li className="list-group-item">clientName: {item.clientName}</li>
                                                    <li className="list-group-item">IsPackageActive: {item.isRoomActive ? 'Yes' : 'No'}</li>
                                                </ul>
                                                <div className="card-footer d-flex justify-content-end">
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => { editMeetingRoom(item.roomId) }}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => { deleteMeetingRoom(item.roomId) }}>Delete</button>
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
                                        <strong> New Meeting Room</strong>
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
                                        <label className='form-label'>Room Name:</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter Room Name'
                                            value={newMeetingRoom.roomName}
                                            onChange={(event) => onChangeHandler(event, 'roomName')}
                                        />
                                    </div>
                                    <div className='col-6'>
                                        <label className='form-label'>Room Location:</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter Room Name'
                                            value={newMeetingRoom.roomLocation}
                                            onChange={(event) => onChangeHandler(event, 'roomLocation')}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label className='form-label'>Room Seating Capacity:</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter Room Seating Capacity'
                                            value={newMeetingRoom.roomSeatingCapacity}
                                            onChange={(event) => onChangeHandler(event, 'roomSeatingCapacity')}
                                        />
                                    </div>
                                    <div className='col-6'>
                                        <div className='col-6'>
                                            <input
                                                className="form-check-input" type="checkbox" checked={newMeetingRoom.isRoomActive} onChange={(event) => { changeCheckbox(event, 'isRoomActive') }} />
                                            <label className="form-check-label">
                                                IsRoomActive
                                            </label>
                                        </div>
                                    </div>
                                    <div className='row col-6'>
                                        <label>Client Name</label>
                                        <select className='form-select' value={newMeetingRoom.clientId} onChange={(event) => { onChangeHandler(event, 'clientId') }}  >
                                            <option>Select Client</option>
                                            {
                                                clientList.map((item) => {
                                                    return (<option value={item.clientId}>{item.clientName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-6 text-center'>
                                        <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                    </div>
                                    <div className='col-6 text-center'>
                                        {newMeetingRoom.roomId === 0 && (
                                            <button className='btn btn-sm btn-success' onClick={CreateRoom}>
                                                {isSaveLoader && <span class="spinner-border spinner-border-sm"></span>}  Save Room
                                            </button>
                                        )}
                                        {newMeetingRoom.roomId !== 0 && (
                                            <button className='btn btn-sm btn-warning' onClick={updateMeetingRoom}>
                                                Update Room
                                            </button>
                                        )}
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

export default Rooms;











