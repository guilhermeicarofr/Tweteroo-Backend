import express from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];


function loadTenTweets(page) {
    return tweets.filter((item,index) => index >= (tweets.length)-(10*page) && index<(tweets.length)-((10*page)-10));
}
function loadUserTweets(username) {
    return tweets.filter(tweet => tweet.username === username);
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
        res.status(201).send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios!');
    }
});

server.post('/tweets', (req,res) => {
    const { tweet } = req.body;
    const username = req.headers.user;
    if(username && tweet) {
        tweets.push({
            username,
            tweet
        });
        res.status(201).send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios!');
    }
});

server.get('/tweets', (req,res) => {
    const { page } = req.query;
    if(page >= 1) {
        const tweetList = loadTenTweets(page).reverse().map(tweet => getAvatar(tweet));
        res.send(tweetList);
    } else {
        res.status(400).send('Informe uma página válida!');
    }
});

server.get('/tweets/:username', (req,res) => {
    const { username } = req.params;
    const tweetList = loadUserTweets(username).reverse().map(tweet => getAvatar(tweet));
    res.send(tweetList);
});


server.listen(5000,()=>console.log('Server listening on port 5000...'));