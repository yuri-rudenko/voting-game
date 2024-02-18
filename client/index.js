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
let loading = false
let count = {
    character: '',
    count: 0
}

let canVote = false;

function playAnimation(element, animation) {
    if(loading) return
    
    element.classList.add(`${animation}`);
    element.addEventListener('animationend', onAnimationEnd);

    if(element.classList.contains('top')) {

        const id = bottomActiveEl.querySelector('.id').classList[1];

        if(count.character === id) {
            if(count.count >= 4) {
                count.count = 0;
                playAnimation(bottomEl, 'bottom-anim');
                bottomActiveEl.querySelector('img').classList.add('winner');
            }
            else {
                count.count +=1;
            }
        }
        else {
            count.count = 1;
            count.character = id;
        }

    }
    else {
        const id = topActiveEl.querySelector('.id').classList[1];

        if(count.character === id) {
            if(count.count >= 4) {
                count.count = 0;
                playAnimation(topEl, 'top-anim');
                topActiveEl.querySelector('img').classList.add('winner');
            }
            else {
                count.count +=1;
            }
        }
        else {
            count.count = 1;
            count.character = id;
        }
    }

}

async function onAnimationEnd(event) {
    if (event.animationName === 'top-anim' || event.animationName === 'bottom-anim') {
        const el = event.target;
        el.classList.remove(`${event.animationName}`);
        if(el.classList.contains('top')) {
            /// bottom wins
            topActiveEl.innerHTML = el.innerHTML;
            const id = bottomActiveEl.querySelector('.id').classList[1];

            loading = true

            await addVote(id)
        }
        else {
            bottomActiveEl.innerHTML = el.innerHTML;
            const id = topActiveEl.querySelector('.id').classList[1];

            loading = true

            await addVote(id)
        }

        loading = false;
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

        bottomActiveEl.addEventListener('click', () => playAnimation(topEl, 'top-anim'));
        topActiveEl.addEventListener('click', () => playAnimation(bottomEl, 'bottom-anim'));

        addFirstCharacters();
    } catch (error) {
        alert(error.message);
    }
}

loadCharacters()