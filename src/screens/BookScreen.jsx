import { useContext, useEffect } from "react";
import { bibleContext } from "../context/BibleContext";
import { UIContext } from "../context/UIContext";
import { useParams } from "react-router-dom";


function BookScreen() {
  const { upLoadModal, bookName, version, chapters, chapter, verses, loading, book, getBook} = useContext(bibleContext)
  const { displayModal,  changeScreen  } = useContext(UIContext)
  const params = useParams()
  const regex = /^(.*?)(\d+)$/
  const [, bookParam, chapterParam] = params.ref.match(regex);


  useEffect(() => {
      getBook({book: bookParam, chapter: chapterParam})
      changeScreen('book')
       // eslint-disable-next-line 
  }, []);

  function handleClick (e) {
    
    const id = e.target.id

    // Load Old Testament on Modal 
    if (id === 'old') {
      upLoadModal({type:"OLD_TESTAMENT"})
      displayModal()
    } 
    // Load New Testament on Modal
    else if (id ==='new') {
      upLoadModal({type:"NEW_TESTAMENT"})
      displayModal()
    }
    // Load Verses on Modal
    else if (id === "verse") {
      upLoadModal({type:"VERSE",value: verses})
      displayModal()
    }
    // Load Chapters on Modal
    else if (id === "chapter") {
      upLoadModal({type:"CHAPTER",value:{chapters}})
      displayModal()
    }
    // Forward to the next chapter
    else if( id === 'forward') {
      upLoadModal({type:"FORWARD",value: {book: bookName, chapter: Number(chapter) + 1}})
    }
    // Backward to the previous chapter
    else if (id === "backward") {
      upLoadModal({type:"BACKWARD",value: {book: bookName, chapter: Number(chapter) - 1}})
    }

    }

  if (loading) return (
      <div className="spinner-icon">
        <div className="spinner-border" role="status"><span className="sr-only">Loading</span></div>
      </div>
    )

  return (
    <div className="container">
      <div className="navigations d-flex flex-wrap align-items-center pt-2 pb-3">
        <span  id="chapter" className="custom-card btn sec-color mt-2 mr-3" onClick={handleClick}>Chapters</span>
        <span className="custom-card btn sec-color mt-2 mr-3" onClick={handleClick} id="verse">Verses</span>
        <div className="d-flex flex-wrap ">
          <div className=" btn sec-color mt-2 round mr-3 ot" id="old" onClick={handleClick}>OT</div>
          <div className=" btn sec-color mt-2 mr-3 round nt" id="new" onClick={handleClick}>NT</div>
          <div className=" btn sec-color mt-2 mr-3 round l-arrow"><div id="backward" onClick={handleClick} className="fa fa-backward p-2"></div></div>
          <div className=" btn sec-color mt-2 round  r-arrow"><i id="forward" onClick={handleClick} className="fa fa-forward p-2"></i></div>
        </div>
      </div>
      <ul className="list-group list-group-flush ">
          {
            book.map((bible, i) => (
              <li className="list-group-item bg-transparent" name={`verse${bible.verse}`} key={i}>
                <h6 className="mb-2 font-weight-bold">{bible.book_id}{bible.chapter}:{bible.verse}</h6>
                <p className="lead">{bible.text}({version})</p>
              </li>

            ))
          }
      </ul>
    </div>
  );
}

export default BookScreen;
