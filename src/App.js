import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookScreen from "./screens/BookScreen";
import SearchScreen from "./screens/SearchScreen";
import MenuBar from "./components/MenuBar";
import MenuModal from "./components/MenuModal";




// import {  motion } from 'framer-motion'

function App() {
  
  const date = new Date();

  return (
    <>
      <div id="app">
        <MenuBar />
        <MenuModal />

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/bible/:ref" element={<BookScreen />} />
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </div>
      <footer className="p-1 text-center">
        &copy;Copyright, Taiwo {date.getFullYear()}
      </footer>
    </>
  );
}

export default App;
