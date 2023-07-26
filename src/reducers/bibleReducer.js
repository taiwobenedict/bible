function createArray(N) {
  return Array.from({ length: N }, (_, index) => index + 1);
}

function createVersesArray(versesString) {
  const regex = /\[\d+\]\s+/g;
  const result = versesString.split(regex).filter((item) => item !== "");
  return result;
}

function filterBooks(A, B) {
  return B.filter((bElement) =>
    A.some((aElement) => aElement.name === bElement.name)
  );
}

function removeNumbersFromString(inputString) {
  const regex = /\s*\d+\s*$/;
  return inputString.replace(regex, "");
}

function BibleReducer(state, action) {
  switch (action.type) {
    case "FETCH_BOOK":
      let book = {
        ...action.payload,
        content: createVersesArray(action.payload.content),
      };
      let bookChapter = book.number;
      let verses = createArray(book.content.length -1);
      let verseTexts = book.content.slice(1,);
      let bookName = book.bookId;
      let word = removeNumbersFromString(book.reference);

      let bk = state.localBooks.find((bible) => bible.name === word);

      let reference = book.reference;
      let bookChapters = createArray(bk.chapters);

      return {
        ...state,
        book,
        verseTexts,
        chapter: bookChapter,
        verses,
        bookName,
        reference,
        loading: false,
        chapters: bookChapters,
        data: verses,
        modalOnDisplay: "VERSES",
      };

    case "ALL":
    case "NEW_TESTAMENT":
    case "OLD_TESTAMENT":
      let { localBooks, apiBooks } = action.payload;
      let books = filterBooks(localBooks, apiBooks);


      return {
        ...state,
        data: books,
        books,
        modalOnDisplay: "BOOK",
        loading: false,
      };

    case "BOOK":
      let incomingBook = action.payload;

      let { chapters } = state.localBooks.find(
        (bible) => bible.name === incomingBook
      );
      let { id } = state.books.find((book) => book.name === incomingBook);
      chapters = createArray(chapters);
      return {
        ...state,
        data: chapters,
        modalOnDisplay: "CHAPTER",
        chapters,
        bookName: id,
      };

    // Navigation Buttons
    case "CHAPTER":
      let { chapter } = action.payload;
      return {
        ...state,
        data: state.chapters,
        modalOnDisplay: "CHAPTER",
        chapter,
      };

    case "VERSE":
      return { ...state, data: state.verses, modalOnDisplay: "VERSES" };

    case "FORWARD":
    case "BACKWARD":
      return { ...state, loading: false };

    case "LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default BibleReducer;
