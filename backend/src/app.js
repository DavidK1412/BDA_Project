const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const routerApi = require('./routes');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Listening http://localhost:${port}`);
})