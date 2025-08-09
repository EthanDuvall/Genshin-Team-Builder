import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useEffect, useState } from "react";
function Home({
  allCharacters,
  setChosenCharacter,
  ownedCharacters,
  setOwnedCharacters,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigate = useNavigate();

  function characterForm() {
    var formContents = [];
    var formCharacters = [];
    // Checking to ensure that theres no dupeable characters added to the owned list

    allCharacters.map((character) => {
      if (!ownedCharacters.includes(character)) {
        formCharacters.push(character);
      }
    });
    // Just formatting the character objects into a input for the form
    formCharacters.map((character) => {
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
    //Sets this variable for when it transitions to the /build
    setChosenCharacter(char);

    setSelectedCharacter(
      <div id={char.id} className={`rarity${char.rarity} characters selected`}>
        <img src={char.icon} alt={`Icon of ${char.name}`} />
        <h3>{char.name}</h3>
        <p>{char.element}</p>
      </div>
    );
  }

  function displayCharacters() {
    if (ownedCharacters.length) {
      console.log(ownedCharacters);
      const displayedCharacters = ownedCharacters.map((char) => {
        const foundCharacter = allCharacters.find((character) => {
          return character.id == char.id;
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
      return (
        <div>
          <h2>
            Now select a character by clicking on them to start building a team!{" "}
          </h2>
          <div>{displayedCharacters}</div>
        </div>
      );
    } else {
      return (
        <div className="noChar">
          <h2>To get started add your characters!</h2>
          <h2>No characters found - add them or refresh the page</h2>
        </div>
      );
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsModalOpen(false);
    const formData = new FormData(e.target);
    const selected = formData.getAll("characters");
    const owned = selected.map((character) => {
      return allCharacters.find((charObj) => {
        return charObj.id == character;
      });
    });
    setOwnedCharacters([...ownedCharacters, ...owned]);
  }

  return (
    <>
      {displayCharacters()}
      <button className="characters-btn"
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
      {selectedCharacter}
      {selectedCharacter && (
        <button
          onClick={() => {
            navigate("/build");
          }}
        >
          Create me a team!
        </button>
      )}

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
    </>
  );
}

export default Home;
