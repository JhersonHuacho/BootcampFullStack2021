import React from 'react'

const Notification = ({ message, isError }) => {

  if (message === null) {
    return null;
  }

  return (
    <div className={isError ? 'error' : 'successful'}>
      {message}
    </div>
  )
}

export default Notification;