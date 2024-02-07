import axios from 'axios';
import React, { useState } from 'react';
import { Link, json } from 'react-router-dom';

const Login = () => {
    const [info, setInfo] = useState({ userName: '', userPassword: '' })
    const [error, setError] = useState([]);
    const OnchangeHandle = (event, fieldname) => {
        setInfo((prevstate) => ({ ...prevstate, [fieldname]: event.target.value }))
    }
    const submitHandle = async (event) => {
        const { userName, userPassword } = info;
        event.preventDefault();
        let ErrorArray = [];
        for (let x in info) {
            if (info[x] === "") {
                ErrorArray.push(x)
            }
        }
        setError(ErrorArray);
        if (ErrorArray.length <= 0) {
            let reqBody = {
                "userName": userName,
                "userPassword": userPassword
            }
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Meeting/login", reqBody)
            console.log(result.data);
            const responce = result.data;
            if (responce.data !== null && responce.result) {
                alert("Login Succesfull")
                window.location.href = '/Dashboard';
                localStorage.setItem("userinfo", JSON.stringify(responce.data))
            }
        }
    }
    const HandleError = (value) => {
        return error.indexOf(value) > -1 ? true : false;
    }
    return (
        <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
            <div className='row col-md-5 border p-4 custom-BG border-black'>
                <form className='mt-3' onSubmit={(e) => submitHandle(e)}>
                    <h3 className="custom-text">Log-In</h3>
                    <div className="form-group">
                        <label>userName</label>
                        <input type="text" value={info.userName} onChange={(e) => OnchangeHandle(e, 'userName')} className={HandleError("userName") ? "form-control is-invalid mt-2" : "form-control mt-2"} id="exampleuserName" placeholder="Enter userName" />
                        {HandleError("userName") && <div class="invalid-feedback">
                            Please choose a userName.
                        </div>}
                    </div>
                    <div className="form-group">
                        <label >UserPassword</label>
                        <input type="password" value={info.userPassword} onChange={(e) => OnchangeHandle(e, 'userPassword')} className={HandleError("userPassword") ? "form-control is-invalid mt-2" : "form-control mt-2"} id="exampleInputPassword1" placeholder="Password" />
                        {HandleError("userPassword") && <div class="invalid-feedback">
                            Please choose a userPassword.
                        </div>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;