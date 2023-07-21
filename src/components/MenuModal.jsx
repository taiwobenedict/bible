import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bibleContext } from "../context/BibleContext";
import { UIContext } from "../context/UIContext";
import { Link } from "react-scroll";

function MenuModal() {
  const { data, modalOnDisplay, upLoadModal, bookName ,getBook} = useContext(bibleContext);
  const { showModal, displayModal, changeScreen } = useContext(UIContext)
  const [chapt, setChapt ] = useState(1)
  const navigate = useNavigate()  

  


  function handleReference (e) {

    const value = e.target.innerText
    // OLD, NEW and ALL TESTATMENT EVENT
    if (e.target.id === "book"){
      upLoadModal({type:"BOOK", value})
    } 
    // CHAPTER EVENT
    else if (e.target.id === "chapter") {
      setChapt(value)
      upLoadModal({type:"CHAPTER", value: {book:bookName, chapter:value}})
      getBook({book:bookName, chapter:value})
      changeScreen('book')
      navigate(`/bible/${bookName}${value}`)

    } 
    // VERSE EVENT
    else {
      upLoadModal({type:'VERSE', value})
      displayModal()
      changeScreen('book')
      navigate(`/bible/${bookName.replace(/\s/g, '')}${chapt}:${value}`)
    }
  }

  return (
    <div
      className={`bible-modal d-flex justify-content-center align-items-center ${showModal && "show"}`}
    >
      <div className="container">
        <div className=" modal-container custom-card">
          <div className="d-flex mb-2 pb-2 justify-content-between align-items-center border-bottom">
            <h4 className="font-weight-bold ">{modalOnDisplay}</h4>
            <i className="fa fa-times fa-2x" onClick={()=> displayModal()}></i>
          </div>
          <div className="modal-items">
            {modalOnDisplay === "BOOK"
              ? data.map((dataValue, i) => (
                  <div id="book" className="modal-item sec-color btn" key={i} onClick={handleReference}>
                    {dataValue.book}
                  </div>
                ))
              : modalOnDisplay === "CHAPTER"
              ? data.map((dataValue, i) => (
                  <div id="chapter" className="modal-item sec-color btn" key={i} onClick={handleReference}>{dataValue}</div>
                ))
                // Return VERSE
              : data.map((dataValue, i) => (
                  <Link
                  activeClass="active"
                    to={`verse${dataValue}`}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={1000}
                    key={i}
                    className="modal-item sec-color btn"
                    onClick={handleReference}
                  >
                    {dataValue}
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
