import setDiv from "./setDiv.js";

function addCharacter(div, characters) {
    if(characters[0]) setDiv(div, characters[0]);
    characters.splice(0, 1)
    return characters;
}

export default addCharacter