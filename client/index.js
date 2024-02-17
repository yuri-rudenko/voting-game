import addCharacter from "./functions/addCharacter.js";
import getCharacters from "./functions/getCharacters.js";
import setDiv from "./functions/setDiv.js";

const topActiveEl = document.querySelector('.top-active');
const bottomActiveEl = document.querySelector('.bottom-active');
const topEl = document.querySelector('.top');
const bottomEl = document.querySelector('.bottom');

let characters = []

function playAnimation(element, animation) {
    element.classList.add(`${animation}`) 
    element.addEventListener('animationend', onAnimationEnd);
}

function onAnimationEnd(event) {
    if (event.animationName === 'top-anim' || event.animationName === 'bottom-anim') {
        const el = event.target;
        el.classList.remove(`${event.animationName}`);
        if(el.classList.contains('top')) {
            topActiveEl.innerHTML = el.innerHTML;
        }
        else {
            bottomActiveEl.innerHTML = el.innerHTML;
        }
        console.log(characters)
        characters = addCharacter(el, characters);
        
    }
}

function addFirstCharacters() {

    setDiv(topActiveEl, characters[0]);
    setDiv(bottomActiveEl, characters[1]);
    setDiv(topEl, characters[2]);
    setDiv(bottomEl, characters[3]);

    characters.splice(0, 4);
    return characters;
}

async function loadCharacters() {
    try {
        characters = await getCharacters();
        console.log(characters);

        bottomActiveEl.addEventListener('click', () => playAnimation(topEl, 'top-anim', characters));
        topActiveEl.addEventListener('click', () => playAnimation(bottomEl, 'bottom-anim', characters));

        addFirstCharacters();
    } catch (error) {
        console.error(error);
    }
}

loadCharacters()