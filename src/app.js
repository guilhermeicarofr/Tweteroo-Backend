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



server.get('/', (req,res) => {
    res.send('hello');
});



server.listen(5000,()=>console.log('Server listening on port 5000'));