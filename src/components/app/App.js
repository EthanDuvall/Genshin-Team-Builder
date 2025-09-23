import { useEffect, useState } from "react";
import {fetchCharacters} from "../../util/fetchRequests.js"
import { Routes, Route, useNavigate } from "react-router-dom"; // <-- import useNavigate
import Home from "../home/Home";
import Builder from "../builder/Builder";
import "./App.scss";

function App() {
  const [allCharacters, setAllCharacters] = useState();
  const [chosenCharacter, setChosenCharacter] = useState(null);
  const [ownedCharacters, setOwnedCharacters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // <-- add this

 useEffect(() => {
   if (sessionStorage.getItem("characters")) {
     setAllCharacters(JSON.parse(sessionStorage.getItem("characters")));
   } else {
     fetchCharacters(setErrorMessage).then((data) => {
       if (data) {
         setAllCharacters(data);
         sessionStorage.setItem("characters", JSON.stringify(data));
       }
     });
   }
 }, []);

  function closeError() {
    setErrorMessage("");
  }
  return (
    <>
      <header>
        <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
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
                setErrorMessage={setErrorMessage}
              />
            }
          />
        </Routes>
      </div>
      {errorMessage && (
        <div className="errorModal">
          <h2>Error</h2>
          <p>{errorMessage}</p>
          <button className="closeModalBtn" onClick={closeError}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default App;
