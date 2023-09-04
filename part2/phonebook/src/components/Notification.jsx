import React from 'react'
const Notification = ({ message, notifType }) => {
    const errorStyle = {
        color: 'red'
    }

    const confrimStyle ={
        color: 'green'
    }

    if (message === null) return null;

    return (
    <div className='notif' style={notifType ? confrimStyle : errorStyle}>
        {message}
    </div>
    )
}

export default Notification