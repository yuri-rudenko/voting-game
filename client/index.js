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
        characters = addCharacter(el);
        
    }
}

function addCharacter(div) {
    if(characters[0]) setDiv(div, characters[0]);
    characters.splice(0, 1)
    return characters;
}

function setDiv(div, character) {
    div.querySelector('.background-container').style.backgroundImage = `url(${character.img})`;
    div.querySelector('.img-container img').src = character.img;
    div.querySelector('.name').innerHTML = character.name;
    div.querySelector('.title').innerHTML = character.title;
}

function addFirstCharacters(characters) {

    setDiv(topActiveEl, characters[0]);
    setDiv(bottomActiveEl, characters[1]);
    setDiv(topEl, characters[2]);
    setDiv(bottomEl, characters[3]);

    characters.splice(0, 4);
    return characters;
}

// characters.push(
//     {name: "Power", title: 'Chainsaw Man', img: 'https://cdn.myanimelist.net/images/characters/7/494969.jpg'},
//     {name: "Uzumaki, Naruto", title: 'Naruto', img: 'https://cdn.myanimelist.net/images/characters/2/284121.jpg'},
//     {name: "Eren Yeager", title: 'Shingeki no Kyojin', img: 'https://cdn.myanimelist.net/images/characters/10/216895.jpg'},
//     {name: "Megumin", title: 'Kono Subarashii Sekai ni Shukufuku wo!', img: 'https://cdn.myanimelist.net/images/characters/14/349249.jpg'},
//     {name: "Hitagi Senjougahara", title: 'Bakemonogatari', img: 'https://cdn.myanimelist.net/images/characters/11/287902.jpg'},
//     {name: "Fate/stay night", title: 'Saber', img: 'https://cdn.myanimelist.net/images/characters/6/275276.jpg'},
// )

const getCharacters = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/characters');
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function loadCharacters() {
    try {
        characters = await getCharacters();
        console.log(characters);

        bottomActiveEl.addEventListener('click', () => playAnimation(topEl, 'top-anim'));
        topActiveEl.addEventListener('click', () => playAnimation(bottomEl, 'bottom-anim'));

        addFirstCharacters(characters);
    } catch (error) {
        console.error(error);
    }
}

loadCharacters()