
function createArray(N) {
    return Array.from({ length: N }, (_, index) => index + 1);
}   


function BibleReducer(state, action) {
  switch (action.type) {
    case "FETCH_BOOK":
      const book = action.payload
      const bookChapter = book.verses[0].chapter
      const verses = createArray(book.verses.length)
      const bookName = book.verses[0].book_name
      const reference = book.reference

      let bookChapters = state.books.find((bible) => bible.book === bookName)
      bookChapters = createArray(bookChapters.chapters)
     
      
      return { 
        ...state,
        book: book.verses,
        chapter: bookChapter,
        verses,
        bookName,
        reference,
        loading: false,
        version: book.translation_id,
        chapters: bookChapters,
        data: verses,
        modalOnDisplay: 'VERSES'

      }
    
    case "ALL":
    case "NEW_TESTAMENT":
    case "OLD_TESTAMENT":
      return { ...state, data: action.payload, modalOnDisplay: "BOOK" };

    case "BOOK":
      const incomingBook = action.payload;
      let { chapters } = state.books.find((bible) => bible.book === incomingBook);
      chapters = createArray(chapters)
      return { ...state, data: chapters, modalOnDisplay: "CHAPTER" , chapters , bookName: incomingBook};

      // Navigation Buttons
    case "CHAPTER": 
      const {chapter} = action.payload
      return {...state, data: state.chapters, modalOnDisplay: 'CHAPTER', chapter}

    case "VERSE":
      return { ...state, data: state.verses, modalOnDisplay: 'VERSES' };
      
    case "FORWARD":
    case "BACKWARD":
      return { ...state , chapter: action.payload, loading: true }
   
    default:
      return state;
  }
}

export default BibleReducer;
