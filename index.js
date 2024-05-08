import express from 'express';
import fetch from 'node-fetch'; // No longer use require
import { createClient } from 'redis';

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = createClient({
  url: `redis://localhost:${REDIS_PORT}`
});

const app = express();

// controller -- make request to Github for data
async function getRepos(req, res, next) {
  try {
    console.log('Fetching data');

    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    res.send(data);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

app.get('/repos/:username', getRepos);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
