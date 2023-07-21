
function createArray(N) {
    return Array.from({ length: N }, (_, index) => index + 1);
}   


function BibleReducer(state, action) {
  switch (action.type) {
    case "NEW_TESTAMENT":
      return { ...state, data: action.payload, modalOnDisplay: "BOOK" };

    case "OLD_TESTAMENT":
      return { ...state, data: action.payload, modalOnDisplay: "BOOK" };

    case "ALL":
      return { ...state, data: action.payload, modalOnDisplay: "BOOK" };

    case "BOOK":
      const incomingBook = action.payload;
      const { chapters } = state.books.find((bible) => bible.book === incomingBook);
      const chaptersArray = createArray(chapters)
      return { ...state, data: chaptersArray, modalOnDisplay: "CHAPTER" , chapter: chaptersArray, bookName: incomingBook};

    case "CHAPTER": 
      return {...state, data: state.chapter, modalOnDisplay: 'CHAPTER'}
    
    case "VERSE":
      return { ...state, verses: state.verses, modalOnDisplay: 'VERSES' };
      
    case "LOAD_BOOK":
        const book = action.payload
        const versesArray = createArray(book.verses.length)
        return {...state, verses:versesArray, book, data: versesArray, modalOnDisplay: "VERSES", loading: false}

    default:
      return state;
  }
}

export default BibleReducer;
