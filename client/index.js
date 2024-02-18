import addCharacter from "./functions/addCharacter.js";
import addVote from "./functions/addVote.js";
import getCharacters from "./functions/getCharacters.js";
import setDiv from "./functions/setDiv.js";

const topActiveEl = document.querySelector('.top-active');
const bottomActiveEl = document.querySelector('.bottom-active');
const topEl = document.querySelector('.top');
const bottomEl = document.querySelector('.bottom');

let characters = []
let usedCharacters = []

function playAnimation(element, animation) {
    element.classList.add(`${animation}`);
    element.addEventListener('animationend', onAnimationEnd);
}

async function onAnimationEnd(event) {
    if (event.animationName === 'top-anim' || event.animationName === 'bottom-anim') {
        const el = event.target;
        el.classList.remove(`${event.animationName}`);
        if(el.classList.contains('top')) {
            /// bottom wins
            topActiveEl.innerHTML = el.innerHTML;
            await addVote(bottomActiveEl.querySelector('.id').classList[1])
        }
        else {
            bottomActiveEl.innerHTML = el.innerHTML;
            await addVote(topActiveEl.querySelector('.id').classList[1])
        }
        console.log(characters)
        characters = addCharacter(el, characters);
        if(characters.length <= 4) {
            const newCharacters = await getCharacters(usedCharacters)
            characters.push(...newCharacters)
        }
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
        usedCharacters.push(...characters);
        if(usedCharacters.length >= 700) usedCharacters = [];
        console.log(characters);

        bottomActiveEl.addEventListener('click', () => playAnimation(topEl, 'top-anim', characters));
        topActiveEl.addEventListener('click', () => playAnimation(bottomEl, 'bottom-anim', characters));

        addFirstCharacters();
    } catch (error) {
        console.error(error);
    }
}

loadCharacters()