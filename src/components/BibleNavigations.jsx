import {useContext} from 'react'
import { bibleContext } from '../context/BibleContext'
import { UIContext } from '../context/UIContext'


function BibleNavigations() {

  const { upLoadModal, bookName, chapters, chapter, verses} = useContext(bibleContext)
  const { displayModal, screen} = useContext(UIContext)

  function handleClick (e) {
    
    const id = e.target.id

    // Load Old Testament on Modal 
    if (id === 'old') {
      upLoadModal({type:"OLD_TESTAMENT", screen})
      displayModal()
    } 
    // Load New Testament on Modal
    else if (id ==='new') {
      upLoadModal({type:"NEW_TESTAMENT", screen})
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
  return (
    <div className=''>
      <div className="navigations d-flex flex-wrap align-items-center pb-3">
        <span  id="chapter" className="custom-card btn sec-color mr-3" onClick={handleClick}>Chapters</span>
        <span className="custom-card btn sec-color mr-3" onClick={handleClick} id="verse">Verses</span>
        <div className="d-flex flex-wrap ">
          <div className=" btn sec-color mt-2  round mr-3 ot" id="old" onClick={handleClick}>OT</div>
          <div className=" btn sec-color mt-2 mr-3 round nt" id="new" onClick={handleClick}>NT</div>
          <div className=" btn sec-color mt-2 mr-3 round l-arrow"><div id="backward" onClick={handleClick} className="fa fa-backward p-2"></div></div>
          <div className=" btn sec-color mt-2 round  r-arrow"><i id="forward" onClick={handleClick} className="fa fa-forward p-2"></i></div>
        </div>
      </div>
    </div>
  )
}

export default BibleNavigations