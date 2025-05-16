import { useEffect, useState } from "react";
import "./App.css"
function App() {
  const [characters, setCharacters] = useState(null)  ;
  const [main, setMain] = useState(null)

  function displayCharacters(){
    if(0){
      return <h1>hi</h1>
    } else {
      return <h2> No characters found - add them or refresh the page </h2>
    }
  }


  return (
    <div>
      <h1>Genshin Team Builder!</h1>
      <h2>to get started add your characters manually or by connecting your hoyolab account!</h2>
      <button>Connect</button>
      <button>Add + </button>
      <div>
          {displayCharacters()}
      </div>
      <button>Create me a team!</button>
    </div>
  )
}

export default App;
