import { useContext, useEffect } from "react";
import { bibleContext } from "../context/BibleContext";
import { UIContext } from "../context/UIContext";
import { useParams } from "react-router-dom";


function BookScreen() {
  const {version, loading, book, getBook, verseTexts, bookName} = useContext(bibleContext)
  const { changeScreen  } = useContext(UIContext)
  const params = useParams()
  const regex = /^(.*?)(\d+)$/
  const [, bookParam, chapterParam] = params.ref.match(regex);


  useEffect(() => {
      getBook({book: bookParam, chapter: chapterParam})
      changeScreen('book')
       // eslint-disable-next-line 
  }, []);



  if (loading) return (
      <div className="spinner-icon">
        <div className="spinner-border" role="status"><span className="sr-only">Loading</span></div>
      </div>
    )

  return (
    <div className="container">
      <ul className="list-group list-group-flush ">
          {
            verseTexts.map((text, i) => (
              <li className="list-group-item bg-transparent" name={`verse${i+1}`} key={i}>
                <h6 className="mb-2 font-weight-bold">{bookName}{book.number}:{i+1|| " Intro"}</h6>
                <p className="lead">{text}({version})</p>
              </li>

            ))
          }
      </ul>
    </div>
  );
}

export default BookScreen;
