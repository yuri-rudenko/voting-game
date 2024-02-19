const character = document.querySelector('.result');
const container = document.querySelector('.container');
const loader = document.querySelector('.lds-ring');

let characters = []


const getCharacters = async () => {

    try {
        
        const response = await fetch('https://voting-game.onrender.com' + '/api/results/top/1', {
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

    characters.forEach((element, index) => {
        const characterClone = document.importNode(character.content, true);

        const place = characterClone.querySelector('.place')
        if(index+1 >= 1000) place.classList.add('fs-20')
        else if(index+1 >= 100) place.classList.add('fs-26')
        else place.classList.add('fs-36')
        place.innerHTML = index+1;


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
    if(characters) addCharacters(characters);
    loader.style.display = 'none';
    container.style.display = 'block';
}

start()
