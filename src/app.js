import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

const users = [
    {
        username: 'bobesponja', 
        avatar: "https://super.abril.com" 
    }    
];
const tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    }
];




server.post('/sign-up', (req,res) => {
    const { username, avatar } = req.body;
    if(username && avatar) {
        users.push({
            username,
            avatar
        });
        res.send('OK');
    } else {
        res.status(400).send('Missing information')
    }
});












server.get('/', (req,res) => {
    res.send('hello');
});

server.listen(5000,()=>console.log('Server listening on port 5000'));