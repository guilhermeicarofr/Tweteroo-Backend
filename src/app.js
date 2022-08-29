import express from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];


function lastTenTweets() {
    return tweets.filter((item,index) => index >= (tweets.length)-10);
}
function getAvatar(tweet) {
    return {
        ...tweet,
        avatar: users.find(user => user.username === tweet.username).avatar
    };
}


server.post('/sign-up', (req,res) => {
    const { username, avatar } = req.body;
    if(username && avatar) {
        users.push({
            username,
            avatar
        });
        res.send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios!');
    }
});

server.post('/tweets', (req,res) => {
    const { username, tweet } = req.body;
    if(username && tweet) {
        tweets.push({
            username,
            tweet
        });
        res.send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios!');
    }
});

server.get('/tweets', (req,res) => {
    const tweetList = lastTenTweets().map((tweet) => getAvatar(tweet));
    res.send(tweetList);
});


server.listen(5000,()=>console.log('Server listening on port 5000'));