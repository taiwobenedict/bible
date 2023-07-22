import React, { useContext, useState } from 'react'
import { UIContext } from '../context/UIContext'
import { useNavigate } from 'react-router-dom';


function MenuBar() {
    const { screen, changeScreen } = useContext(UIContext);
    const navigate = useNavigate()
    const [inputText, setInputText] = useState('')

    
    function handleSearch () {
      navigate('/search/')
      changeScreen('search')
    }

    function handleChange(e) {
      setInputText(e.target.value)
    }


    // If Home Screen is Mounted
    if ( screen === 'home') {
        return (
          <div id='menu-bar__home' className='menu-bar p-2'>
            <div className="hambugger"><i className="fa fa-bars"></i></div>
            <div className="search" onClick={handleSearch}><div className="fa fa-search"></div></div>
          </div>
        )
        
    } 

    // If Book Screen is Mounted
    if (screen === 'book') {
        return (
          <div id='menu-bar__book'className='menu-bar'>
   
          </div>
        )
        
    }

    // If Seach Screen is Mounted
    if (screen === 'search') {
        return (
            <div id='menu-bar__search' className='menu-bar custom-card'>
              <div className="container-sm">
                <div className="d-flex justify-content-between align-items-center search-container">
                  <i className="fa fa-arrow-left-long" onClick={()=> {navigate('/'); changeScreen('home')}}></i>
                  <input type="text" value={inputText} className='m-1 search-box'  onChange={handleChange}/> 
                  <div className="btn sec-bg pri-color">FIND</div>
                </div>
              </div>
            </div>
          )
    }
}

export default MenuBar