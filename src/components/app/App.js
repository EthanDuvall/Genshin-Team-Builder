import { useEffect, useState } from "react";
import characters from "../../util/characters.json";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Builder from "../builder/Builder";
import "./App.css";
function App() {
  const [allCharacters, setAllCharacters] = useState();

  useEffect(() => {
    getCharacters();
  }, []);

  function getCharacters() {
    //wip until i create my own api
    setAllCharacters(characters);
  }

  return (
    <div>
      <h1>Genshin Team Builder!</h1>
      <Routes>
        <Route path="/" element={<Home allCharacters= {allCharacters} />} />
        <Route path="/build" element={<Builder />} />
      </Routes>
    </div>
  );
}

export default App;
