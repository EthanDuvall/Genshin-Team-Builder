import "./Builder.css";
import { useEffect, useState } from "react";
import fetchedTeams from "../../util/teams.json";
function Builder({ chosenCharacter }) {
  const [teams, setTeams] = useState(null);
  const [generatedTeams, setGeneratedTeams] = useState(null)

  useEffect(() => {
    fetchTeams(chosenCharacter);
    generateTeam()
  }, []);

  function fetchTeams(character) {
    //Placeholder until api is created it will use the same logic without having to search an array
    setTeams(fetchedTeams.find((team) => team.id === character.id));
    
  }
  function generateTeam() {










  }

  return (
    <div>
      <div
        id={chosenCharacter.id}
        className={`rarity${chosenCharacter.rarity} characters`}
      >
        <img
          src={chosenCharacter.icon}
          alt={`Icon of ${chosenCharacter.name}`}
        />
        <h3>{chosenCharacter.fieldRole}</h3>
        <h3>{chosenCharacter.name}</h3>
        <p>{chosenCharacter.element}</p>
      </div>
    </div>
  );
}

export default Builder;
