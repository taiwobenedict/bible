import { useContext, useEffect } from "react";
import { bibleContext } from "../context/BibleContext";
import { UIContext } from "../context/UIContext";
function HomeScreen() {
  const { upLoadModal, dispatch } = useContext(bibleContext)
  const {changeScreen } = useContext(UIContext)

  
	useEffect(()=> {
		changeScreen('home')
		
		// eslint-disable-next-line 
	},[])
	  

  function handleClick (e) {
	   // Set loading...
	   dispatch({
		type: "LOADING",
	  });

	if (e.target.id === 'old') {
		upLoadModal({type:"OLD_TESTAMENT"})
		
	} else if (e.target.id ==='new') {
		upLoadModal({type:"NEW_TESTAMENT"})
	}
  }

  
  
  return (
    <div id="home">
      	<div className="banner"></div>
		<div className="container">

			{/* Select Book */}
			<div className="custom-card  my-4">
				<h4 className="text-center">SELECT BOOK TO READ</h4>
				<div className="d-flex justify-content-center align-items-center flex-wrap">
					<div className="sec-bg m-2 p-1 btn" onClick={handleClick}>
						<h5 className="pri-color" id="old">OLD TESTAMENT</h5>
					</div>
					<div className="sec-bg m-2 p-1 btn" onClick={handleClick}>
						<h5 className="pri-color" id="new">NEW TESTAMENT</h5>
					</div>
				</div>

			</div>
			
			{/* Today's Verse */}
			<div className="today-verse">
				<h4 className="custom-card text-center mb-1">TODAY'S VERSE</h4>
				<p className="p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere provident fugit adipisci, unde ex laboriosam.</p>
			</div>

			{/* Daily Reading */}
			<div className="daily-reading">
				<h4 className="custom-card">DAILY BIBLE READING</h4>
				<ul className="list-group list-group-flush ">
					<li className="list-group-item bg-transparent">
						<h6>OLD TESTAMENT</h6>
						<span>Hos.1 - Hos.2</span>
					</li>
					<li className="list-group-item bg-transparent">
						<h6>NEW TESTAMENT</h6>
						<span>Rom.6.1 - Rom 6.14</span>
					</li>
				</ul>
			</div>

		</div>

		
      	


    </div>
  );
}

export default HomeScreen;
