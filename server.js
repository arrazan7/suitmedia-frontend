const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/ideas', async (req, res) => {
    try {
        const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
            params: {
                ...req.query,
                'append[]': ['small_image', 'medium_image']
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
