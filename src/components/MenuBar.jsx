import React, { useContext, useState } from 'react'
import { UIContext } from '../context/UIContext'
import { useNavigate } from 'react-router-dom';
import BibleNavigations from './BibleNavigations';
import { bibleContext } from '../context/BibleContext';


function MenuBar() {
    const { screen, changeScreen } = useContext(UIContext);
    const { reference } = useContext(bibleContext)
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
          <div id='menu-bar__home' className='menu-bar p-2 custom-bg'>
            <div className="hambugger"><i className="fa fa-gear"></i></div>
            <div className="search" onClick={handleSearch}><div className="fa fa-search"></div></div>
          </div>
        )
        
    } 

    // If Book Screen is Mounted
    if (screen === 'book') {
        return (
          <div id='menu-bar__book'className='menu-bar container custom-bg '>
           <div className="p-2 flex-wrap d-flex justify-content-between align-items-center px-2">
            <div className='mr-4'>
              <i className="fa fa-home" onClick={()=> {navigate('/'); changeScreen('home')}}></i>
              <span className='ml-3'>{reference}</span>
            </div>

            <div className='d-flex align-items-center text-center justify-content-center'>
              <i className="fa fa-location"></i>
              <i className="search ml-3 fa fa-search" onClick={handleSearch}></i>
              <i className="fa fa-gear ml-3"></i>
            </div>
           </div>
           <BibleNavigations />
          </div>
        )
        
    }

    // If Seach Screen is Mounted
    if (screen === 'search') {
        return (
            <div id='menu-bar__search' className='menu-bar custom-card'>
              <div className="container-sm">
                <div className="d-flex justify-content-between align-items-center search-container">
                  <i className="fa fa-home mr-2" onClick={()=> {navigate('/'); changeScreen('home')}}></i>
                  <input type="text" value={inputText} placeholder='Search the scriptures' className='m-1 mr-2 search-box'  onChange={handleChange}/> 
                  <div className="btn sec-bg pri-color">FIND</div>
                </div>
              </div>
            </div>
          )
    }
}

export default MenuBar