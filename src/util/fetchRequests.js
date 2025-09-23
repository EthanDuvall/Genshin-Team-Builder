
async function fetchCharacters(setErrorMessage) {
  try {
    const response = await fetch("https://brainy-leigh-genshinteambuilder-abb9e887.koyeb.app/genshinBuilder/characters");

    if (!response.ok) {
      const errorMsg = `HTTP error! status: ${response.status}`;
      if (setErrorMessage) setErrorMessage(errorMsg);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Fetch error:", error);
    if (setErrorMessage) setErrorMessage(error.message);
    return null;
  }
}


async function createTeam(id, ownedCharacters, setErrorMessage) {
  try {
    const response = await fetch(
      "https://brainy-leigh-genshinteambuilder-abb9e887.koyeb.app/genshinBuilder/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coreId: id, ownedCharacters }),
      }
    );

    if (!response.ok) {
      const errorMsg = "Failed to create team";
      if (setErrorMessage) setErrorMessage(errorMsg);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Create team error:", error);
    if (setErrorMessage) setErrorMessage(error.message);
    return null;
  }
}

export{ fetchCharacters, createTeam };
