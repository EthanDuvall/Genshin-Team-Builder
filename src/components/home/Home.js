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
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      ownedCharacters.length === 0 ||
      !ownedCharacters.some(
        (char) => selectedCharacter && char.id === selectedCharacter.props.id
      )
    ) {
      setSelectedCharacter(null);
    }
  }, [ownedCharacters]);

  function characterForm() {
    return allCharacters.map((character) => {
      //const isOwned = ownedCharacters.some((owned) => owned.id == character.id);
      const isSelected = selectedIds.includes(String(character.id));
      return (
        <div
          key={character.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            id={`character-checkbox-${character.id}`}
            name="characters"
            className={`rarity${character.rarity} `}
            value={character.id}
            onChange={handleCheckboxChange}
            checked={isSelected}
          />
          <label
            htmlFor={`character-checkbox-${character.id}`}
            className={`${
              isSelected ? "selected" : ""
            } ${`${character.rarity}`} characters`}
          >
            <h3>{character.name}</h3>
            <img src={character.icon} alt={`Icon of ${character.name}`} />
          </label>
        </div>
      );
    });
  }

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    setSelectedIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
    // Update ownedCharacters immediately for UX, or do it on submit for batch update
    if (checked) {
      // Add to owned if not already present
      if (!ownedCharacters.some((char) => String(char.id) === value)) {
        const charToAdd = allCharacters.find(
          (char) => String(char.id) === value
        );
        setOwnedCharacters([...ownedCharacters, charToAdd]);
      }
    } else {
      // Remove from owned
      setOwnedCharacters(
        ownedCharacters.filter((char) => String(char.id) !== value)
      );
    }
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
        <div className="characterContainer">
          <h2>
            Now select a character by clicking on them to start building a team!{" "}
          </h2>
          <div className="characterHolder">{displayedCharacters}</div>
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

  return (
    <>
      <div className={`main-content`}>
        {displayCharacters()}
        <button
          className="characters-btn"
          onClick={() => {
            if (isModalOpen) {
              setIsModalOpen(false);
            } else {
              // Sync selectedIds with ownedCharacters when opening modal
              setSelectedIds(ownedCharacters.map((char) => String(char.id)));
              setIsModalOpen(true);
            }
          }}
        >
          Characters
        </button>

        {selectedCharacter && (
          <div className="selected-character-display">
            {selectedCharacter}
            <button
              onClick={() => {
                navigate("/build");
              }}
            >
              Create me a team!
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <>
          <div className="characterModal">{characterForm()}</div>
          <button
            type="button"
            className="close-modal-btn"
            onClick={() => setIsModalOpen(false)}
            style={{ marginTop: "1.5rem", alignSelf: "flex-end" }}
          >
            X
          </button>
        </>
      )}
    </>
  );
}

export default Home;
