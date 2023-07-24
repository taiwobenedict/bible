import { createContext, useReducer } from "react";
import BibleReducer from "../reducers/bibleReducer";
import axios from "axios";
import { books } from "../data/books";
import { useNavigate } from "react-router-dom";

export const bibleContext = createContext();

function BibleContextProvider({ children }) {
  const navigate = useNavigate();

  // Initial state
  const bible = {
    modalOnDisplay: "",
    oldTestament: books.slice(0, 39),
    newTestament: books.slice(39),
    data: [],
    localBooks: books,
    books: [],
    book: [],
    verses: [],
    verseTexts: [],
    chapters: [],
    bookName: "Genesis",
    verse: 1,
    chapter: 1,
    version: "kjv",
    dailyVerse: {},
    reference: "",
    loading: false,
  };

  //  connect to bible reducer to manange bible states
  const [state, dispatch] = useReducer(BibleReducer, bible);

  // axios default settings
  axios.defaults.baseURL =
    "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/";
  axios.defaults.headers.common["api-key"] = "6ff1c35f02f17ad1275f935aa978e74e";

  async function getBooks() {
    try {
      const { data } = await axios.get(`books`);
      return data.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch book when chapter in click
  async function getBook({ book, chapter }) {
    dispatch({
      type: "LOADING",
    });

    try {
      const { data } = await axios.get(
        `chapters/${book}.${chapter}?content-type=text`
      );
      // Dispatch to update the state of the selected book and it's chapter
      dispatch({ type: "FETCH_BOOK", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  }

  // function getBook({ book, chapter }) {
  //   const data = JSON.parse(localStorage.getItem("bible"));
  //   dispatch({ type: "FETCH_BOOK", payload: data });
  // }

  function changeBibleVersion(version) {
    dispatch({
      type: "CHANGE_BIBLE_VERSION",
      payload: version,
    });
  }

  async function upLoadModal(data) {
    switch (data.type) {
      // Update Modal with Old, New, or All Testament
      case "NEW_TESTAMENT":
      case "OLD_TESTAMENT":
      case "ALL":
        const apiBooks = await getBooks();
        dispatch({
          type: data.type,
          payload:
            data.type === "NEW_TESTAMENT"
              ? { localBooks: state.newTestament, apiBooks }
              : data.type === "OLD_TESTAMENT"
              ? { localBooks: state.oldTestament, apiBooks }
              : { localBooks: state.books, apiBooks },
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
        const chpt_num = state.chapters.length;
        const chpt_inc = data.value.chapter;
        if (chpt_inc <= chpt_num && chpt_inc !== 0) {
          dispatch({
            type: data.type,
            payload: data.value.chapter,
          });
          getBook({ book: state.bookName, chapter: chpt_inc });
          navigate(`/bible/${state.bookName.replace(/\s/g, "")}${chpt_inc}`);
        }
        break;
      default:
        break;
    }
  }

  return (
    <bibleContext.Provider
      value={{
        ...state,
        dispatch,

        getBook,
        getBooks,
        changeBibleVersion,
        upLoadModal,
      }}
    >
      {children}
    </bibleContext.Provider>
  );
}

export default BibleContextProvider;
