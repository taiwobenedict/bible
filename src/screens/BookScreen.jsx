import { useContext, useEffect } from "react";
import { bibleContext } from "../context/BibleContext";
import { UIContext } from "../context/UIContext";


function BookScreen() {
  const { upLoadModal} = useContext(bibleContext)
  const { displayModal } = useContext(UIContext)
  useEffect(() => {}, []);

  function handleClick (e) {
    
    const id = e.target.id

    // Load Old Testament 
    if (id === 'old') {
      upLoadModal({type:"OLD_TESTAMENT"})
    } 
    
    // Load New Testament
    else if (id ==='new') {
      upLoadModal({type:"NEW_TESTAMENT"})
    }
    // Load Chapters
    else if (id === "chapter") {
      upLoadModal({type:"CHAPTER"})
    }

    displayModal()
    }

  const { book, loading } = useContext(bibleContext);
  if (loading) return <p>Loading</p>;

  return (
    <div className="container">
      <div className="navigations d-flex flex-wrap align-items-center">
        <span  id="chapter" className="custom-card btn sec-color mr-3" onClick={handleClick}>Chapters</span>
        <span className="custom-card btn sec-color mr-3" onClick={handleClick}>Verses</span>
        <div className="d-flex flex-wrap">
          <div className=" btn sec-color round mr-3 ot" id="old" onClick={handleClick}>OT</div>
          <div className=" btn sec-color mr-3 round nt" id="new" onClick={handleClick}>NT</div>
          <div className=" btn sec-color mr-3 round l-arrow"><div className="fa fa-backward"></div></div>
          <div className=" btn sec-color mr-3 round r-arrow"><i className="fa fa-forward"></i></div>
        </div>
      </div>
      <ul className="list-group list-group-flush ">
          {
            book.verses.map((bible, i) => (
              <li className="list-group-item bg-transparent" name={`verse${bible.verse}`} key={i}>
                <h6 className="mb-2 font-weight-bold">{bible.book_id}{bible.chapter}:{bible.verse}</h6>
                <p className="lead">{bible.text}({book.translation_id})</p>
              </li>

            ))
          }
      </ul>
    </div>
  );
}

export default BookScreen;
