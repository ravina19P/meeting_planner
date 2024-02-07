import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BookingCalander = () => {
    return (
        <div className='container'>
            <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/packages">packages</Breadcrumb.Item>
                <Breadcrumb.Item href="/activations">activations </Breadcrumb.Item>
                <Breadcrumb.Item href="/clients"> clients</Breadcrumb.Item>
                <Breadcrumb.Item href="/user"> user</Breadcrumb.Item>
                <Breadcrumb.Item href="/rooms">rooms </Breadcrumb.Item>
                <Breadcrumb.Item href="/bookRoom"> bookRoom</Breadcrumb.Item>
                <Breadcrumb.Item href="/bookingCalander" active>bookingCalander </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default BookingCalander;