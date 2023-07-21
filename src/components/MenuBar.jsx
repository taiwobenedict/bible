import React, { useContext } from 'react'
import { UIContext } from '../context/UIContext'


function MenuBar() {
    const { screen } = useContext(UIContext);


    // If Home Screen is Mounted
    if ( screen === 'home') {
        return (
          <div id='menu-bar__home' className='menu-bar'>
            <div className="hambugger"><i className="fa fa-bars"></i></div>
            <div className="search"><div className="fa fa-search"></div></div>
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
            <div id='menu-bar__search' className='menu-bar'>
       
            </div>
          )
    }
}

export default MenuBar