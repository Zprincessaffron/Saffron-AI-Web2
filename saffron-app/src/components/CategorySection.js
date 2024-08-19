import React, { useState } from 'react';
import { TextField, Button, Container, List, ListItem, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categoryEndpoints = {
    1: 'culinary',
    2: 'beauty',
    3: 'medicinal',
    4: 'pregnancy'
};

function CategorySection({ category }) {
    const [userInput, setUserInput] = useState('');
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/${categoryEndpoints[category]}/`, {
                query: userInput,
            });
            setItems(res.data.items || []);
            setResponse(res.data.details || '');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleItemClick = (itemName) => {
        // Navigate to /details and pass itemName in state
        navigate('/details', { state: { itemName, category } }); 
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {categoryEndpoints[category].charAt(0).toUpperCase() + categoryEndpoints[category].slice(1)} Information
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={`Enter your query for ${categoryEndpoints[category]}`}
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Get Information
                </Button>
            </form>

            {/* Display Items */}
            {items.length > 0 && (
                <List>
                    {items.map((item, index) => (
                        <ListItem key={index}>
                            <Link 
                                component="button" // Make Link behave like a button
                                onClick={() => handleItemClick(item)} 
                            >
                                {item}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Display Additional Response */}
            {response && (
                <Typography variant="body1" gutterBottom>
                    {response}
                </Typography>
            )}
        </Container>
    );
}

export default CategorySection;