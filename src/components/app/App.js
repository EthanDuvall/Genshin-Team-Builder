import { useEffect, useState } from "react";
import characters from "../../util/characters.json";
import { Routes, Route, useNavigate } from "react-router-dom"; // <-- import useNavigate
import Home from "../home/Home";
import Builder from "../builder/Builder";
import "./App.scss";

function App() {
  const [allCharacters, setAllCharacters] = useState();
  const [chosenCharacter, setChosenCharacter] = useState(null);
  const [ownedCharacters, setOwnedCharacters] = useState([]);
  const navigate = useNavigate(); // <-- add this

  useEffect(() => {
    getCharacters();
  }, []);

  function getCharacters() {
    //wip until i create my own api
    setAllCharacters(characters);
  }

  return (
    <>
      <header>
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Genshin Team Builder
        </h1>
      </header>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                ownedCharacters={ownedCharacters}
                setOwnedCharacters={setOwnedCharacters}
                allCharacters={allCharacters}
                setChosenCharacter={setChosenCharacter}
              />
            }
          />
          <Route
            path="/build"
            element={
              <Builder
                chosenCharacter={chosenCharacter}
                ownedCharacters={ownedCharacters}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
