import express from 'express';
import basicAuth from 'express-basic-auth';

const app = express();

app.use(basicAuth({
    users: { 'Barron': 'minicooper'},
    unauthorizedResponse: 'You are not allowed to access this resource.'
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

// curl -u Barron:suitcase http://localhost:3000
