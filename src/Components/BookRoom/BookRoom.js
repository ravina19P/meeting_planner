import React, { useEffect, useState } from 'react';
import { GetAllBookings, GetAllRooms, GetAllusers, GetTimeList } from '../Other/Common';
import axios from 'axios';
import myImage from '../images/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BookRoom = () => {
    let [bookRoomlist, setBookRoomlist] = useState([]);
    let [roomObj, setroomObj] = useState({
        "bookingId": 0,
        "roomId": 0,
        "userId": 0,
        "bookingDate": "2024-01-06T08:02:55.760Z",
        "fromTime": 0,
        "toTime": 0,
        "createdDate": new Date(),
        "lastUpdated": new Date()
    })
    let [roomList, setRoomList] = useState([]);
    let [userList, setUserList] = useState([]);
    let [timelist, setTimelist] = useState([]);

    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setisSaveLoader] = useState(false);
    useEffect(() => {
        GetAllBookings().then((data) => {
            setBookRoomlist(data)
            setIsLoader(false);
        });
        GetAllBookings();
        GetAllRooms().then((data) => {
            setRoomList(data)
        });
        GetAllRooms();
        GetAllusers().then((data) => {
            setUserList(data)
        });
        GetAllusers();
        GetTimeList().then((data) => {
            setTimelist(data)
        });
        GetTimeList();

    }, [])

    const changeRoomValue = (event, key) => {
        setroomObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const BookRoom = async () => {
        setisSaveLoader(true);
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Meeting/CreateBooking", roomObj);
            setisSaveLoader(false);
            if (result.data.result) {
                alert('Room Created');
                const updatedRooms = await GetAllBookings();
                setBookRoomlist(updatedRooms);
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
            setisSaveLoader(false);
        }
    }
    const onEdit = async (bookingId) => {
        try {
            const result = await axios.get(`https://onlinetestapi.gerasim.in/api/Meeting/GetBookingById?id=${bookingId}`);
            setroomObj(result.data.data)
            setFormstate(true);
        } catch (error) {
            alert('Error Occuored');
        }
    }
    const onDelete = async (bookingId) => {
        const isDelte = window.confirm('Are You Sure want to Delete');
        if (isDelte) {
            const result = await axios.post(`https://onlinetestapi.gerasim.in/api/Meeting/DeleteBookingById?id=${bookingId}`);
            if (result.data.result) {
                alert('Booking Deleted');
                const updatedBooking = await GetAllBookings();
                setBookRoomlist(updatedBooking);
            } else {
                alert(result.data.message)
            }
        }
    }
    const updateRoome = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateBooking', roomObj);
        if (result.data.result) {
            alert('Booking Updated');
            const updatedBooking = await GetAllBookings();
            setBookRoomlist(updatedBooking);
        } else {
            alert(result.data.message)
        }
    }

    const reset = () => {
        setroomObj({
            "bookingId": 0,
            "roomId": 0,
            "userId": 0,
            "bookingDate": "2024-01-06T08:02:55.760Z",
            "fromTime": 0,
            "toTime": 0,
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
                <Breadcrumb.Item href="/rooms">rooms </Breadcrumb.Item>
                <Breadcrumb.Item href="/bookRoom" active> bookRoom</Breadcrumb.Item>
                <Breadcrumb.Item href="/bookingCalander">bookingCalander </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className='row'>
                    <div className={formstate ? 'col-8' : 'col-12'}>
                        <div className='card'>
                            <div className='card-header bg-primary text-white row'>
                                <div className='col-10 text-center'> <strong>Booking List</strong></div>
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
                                            <th>Room Name</th>
                                            <th>User Name</th>
                                            <th>bookingDate</th>
                                            <th>fromTime</th>
                                            <th>toTime</th>
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
                                            bookRoomlist.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1} </td>
                                                    <td> {item.clientName} </td>
                                                    <td> {item.roomName}</td>
                                                    <td>{item.userName} </td>
                                                    <td>{item.bookingDate.split('T')[0]}</td>
                                                    <td>{item.fromTime} </td>
                                                    <td>{item.toTime} </td>
                                                    <td>
                                                        <button className='btn btn-sm btn-primary' onClick={() => { onEdit(item.bookingId) }}> <FontAwesomeIcon icon={faEdit} style={{ fontSize: '15px' }} /></button>
                                                        <button className='btn btn-sm btn-danger ms-2' onClick={() => { onDelete(item.bookingId) }}> <FontAwesomeIcon icon={faTimes} style={{ fontSize: '15px' }} /></button>
                                                    </td>
                                                </tr>)
                                            })
                                        }

                                    </tbody>}
                                </table>}
                                {cardview && (
                                    <div className='row'>
                                        {bookRoomlist.map((item) => (
                                            <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }} key={item.packageId}>
                                                <div className="card-body CardBG">
                                                    <h5 className="card-title">{item.clientName}</h5>
                                                    <p className="card-text">{item.roomName}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">UserName:  {item.userName}</li>
                                                    <li className="list-group-item">BookingDate:  {item.bookingDate.split('T')[0]}</li>
                                                    <li className="list-group-item">fromTime:  {item.fromTime}</li>
                                                    <li className="list-group-item">toTime:  {item.toTime}</li>
                                                </ul>
                                                <div className="card-footer d-flex justify-content-end">
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => { onEdit(item.bookingId) }}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => { onDelete(item.bookingId) }}>Delete</button>
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
                                        <strong>New Booking</strong>
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
                                        <label>Room</label>
                                        <select className='form-select' value={roomObj.roomId} onChange={(event) => { changeRoomValue(event, 'roomId') }}  >
                                            <option>Select Room</option>
                                            {
                                                roomList.map((item) => {
                                                    return (<option value={item.roomId}>{item.roomName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>User</label>
                                        <select className='form-select' value={roomObj.userId} onChange={(event) => { changeRoomValue(event, 'userId') }}  >
                                            <option>Select user</option>
                                            {
                                                userList.map((item) => {
                                                    return (<option value={item.userId}>{item.userName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Booking Date</label>
                                        <input type='date' value={roomObj
                                            .bookingDate} onChange={(event) => { changeRoomValue(event, 'bookingDate') }} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>From Time</label>
                                        <select className='form-select' value={roomObj.fromTime} onChange={(event) => { changeRoomValue(event, 'fromTime') }}  >
                                            <option>Select time</option>
                                            {
                                                timelist.map((item) => {
                                                    return (<option value={item.timeId}>{item.time}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>To Time</label>
                                            <select className='form-select' value={roomObj.toTime} onChange={(event) => { changeRoomValue(event, 'toTime') }}  >
                                                <option>Select time</option>
                                                {
                                                    timelist.map((item) => {
                                                        return (<option value={item.timeId}>{item.time}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-6 text-center'>
                                        <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                    </div>
                                    <div className='col-6 text-center'>
                                        {roomObj.bookingId === 0 && <button className='btn btn-sm btn-success' onClick={BookRoom} > {isSaveLoader && <span class="spinner-border spinner-border-sm"></span>}Book Room</button>}
                                        {roomObj.bookingId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateRoome} > Update Room</button>}
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

export default BookRoom;