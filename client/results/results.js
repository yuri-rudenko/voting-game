const character = document.querySelector('.result');
const container = document.querySelector('.container');
const loader = document.querySelector('.lds-ring');
const input = document.querySelector('.search-character');
const returnButton = document.querySelector('.return-to-votes')

let characters = []
let curCharacters = []

function clearBody() {

    const characters = document.querySelectorAll('.character');
    characters.forEach((char) => {
        char.remove()
    })

}

const setCurCharacters = (name) => {
    if(!name) {
        curCharacters = characters;
        clearBody();
        addCharacters(curCharacters);
        return;
    }
    curCharacters = characters.filter(char => char.name.toLowerCase().includes(name.toLowerCase()) || char.title.includes(name));
    clearBody();

    addCharacters(curCharacters);

}


const getCharacters = async () => {

    try {
        
        const response = await fetch('https://voting-game.onrender.com' + '/api/results/top/1000', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error)
    }

}

const addCharacters = (characters) => {

    characters.forEach((element) => {
        const characterClone = document.importNode(character.content, true);

        const place = characterClone.querySelector('.place')
        if(element.place >= 1000) place.classList.add('fs-20')
        else if(element.place >= 100) place.classList.add('fs-26')
        else place.classList.add('fs-36')
        place.innerHTML = element.place;

        characterClone.querySelector('img').src = element.img;

        const longestWordName = element.name.split(' ').find(word => word.length >= 10)
        const name = characterClone.querySelector('.name')

        name.innerHTML = element.name;
        if(longestWordName) name.classList.add('fs-13')

        const longestWordTitle = element.title.split(' ').find(word => word.length >= 10)
        const title = characterClone.querySelector('.title');

        title.innerHTML = element.title;
        if(longestWordTitle) title.classList.add('fs-13');
        
        characterClone.querySelector('.votesNumber').innerHTML = element.votesNumber;
        characterClone.querySelector('.popularity').innerHTML = element.popularity + 1;

        container.appendChild(characterClone);
    });

}

const start = async () => {
    characters = await getCharacters();
    characters = characters.map((char, index) => {
        return { ...char, place: index + 1 };
    });
    if(characters) addCharacters(characters);
    setCurCharacters()
    loader.style.display = 'none';
    container.style.display = 'block';
}

input.addEventListener('input', (e) => setCurCharacters(e.target.value));
returnButton.addEventListener('click', () => window.location.href = '../index.html')

start()
