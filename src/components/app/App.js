import { useEffect, useState } from "react";
import characters from "../../util/characters.json";
import "./App.css";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownedCharacters, setOwnedCharacters] = useState();
  const [allCharacters, setAllCharacters] = useState();

  useEffect(() => {
    getCharacters();
  }, []);

  function getCharacters() {
    //wip until i create my own api
    var htmlCharacters = [];
    characters.forEach((character) => {
      htmlCharacters.push(
        <div
          id={character.id}
          className={`rarity${character.rarity} characters`}
        >
          <img src={character.icon} alt={`Icon of ${character.name}`} />
          <h3>{character.name}</h3>
          <p>{character.element}</p>
        </div>
      );
    });
    setAllCharacters(htmlCharacters);
  }

  function characterForm() {}

  function displayCharacters() {
    if (ownedCharacters) {
      return <h1>hi</h1>;
    } else {
      return <h2> No characters found - add them or refresh the page </h2>;
    }
  }

  return (
    <div>
      <h1>Genshin Team Builder!</h1>
      <h2>to get started add your characters!</h2>
      <button
        onClick={() => {
          setIsModalOpen(true);
          console.log(allCharacters);
        }}
      >
        Characters
      </button>
      <div>{allCharacters}</div>
      <button>Create me a team!</button>
      {isModalOpen && (
        <form>
          <h1>hi</h1>
        </form>
      )}
    </div>
  );
}

export default App;
