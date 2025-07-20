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
    setAllCharacters(characters);
  }

  function characterForm() {
    var formContents = [];
    characters.forEach((character) => {
      formContents.push(
        <>
          <input
            type="checkbox"
            id={character.id}
            name="characters"
            className={`rarity${character.rarity} characters`}
            value={character.id}
          />

          <label htmlFor={character.id}>
            {<h3>{character.name}</h3>}
            {<img src={character.icon} alt={`Icon of ${character.name}`} />}
          </label>
        </>
      );
    });
    return formContents;
  }

  function displayCharacters() {
    if (ownedCharacters) {
      const displayedCharacters = ownedCharacters.map((selectedCharacter) => {
        const foundCharacter = allCharacters.find((character) => {
          return character.id == selectedCharacter;
        });
        if (foundCharacter) {
          return (
            <div
              id={foundCharacter.id}
              className={`rarity${foundCharacter.rarity} characters`}
            >
              <img
                src={foundCharacter.icon}
                alt={`Icon of ${foundCharacter.name}`}
              />
              <h3>{foundCharacter.name}</h3>
              <p>{foundCharacter.element}</p>
            </div>
          );
        }
      });

      return displayedCharacters;
    } else {
      return <h2> No characters found - add them or refresh the page </h2>;
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsModalOpen(false);
    const formData = new FormData(e.target);
    const selected = formData.getAll("characters");
    setOwnedCharacters(selected);
  }
  return (
    <div>
      <h1>Genshin Team Builder!</h1>
      <h2>to get started add your characters!</h2>
      <div>{displayCharacters()}</div>
      <button
        onClick={() => {
          if (isModalOpen) {
            setIsModalOpen(false);
          } else {
            setIsModalOpen(true);
          }
        }}
      >
        Characters
      </button>

      <button>Create me a team!</button>
      {isModalOpen && (
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          {characterForm()}
          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default App;
