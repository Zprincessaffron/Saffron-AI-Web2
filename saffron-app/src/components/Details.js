import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import axios from 'axios';

const categoryEndpoints = {
    1: 'culinary',
    2: 'beauty',
    3: 'medicinal',
    4: 'pregnancy'
};

function Details() {
    const [response, setResponse] = useState('');
    const [searchParams] = useSearchParams(); 
    const category = searchParams.get('category'); 

    useEffect(() => {
        const fetchDetails = async () => {
            if (category) { 
                try {
                    const res = await axios.post(`http://localhost:8000/${categoryEndpoints[category]}/details/`, {
                        item: 'someItemName' // Make sure you are passing a valid item name here
                    });
                    setResponse(res.data.details);
                } catch (error) {
                    console.error('Error fetching details:', error);
                    setResponse('An error occurred. Please try again.');
                }
            }
        };

        fetchDetails(); 
    }, [category]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Item Details</Typography>
            <Paper style={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="body1">{response}</Typography>
            </Paper>
        </Container>
    );
}

export default Details;