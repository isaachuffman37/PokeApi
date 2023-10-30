let results = null;
async function getPokemonData() {
  let name = setName();
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  
  if (response.ok) {
    const data = await response.json();
    displayData(data);
  }
  else{
    console.log("Pokemon by that name does not exist")
  }
}

function displayData(pokemon){
    const name = pokemon.name;
    const type = capitalize(pokemon.types[0].type.name);
    const moves = getAdvancedMoves(pokemon);
    const pokeHeight = pokemon.height;
    const pokeWeight = pokemon.weight;



    // Add normal front image to html
    const normalImg = document.getElementById("normal_pic");
    normalImg.style.borderColor = '#1D3557'
    normalImg.src = pokemon.sprites.other.home.front_default;
    

    // Add shiny front image to html
    const shinyImg = document.getElementById("shiny_pic");
    shinyImg.style.borderColor = '#1D3557'
    shinyImg.src = pokemon.sprites.other.home.front_shiny;

    // Add name to main header
    document.querySelector(".header").innerHTML = capitalize(name);

    // Add moves to moves list header
    document.getElementById("poke_moves").innerHTML = "Advanced Moves" ;
    document.getElementById("movesDescription").innerHTML = moves;



    // Add type to type html
    document.getElementById("poke_type").innerHTML = "Type";
    document.getElementById("typeDescription").innerHTML = type;
    
    // Add height and weight to html
    document.getElementById("poke_size").innerHTML = "Size";
    document.getElementById("sizeDescription").innerHTML = pokeHeight + "ft " + pokeWeight + "lbs";

    // Add pokemon data to console
    console.log(pokemon);

    // Add sub-header to pics
    document.getElementById("shiny").innerHTML = "Shiny";
    document.getElementById("normal").innerHTML = "Normal";
  
}

function getAdvancedMoves(pokemon) {
    let movesList = [];
    movesListString = ""
    for (let i = 0; i<Object.entries(pokemon.moves).length; i++){
        if ((pokemon.moves[i].version_group_details[0].level_learned_at) >= 20){
          movesList.push(pokemon.moves[i].move.name)   
        }
    }
    const capStrings = movesList.map(str => capitalize(str))
    const capOrderedStrings = capStrings.sort()
    capOrderedStrings.forEach(str =>{
      if(str != capOrderedStrings[capOrderedStrings.length - 1]){
        movesListString += str + " | " 
      }
      else{
        movesListString += str
      }})

    return movesListString;
}

function capitalize(inputString) {
    const capFirstletter = inputString.charAt(0).toUpperCase();
    const restOfWord = inputString.slice(1)
    const capWord = capFirstletter + restOfWord
    return capWord
  }


function setName() {
  return document.getElementById('pokemonName').value;
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById('submit_button');
  submitButton.addEventListener("click", getPokemonData);
})