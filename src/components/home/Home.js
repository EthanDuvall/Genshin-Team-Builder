import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useEffect, useState, useMemo } from "react";
import FilterBar from "../filter/FilterBar";
function Home({
  allCharacters,
  setChosenCharacter,
  ownedCharacters,
  setOwnedCharacters,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [elementFilter, setElementFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [modalElementFilter, setModalElementFilter] = useState("all");
  const [modalRarityFilter, setModalRarityFilter] = useState("all");
  const navigate = useNavigate();



  const ownedCharacterObjs = useMemo(
    () =>
      ownedCharacters
        .map((char) =>
            allCharacters[String(char.id)]
        )
        .filter(Boolean),
    [ownedCharacters, allCharacters]
  );



  function characterForm() {
    return (
      <>
        {filterCharacters(
          allCharacters,
          modalElementFilter,
          modalRarityFilter
        ).map((character) => {
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
                <img
                  src={`https://brainy-leigh-genshinteambuilder-abb9e887.koyeb.app/${character.icon}`}
                  alt={`Icon of ${character.name}`}
                />

              </label>
            </div>
          );
        })}
      </>
    );
  }

  function deSelectCharacter() {
    setChosenCharacter(null);
    setSelectedCharacter(null);
  }


  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    setSelectedIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
    if (checked) {
      if (!ownedCharacters.some((char) => String(char.id) === value)) {
        const charToAdd = allCharacters[value]
        setOwnedCharacters([...ownedCharacters, charToAdd]);
      }
    } else {
      setOwnedCharacters(
        ownedCharacters.filter((char) => String(char.id) !== value)
      );
    }
  }


  function selectCharacter(id) {
    if (selectedCharacter && selectedCharacter.props.id === id){
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
       <img src = {`https://brainy-leigh-genshinteambuilder-abb9e887.koyeb.app/${char.icon}`}
                      alt={`Icon of ${char.name}`}/>
        <h3>{char.name}</h3>
        <p>{char.element}</p>
      </div>
    );
  }


  function displayCharacters() {
    if (ownedCharacterObjs.length) {
      return (
        <div className="characterContainer">
          <h2>
            Now select a character by clicking on them to start building a team!
          </h2>
          <FilterBar
            vertical
            filterState={{ element: elementFilter, rarity: rarityFilter }}
            setFilterState={({ element, rarity }) => {
              setElementFilter(element ?? elementFilter);
              setRarityFilter(rarity ?? rarityFilter);
            }}
          />
          <div className="characterHolder">
            {filterCharacters(
              ownedCharacterObjs,
              elementFilter,
              rarityFilter
            ).map((char) => (
              <div
                key={char.id}
                onClick={() => selectCharacter(char.id)}
                id={char.id}
                className={`rarity${char.rarity} characters`}
              >
                <img src = {`https://brainy-leigh-genshinteambuilder-abb9e887.koyeb.app/${char.icon}`}
               alt={`Icon of ${char.name}`}/>
                <h3>{char.name}</h3>
                <p>Main role <br/>{char.roles[0]}</p>
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


  function openModal() {
    setSelectedIds(ownedCharacters.map((char) => String(char.id)));
    setModalElementFilter("all");
    setModalRarityFilter("all");
    setIsModalOpen(true);
  }


  function filterCharacters(list, element, rarity) {
    return Object.values(list).filter(
      (char) =>
        (element === "all" || char.element === element) &&
        (rarity === "all" || char.rarity === rarity)
    );
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
          <div className="characterModal-wrapper">
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <FilterBar
              filterState={{
                element: modalElementFilter,
                rarity: modalRarityFilter,
              }}
              setElement={setModalElementFilter}
              setRarity={setModalRarityFilter}
            />
            <div className="characterModal">{characterForm()}</div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
