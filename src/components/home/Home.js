import "./Home.css";
import { useEffect, useState } from "react";
function Home(allCharacters) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownedCharacters, setOwnedCharacters] = useState();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  function characterForm() {
    var formContents = [];
    allCharacters.allCharacters.map((character) => {
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
  function selectCharacter(id) {
    const char = ownedCharacters.find((character) => {
      return character.id == id;
    });

    setSelectedCharacter(
      <div
        id={char.id}
        className={`rarity${char.rarity} characters selected`}
      >
        <img src={char.icon} alt={`Icon of ${char.name}`} />
        <h3>{char.name}</h3>
        <p>{char.element}</p>
      </div>
    );
  }

  function displayCharacters() {
    if (ownedCharacters) {
      const displayedCharacters = ownedCharacters.map((selectedCharacter) => {
        const foundCharacter = allCharacters.allCharacters.find((character) => {
          return character.id == selectedCharacter.id;
        });
        if (foundCharacter) {
          return (
            <div
              onClick={() => {
                selectCharacter(foundCharacter.id);
              }}
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
    const owned = selected.map((character) => {
      return allCharacters.allCharacters.find((charObj) => {
        return charObj.id == character;
      });
    });
    setOwnedCharacters(owned);
  }

  return (
    <div>
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
      <div>{selectedCharacter}</div>
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

export default Home;
