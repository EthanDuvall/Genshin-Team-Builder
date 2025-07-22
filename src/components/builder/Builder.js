import "./Builder.css";
import { useEffect, useState } from "react";

function Builder(chosenCharacter) {
  const [teams, setTeams] = useState(null);



  useEffect(() => {
    fetchTeams(chosenCharacter)
  }, []);



  function fetchTeams(character) {
    //Placeholder until api is created it will use the same logic without having to search an array 
    

  } 
  function generateTeam() {}

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
}

export default Builder;
