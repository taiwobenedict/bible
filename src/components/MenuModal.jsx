import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { bibleContext } from "../context/BibleContext";
import { UIContext } from "../context/UIContext";
import { Link } from "react-scroll";

function MenuModal() {
  const { data, modalOnDisplay, upLoadModal, bookName ,getBook, loading} = useContext(bibleContext);
  const { showModal, displayModal, changeScreen } = useContext(UIContext)
  const navigate = useNavigate()  



  function handleReference (e) {

    const value = e.target.innerText
    // OLD, NEW and ALL TESTATMENT EVENT
    if (e.target.id === "book"){
      upLoadModal({type:"BOOK", value})
    } 
    // CHAPTER EVENT
    else if (e.target.id === "chapter") {
      getBook({book: bookName, chapter: value})
      changeScreen('book')
      navigate(`/bible/${bookName.replace(/\s/g, '')}${value}`)

      // VERSE EVENT
    }  else if (e.target.id === "verse") {
      displayModal()

    }
  }

  if (loading) return (
    <div className="spinner-icon">
      <div className="spinner-border" role="status"><span className="sr-only">Loading</span></div>
    </div>
  )

  return (
    <div
      className={`bible-modal d-flex justify-content-center align-items-center ${showModal && "show"}`}
    >
      <div className="container">
        <div className=" modal-container custom-card">
          <div className="d-flex mb-2 pb-2 justify-content-between align-items-center border-bottom">
              {/* Modal's Name */}
            <h4 className="font-weight-bold ">{modalOnDisplay}</h4>
              {/* Close Modal */}
              <i className="fa fa-times fa-2x" onClick={()=> displayModal()}></i>
          </div>
          <div className="modal-items">
            {modalOnDisplay === "BOOK"
              ? data.map((dataValue, i) => (
                  <div id="book" className="modal-item sec-color btn" key={i} onClick={handleReference}>
                    {dataValue.name}
                  </div>
                ))
              : modalOnDisplay === "CHAPTER"
              ? data.map((dataValue, i) => (
                  <div id="chapter" className="modal-item sec-color btn" key={i} onClick={handleReference}>{dataValue}</div>
                ))
                // Return VERSES
              : data.map((dataValue, i) => (
                  <Link
                  id="verse"
                  activeClass="active"
                    to={`verse${dataValue}`}
                    spy={true}
                    smooth={true}
                    offset={-112}
                    duration={1000}
                    key={i}
                    className="modal-item sec-color btn"
                    onClick={handleReference}
                  >
                    {dataValue}
                  </Link>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
