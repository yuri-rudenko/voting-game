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

export default getCharacters