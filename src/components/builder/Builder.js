import "./Builder.scss";
import { useEffect, useState } from "react";
import fetchedTeams from "../../util/teams.json";
import { useNavigate } from "react-router-dom";
function Builder({ chosenCharacter, ownedCharacters, setErrorMessage }) {
  const [teams, setTeams] = useState(null);
  const [generatedTeams, setGeneratedTeams] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!chosenCharacter) {
      navigate("/");
      setErrorMessage("No character chosen");
      return;
    } else {
      fetchTeams(chosenCharacter);
    }
  }, [chosenCharacter]);

  useEffect(() => {
    if (teams) {
      formTeams();
    }
  }, [teams]);

  function fetchTeams(character) {
    if (!fetchedTeams.find((team) => team.id === character.id)) {
      setErrorMessage("No teams found for this character");
    } else {
      setTeams(fetchedTeams.find((team) => team.id === character.id));
    }
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
    const onFieldCount =
      (chosenCharacter.fieldRole === "on-field" ? 1 : 0) +
      team.filter((c) => c.fieldRole === "on-field").length;
    const hasDuplicates = new Set(team.map((c) => c.name)).size !== team.length;
    return onFieldCount === 1 && !hasDuplicates;
  }

  function generateTeam(r1, r2, r3) {
    let attempts = 0;
    while (attempts <= 25) {
      if (r1.length === 0 || r2.length === 0 || r3.length === 0) {
        setErrorMessage("no characters available");
        return false;
      }

      const team = [
        r1[Math.floor(Math.random() * r1.length)],
        r2[Math.floor(Math.random() * r2.length)],
        r3[Math.floor(Math.random() * r3.length)],
      ];

      if (checkTeams(team)) {
        return team;
      }
      attempts++;
      if (attempts > 10) {
        setErrorMessage("too many attempts");
        break;
      }
    }
    return false;
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
      } else {
        setErrorMessage("Could not generate team");
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
    return (
      <div className="teams-list">
        {generatedTeams.map((team, idx) => (
          <div className="team" key={idx}>
            {team.map((member) => (
              <div
                key={member.id}
                id={member.id}
                className={`characters rarity${member.rarity}`}
              >
                <img src={member.icon} alt={`Icon of ${member.name}`} />
                <h3>{member.name}</h3>
                <p>
                  {member.element} <br />
                  {member.fieldRole}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="builder-container">
      <button className="return-btn" onClick={() => navigate(-1)}>
        Return
      </button>
      {chosenCharacter && (
        <div className="chosen-character">
          <img
            src={chosenCharacter.icon}
            alt={`Icon of ${chosenCharacter.name}`}
          />
          <h3>{chosenCharacter.fieldRole}</h3>
          <h3>{chosenCharacter.name}</h3>
          <p>{chosenCharacter.element}</p>
        </div>
      )}
      <button className="generate-btn" onClick={formTeams}>Generate Again</button>
      <h2>Generated Teams</h2>
      {generatedTeams && displayTeams()}
    </div>
  );
}

export default Builder;
