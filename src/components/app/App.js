import { useEffect, useState } from "react";
import "./App.css"
function App() {
  const [characters, setCharacters] = useState(null)
  const [isModalOpen, setIsModalOpen] = usestate(false)
  const [main, setMain] = useState(null)
  const [fetchedIcons, setFetchedIcons] = usestate([null])

  useEffect(() => {
    if(localStorage.getItem('savedCharacters')){
      setCharacters(localStorage.getItem('savedCharacters'))
    }
  },[])



  function displayCharacters(){
    if(characters){
      return <h1>hi</h1>
    } else {
      return <h2> No characters found - add them or refresh the page </h2>
    }
  }

  function fillCharacterInput(){
    var characterIcons = []
    if(fetchedIcons){
      fetchedIcons.forEach((icon) => {



      })
    }


    return(<h1>hi</h1>)
  }
  




  return (
    <div>
      <h1>Genshin Team Builder!</h1>
      <h2>to get started add your characters!</h2>
      <button>Characters</button>
      <div>
          {displayCharacters()}
      </div>
      <button>Create me a team!</button>
      {isModalOpen && 
      <form>
        {fillCharacterInput()}
        
      </form>
        }
    </div>
  )
}

export default App;
