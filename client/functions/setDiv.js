function setDiv(div, character) {
    div.querySelector('.background-container').style.backgroundImage = `url(${character.img})`;
    div.querySelector('.img-container img').src = character.img;
    div.querySelector('.name').innerHTML = character.name;
    div.querySelector('.title').innerHTML = character.title;
}

export default setDiv