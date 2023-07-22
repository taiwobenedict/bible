import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UIContext } from '../context/UIContext'


function PageNotFound() {
    const { changeScreen } = useContext(UIContext)
    const navigate = useNavigate()

    useEffect(()=> {
        changeScreen('404')
        // eslint-disable-next-line
    },[])
    
    function handleReturn () {
        navigate("/")
    }
   
  return (
    <div className='d-flex justify-content-center align-items-center w-100 vh-100  flex-direction-column'>
        <div className='text-center'>
            <h1 className="display-2">PAGE NOT FOUND</h1>
            <div className="btn custom-card sec-color" onClick={handleReturn}>Return Home</div>

        </div>
    </div>
  )
}

export default PageNotFound