import { useEffect, useState } from "react";
import {fetchCharacters} from "../../util/fetchRequests.js"
import { Routes, Route, useNavigate } from "react-router-dom"; // <-- import useNavigate
import Home from "../home/Home";
import Builder from "../builder/Builder";
import "./App.scss";

function App() {
  const [allCharacters, setAllCharacters] = useState({});
  const [chosenCharacter, setChosenCharacter] = useState(null);
  const [ownedCharacters, setOwnedCharacters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const cached = sessionStorage.getItem("characters");
  if (cached) {
    setAllCharacters(JSON.parse(cached));
    setLoading(false);
  } else {
    setLoading(true); 
    fetchCharacters(setErrorMessage)
      .then((data) => {
        if (data) {
          setAllCharacters(data);
          sessionStorage.setItem("characters", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setErrorMessage("Server is still waking up, please try again.");
      })
      .finally(() => setLoading(false));
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

      
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  ownedCharacters={ownedCharacters}
                  setOwnedCharacters={setOwnedCharacters}
                  allCharacters={allCharacters}
                  setChosenCharacter={setChosenCharacter}
                  loading={loading}
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
