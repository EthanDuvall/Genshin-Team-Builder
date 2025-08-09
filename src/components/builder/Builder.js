import "./Builder.scss";
import { useEffect, useState } from "react";
import fetchedTeams from "../../util/teams.json";
function Builder({ chosenCharacter, ownedCharacters }) {
  const [teams, setTeams] = useState(null);
  const [generatedTeams, setGeneratedTeams] = useState(null);

  useEffect(() => {
    fetchTeams(chosenCharacter);
  }, [chosenCharacter]);

  useEffect(() => {
    if (teams) {
      formTeams();
    }
  }, [teams]);

  function fetchTeams(character) {
    //Placeholder until api is created it will use the same logic without having to search an array
    setTeams(fetchedTeams.find((team) => team.id === character.id));
  }

  function checkIfOwned(character) {
    return ownedCharacters.find((owned) => owned.name === character);
  }

  function grabCharacters(element) {
    return teams[element]
      .map((character) => checkIfOwned(character))
      .filter(Boolean);
  }

  function checkTeams(team) {
    var onfielder = 0;
    if (chosenCharacter.fieldRole === "on-field") {
      onfielder++;
    }
    team.forEach((character) => {
      console.log(team, "team");
      if (character.fieldRole === "on-field") {
        onfielder++;
      }
    });
    const hasDuplicates =
      new Set(team.map((char) => char.name)).size !== team.length;
    if (onfielder === 1 && !hasDuplicates) {
      return true;
    } else {
      return false;
    }
  }

  function generateTeam(r1, r2, r3) {
    var team = [];
    if (r1.length === 0 || r2.length === 0 || r3.length === 0) {
      return false;
    }

    team.push(r1[Math.floor(Math.random() * r1.length)]);
    team.push(r2[Math.floor(Math.random() * r2.length)]);
    team.push(r3[Math.floor(Math.random() * r3.length)]);
    if (checkTeams(team)) {
      return team;
    } else {
      return generateTeam(r1, r2, r3);
    }
  }

  function formTeams() {
    const archatypes = teams.teams;
    var teamCombos = [];

    archatypes.forEach((teamReq) => {
      const element1 = grabCharacters(teamReq[0]);
      const element2 = grabCharacters(teamReq[1]);
      const element3 = grabCharacters(teamReq[2]);

      const team = generateTeam(element1, element2, element3);
      if (team) {
        teamCombos.push(team);
      }
    });
    if (teamCombos.length === 0) {
      return false;
    } else {
      setGeneratedTeams(teamCombos);
      return;
    }
  }
  function displayTeams() {
    return generatedTeams.map((team) => {
      return (
        <div className="team">
          <div
            id={team[0].id}
            className={`rarity ${team[0].rarity} characters`}
          >
            <img src={team[0].icon} alt={`Icon of ${team[0].name}`} />
            <h3>{team[0].name}</h3>
            <p>{team[0].element}</p>
          </div>
          <div
            id={team[1].id}
            className={`rarity ${team[1].rarity} characters`}
          >
            <img src={team[1].icon} alt={`Icon of ${team[1].name}`} />
            <h3>{team[1].name}</h3>
            <p>{team[1].element}</p>
          </div>
          <div
            id={team[2].id}
            className={`rarity${team[2].rarity} characters `}
          >
            <img src={team[2].icon} alt={`Icon of ${team[2].name}`} />
            <h3>{team[2].name}</h3>
            <p>{team[2].element}</p>
          </div>
        </div>
      );
    });
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
      {generatedTeams && displayTeams()}
    </div>
  );
}

export default Builder;
