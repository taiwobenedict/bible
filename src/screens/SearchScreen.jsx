import { useContext, useEffect } from "react";

import { UIContext } from "../context/UIContext";

function SearchScreen() {
  const { changeScreen } = useContext(UIContext);

  useEffect(() => {
    changeScreen("search");

    // eslint-disable-next-line
  }, []);

  return <div id="home"></div>;
}

export default SearchScreen;
