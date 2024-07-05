const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const tags = ['Sports', 'Games', 'Health', 'Politics'];

app.get('/tags', (req, res) => {
    res.json(tags);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
