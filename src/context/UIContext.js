import { createContext, useReducer } from "react";
import UIReducer from "../reducers/uiReducer";


export const UIContext = createContext();

function UIContextProvider({ children }) {
  // Initial state
  const ui = {
    screen: "home",
    showModal: false,
  };

  // connect to UI Reducer to manage UI states
  const [state, dispatch] = useReducer(UIReducer, ui);

  //   Change To Respective Screen On Mounted
  async function changeScreen(screen) {
    dispatch({
      type: "CHANGE_SCREEN",
      payload: screen,
    });
    // try {
    //   axios.defaults.baseURL = "https://api.scripture.api.bible";
    //   axios.defaults.headers.common["api-key"] =
    //     "6ff1c35f02f17ad1275f935aa978e74e";
    //   const { data } = await axios.get(
    //     "/v1/bibles/de4e12af7f28f599-01/chapters/EXO.2?content-type=text"
    //   );
    //   const inputString = data.data.content;
    //   // console.log(data.data)
  

    //   const regex = /\[\d+\]\s+/g;
    //   const result = inputString.split(regex).filter((item) => item !== "");
    //   // console.log(result)
    // } catch (error) {
    //   console.log(error.message);
    // }
  }

  // Open And Close Modal
  function displayModal() {
    if (state.showModal) {
      dispatch({
        type: "CONTROL_MODAL",
        payload: false,
      });
    } else if (!state.showModal) {
      dispatch({
        type: "CONTROL_MODAL",
        payload: true,
      });
    }
  }

  return (
    <UIContext.Provider
      value={{
        ...state,
        changeScreen,
        displayModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export default UIContextProvider;
