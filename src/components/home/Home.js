import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useEffect, useState, useMemo } from "react";

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

  // Load ownedCharacters from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("ownedCharacters");
    if (stored) setOwnedCharacters(JSON.parse(stored));
    // eslint-disable-next-line
  }, []);

  // Save ownedCharacters to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem("ownedCharacters", JSON.stringify(ownedCharacters));
    // Deselect character if it's no longer owned
    if (
      ownedCharacters.length === 0 ||
      (selectedCharacter &&
        !ownedCharacters.some((char) => char.id === selectedCharacter.props.id))
    ) {
      setSelectedCharacter(null);
    }
    // eslint-disable-next-line
  }, [ownedCharacters]);

  // Memoized owned character objects for display
  const ownedCharacterObjs = useMemo(
    () =>
      ownedCharacters
        .map((char) =>
          allCharacters.find((character) => character.id === char.id)
        )
        .filter(Boolean),
    [ownedCharacters, allCharacters]
  );

  // Modal: character selection grid
  function characterForm() {
    return allCharacters.map((character) => {
      const isSelected = selectedIds.includes(String(character.id));
      return (
        <div key={character.id} className="character-form-item">
          <input
            type="checkbox"
            id={`character-checkbox-${character.id}`}
            name="characters"
            className={`rarity${character.rarity}`}
            value={character.id}
            onChange={handleCheckboxChange}
            checked={isSelected}
          />
          <label
            htmlFor={`character-checkbox-${character.id}`}
            className={`characters ${character.rarity} ${
              isSelected ? "selected" : ""
            }`}
          >
            <h3>{character.name}</h3>
            <img src={character.icon} alt={`Icon of ${character.name}`} />
          </label>
        </div>
      );
    });
  }
  
  function deSelectCharacter() {
    setChosenCharacter(null);
    setSelectedCharacter(null);
  }

  // Handle checkbox changes in modal
  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    setSelectedIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
    if (checked) {
      if (!ownedCharacters.some((char) => String(char.id) === value)) {
        const charToAdd = allCharacters.find(
          (char) => String(char.id) === value
        );
        setOwnedCharacters([...ownedCharacters, charToAdd]);
      }
    } else {
      setOwnedCharacters(
        ownedCharacters.filter((char) => String(char.id) !== value)
      );
    }
  }

  // Select a character for team building
  function selectCharacter(id) {
    if (selectedCharacter && selectedCharacter.props.id === id) {
      console.log("Deselecting character", id);
      setChosenCharacter(null);
      setSelectedCharacter(null);
      return;
    }
    const char = ownedCharacters.find((character) => character.id === id);
    setChosenCharacter(char);
    setSelectedCharacter(
      <div
        onClick={() => {
          deSelectCharacter(char.id);
        }}
        id={char.id}
        className={`rarity${char.rarity} characters selected`}
      >
        <img src={char.icon} alt={`Icon of ${char.name}`} />
        <h3>{char.name}</h3>
        <p>{char.element}</p>
      </div>
    );
  }

  // Display owned characters or prompt to add
  function displayCharacters() {
    if (ownedCharacterObjs.length) {
      return (
        <div className="characterContainer">
          <h2>
            Now select a character by clicking on them to start building a team!
          </h2>
          <div className="characterHolder">
            {ownedCharacterObjs.map((char) => (
              <div
                key={char.id}
                onClick={() => selectCharacter(char.id)}
                id={char.id}
                className={`rarity${char.rarity} characters`}
              >
                <img src={char.icon} alt={`Icon of ${char.name}`} />
                <h3>{char.name}</h3>
                <p>{char.element}</p>
              </div>
            ))}
          </div>
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

  // Open modal and sync selectedIds with ownedCharacters
  function openModal() {
    setSelectedIds(ownedCharacters.map((char) => String(char.id)));
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="main-content">
        {displayCharacters()}
        <button
          className="characters-btn"
          onClick={() => (isModalOpen ? setIsModalOpen(false) : openModal())}
        >
          Characters
        </button>
        {selectedCharacter && (
          <div className="selected-character-display">
            {selectedCharacter}
            <button onClick={() => navigate("/build")}>
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
          >
            X
          </button>
        </>
      )}
    </>
  );
}

export default Home;
