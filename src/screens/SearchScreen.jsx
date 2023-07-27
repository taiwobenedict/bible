import { useContext, useEffect } from "react";

import { UIContext } from "../context/UIContext";
import { bibleContext } from "../context/BibleContext";

function SearchScreen() {
  const { changeScreen } = useContext(UIContext);
  const { searchList,  loading, version } = useContext(bibleContext)

  useEffect(() => {
    changeScreen("search");

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
           searchList.map((verse, i) => (
              <li className="list-group-item bg-transparent" key={i}>
                <h6 className="mb-2 font-weight-bold">{verse.reference}</h6>
                <p className="lead">{verse.text}({version})</p>
              </li>

            ))
          }
      </ul>
    </div>
  );
}

export default SearchScreen;
