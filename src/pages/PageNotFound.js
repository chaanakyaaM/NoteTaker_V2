import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  function clickhandler(){
    navigate('/');
  }
  return (
    <div className='pagenotfound'>
        <div className="notfoundcontainer">
        <h1>404: Page Not Found</h1>
        <p>Oops! Couldn't find what you're looking for , Return back to <span onClick={clickhandler}>Home</span> page</p>

        </div>
    </div>
  )
}

export default PageNotFound