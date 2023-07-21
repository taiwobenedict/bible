import { createContext, useReducer } from 'react'
import UIReducer from '../reducers/uiReducer'


export const UIContext = createContext()

function UIContextProvider({children}) {

    
  // Initial state
  const ui = {
    screen: 'home',
    showModal: false

  }

    // connect to UI Reducer to manage UI states
  const [state, dispatch] = useReducer(UIReducer, ui)
  

//   Change To Respective Screen On Mounted
  function changeScreen(screen) {
    dispatch({
        type: "CHANGE_SCREEN",
        payload: screen
    })
  }

  // Open And Close Modal
  function displayModal() {
    if (state.showModal) {
      dispatch ({
        type:"CONTROL_MODAL",
        payload: false
      })
    } else if (!state.showModal) {
        dispatch( {
          type: 'CONTROL_MODAL',
          payload: true
        })
      }
  }
  
  return (
    <UIContext.Provider value={{
        ...state,
        changeScreen,
        displayModal
    }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIContextProvider