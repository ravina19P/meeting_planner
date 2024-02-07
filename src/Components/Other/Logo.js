import React from 'react';

const Logo = () => {
    return (
        <div>
            <h1 className='mt-5 custom-text text-primary' style={{ fontSize: '70px'}}>Welcome to meeting planner</h1>
            <img src="https://www.meetingsnet.com/sites/meetingsnet.com/files/uploads/2016/03/Meeting-Planning-Strategies.jpg" alt="meetingplanner" style={{ width: '900px', height:'500px'}}/>
        </div>
    );
};

export default Logo;