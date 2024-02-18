const addVote = async (characterId, count) => {
    if(count.count === 0 || characterId !== count.character) return;
    try {
        const response = await fetch('http://localhost:5000/api/vote', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${characterId}`
            },
            body: JSON.stringify({ characterId }) 
            
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

export default addVote