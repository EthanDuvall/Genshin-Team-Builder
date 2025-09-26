import "./Builder.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTeam } from "../../util/fetchRequests.js";
import loadingGif from "../../util/loading.gif";
function Builder({ chosenCharacter, ownedCharacters, setErrorMessage, loading, setLoading }) {
  const [fetchedTeams, setFetchedTeams] = useState(null);
  

  const navigate = useNavigate();

  useEffect(() => {
    if (!chosenCharacter) {
      navigate("/");
      setErrorMessage("No character chosen");
      return;
    }

    const fetchTeams = async () => {
      try {
        setLoading(true);
        const ownedIds = ownedCharacters.map((char) => char.id);
        const data = await createTeam(chosenCharacter.id, ownedIds);
        setFetchedTeams(data || []);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        setErrorMessage("Failed to fetch teams.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [chosenCharacter, ownedCharacters, navigate, setErrorMessage]);

  function displayTeams() {
    if (!fetchedTeams || fetchedTeams.length === 0) {
      return <p>No teams could be generated.</p>;
    }

    return (
      <div className="teams-list">
        {fetchedTeams.map((team, idx) => (
          <div className="team" key={idx}>
            {team.members.map((member) => (
              <div
                key={member.id}
                className={`characters rarity${member.rarity}`}
              >
                <img
                  src={`https://brainy-leigh-genshinteambuilder-abb9e887.koyeb.app/${member.icon}`}
                  alt={`Icon of ${member.name}`}
                />
                <h3>{member.name}</h3>
                <p>
                  {member.element} <br />
                  {member.roles[0]}
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
      <div className="builder-content">
        {chosenCharacter && (
          <div className="chosen-character">
            <img
              src={`https://brainy-leigh-genshinteambuilder-abb9e887.koyeb.app/${chosenCharacter.icon}`}
              alt={`Icon of ${chosenCharacter.name}`}
            />
            <h3>{chosenCharacter.name}</h3>
            <p>Main role: {chosenCharacter.roles[0]}</p>
            <p>Element: {chosenCharacter.element}</p>
          </div>
        )}

        <h2>Generated Teams</h2>

        {loading ? (
          <div className="loading-container">
            <img src={loadingGif} alt="Loading..." />
          </div>
        ) : (
          displayTeams()
        )}
      </div>
    </div>
  );
}

export default Builder;
