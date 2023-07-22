import { createContext, useReducer } from "react";
import BibleReducer from "../reducers/bibleReducer";
import axios from "axios";
import { books } from "../data/books";
import { useNavigate } from "react-router-dom";

export const bibleContext = createContext();

function BibleContextProvider({ children }) {
  // axios default settings
  axios.defaults.baseURL = "https://bible-api.com/";
  const navigate = useNavigate()

  // Initial state
  const bible = {
    modalOnDisplay: "",
    oldTestament: books.slice(0, 39),
    newTestament: books.slice(39),
    data: [],
    books,
    book: [],
    verses: [],
    chapters: [],
    bookName: "Genesis",
    verse: 1,
    chapter: 1,
    version: "kjv",
    dailyVerse: {},
    reference: "",
    loading: true,
  };

  //  connect to bible reducer to manange bible states
  const [state, dispatch] = useReducer(BibleReducer, bible);

  // Fetch book when chapter in click
  async function getBook({ book, chapter }) {
    
   
    try {
      const { data } = await axios.get(`${book}${chapter}`);
      // Dispatch to update the state of the selected book and it's chapter
      dispatch({ type: "FETCH_BOOK", payload: data });
    } catch (error) {
      console.log(error);
    }
  }
 
  // function getBook(book, chapter) {
  //   const data = JSON.parse(localStorage.getItem("bible"));
  //   dispatch({ type: "LOAD_BOOK", payload: data });
  // }

  function changeBibleVersion(version) {
    dispatch({
      type: "CHANGE_BIBLE_VERSION",
      payload: version,
    });
  }

  function upLoadModal(data) {
    switch (data.type) {
      // Update Modal with Old, New, or All Testament
      case "NEW_TESTAMENT":
      case "OLD_TESTAMENT":
      case "ALL":
        dispatch({
          type: data.type,
          payload:
            data.type === "NEW_TESTAMENT"
              ? state.newTestament
              : data.type === "OLD_TESTAMENT"
              ? state.oldTestament
              : state.books,
        });
        break;

      // Update Modal with Book, Chapter, or Verse
      case "BOOK":
      case "CHAPTER":
      case "LOAD_VERSE":
      case "VERSE":
        dispatch({
          type: data.type,
          payload: data.value,
        });
        break;

      // Forward or Backward Verse
      case "FORWARD":
      case "BACKWARD":
        const chpt_num = state.chapters.length
        const chpt_inc = data.value.chapter
        if ((chpt_inc <= chpt_num) && (chpt_inc !== 0)){
        dispatch ({
          type: data.type,
          payload: data.value.chapter
        })
          getBook({book: state.bookName,chapter: chpt_inc})
          navigate(`/bible/${state.bookName.replace(/\s/g, '')}${chpt_inc}`)
        }
        break
      default:
        break;
    }
  }

  return (
    <bibleContext.Provider
      value={{
        ...state,

        getBook,
        changeBibleVersion,
        upLoadModal,
      }}
    >
      {children}
    </bibleContext.Provider>
  );
}

export default BibleContextProvider;
