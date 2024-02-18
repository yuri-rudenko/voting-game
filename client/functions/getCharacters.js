const getCharacters = async (usedCharacters) => {
    try {
        const response = await fetch('https://voting-game.onrender.com' + '/api/characters', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usedCharacters }) 
        });

        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

export default getCharacters