function getCharacterImgs(){
fetch("", options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => {
    return(data);
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
}