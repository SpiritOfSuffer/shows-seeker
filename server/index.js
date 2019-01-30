const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require("mongodb");


const app = express();
const port = process.env.PORT || 3000;
const API = 'https://api.myshows.me/v2/rpc/';

app.use(bodyParser.json());
app.use(cors());


// @route   GET /v1/api
// @desc    Get Shows By Title
// @access  Public
app.get('/v1/api', async (req, res) => {
    const title = req.query.title;
    var genre;

    if(req.query.genre){
        genre = req.query.genre;
        var genreId = getGenreId(genre);
        console.log("id is " + genreId);
    }
    
    const options = {
        method: 'POST',
        url: API,
        headers : {
            'Content-Type' : 'application/json'
        },
        json: {
            "jsonrpc": "2.0",
            "method": "shows.Search",
            "params": {
              "query": `${title}`
            },
            "id": 1
          }
        };
    
    await request(options, async (error, response, body) => {
        if(!error && response.statusCode == 200){
            console.log(body.result.length);
            console.log(genreId);

            var data = [];
            for(var i = 0; i < body.result.length; i++) {
                if(genreId) {
                    
                    console.log(genreId);
                    console.log(body.result[i].genreIds);
                    for(var j = 0; j < body.result[i].genreIds.length; i++) {
                        if(genreId == body.result[i].genreIds[j]) {
                            data.push(
                                { 
                                    id: body.result[i].id,
                                    title: body.result[i].title,
                                    titleOriginal: body.result[i].titleOriginal,
                                    description: body.result[i].description,
                                    totalSeasons: body.result[i].totalSeasons,
                                    country: body.result[i].country,
                                    started: body.result[i].started,
                                    year: body.result[i].year,
                                    rating: body.result[i].rating,
                                    image: body.result[i].image,
                                    channel: body.result[i].network.title,
                                    genreIds: body.result[i].genreIds
                                 }
                            );
                        }
                    }
                }
                data.push(
                    { 
                        id: body.result[i].id,
                        title: body.result[i].title,
                        titleOriginal: body.result[i].titleOriginal,
                        description: body.result[i].description,
                        totalSeasons: body.result[i].totalSeasons,
                        country: body.result[i].country,
                        started: body.result[i].started,
                        year: body.result[i].year,
                        rating: body.result[i].rating,
                        image: body.result[i].image,
                        channel: body.result[i].network.title,
                        genreIds: body.result[i].genreIds
                     }
                );
            }
            //res.send(await getShowsByGenre(req.query.genre, data));
            
            res.send(data);
        }
        else{
            res.send({ success: "false" });
        }
    });

});


// @route   GET /v1/api/top
// @desc    Get Top of Shows By Count
// @access  Public
app.get('/v1/api/top', async (req, res) => {
    const count = req.query.count;
    const options = {
        method: 'POST',
        url: API,
        headers : {
            'Content-Type' : 'application/json'
        },
        json: {
            "jsonrpc": "2.0",
            "method": "shows.Top",
            "params": {
              "mode": "all",
              "count": `${count}`
            },
            "id": 1
          }
        };

    await request(options, async (error, response, body) => {
        if(!error && response.statusCode == 200){
            res.send(body);
            getGenreId("Криминал");
        }
        else{
            res.send({ success: "false" });
        }
    });   


});




app.get('/v1/api/genres', async (req, res) => {
    const genre = req.query.genre;
    console.log(genre);
    const options = {
        method: 'POST',
        url: API,
        headers : {
            'Content-Type' : 'application/json'
        },
        json: {
            "jsonrpc": "2.0",
            "method": "shows.Top",
            "params": {
              "mode": "all",
              "count": 500
            },
            "id": 1
          }
        };

    await request(options, async (error, response, body) => {
        if(!error && response.statusCode == 200){
            var genreId = await getGenreId(genre);
            var data = [];
            //res.send(body);
            for(var i = 0; i < body.result.length; i++) {
                console.log("ids below");
                console.log(body.result[i]);
                for(var j = 0; j < body.result[i].genreIds.length; i++) {
                    if(genreId == body.result[i].genreIds[j]) {
                        data.push(
                            { 
                                id: body.result[i].id,
                                title: body.result[i].title,
                                titleOriginal: body.result[i].titleOriginal,
                                description: body.result[i].description,
                                totalSeasons: body.result[i].totalSeasons,
                                country: body.result[i].country,
                                started: body.result[i].started,
                                year: body.result[i].year,
                                rating: body.result[i].rating,
                                image: body.result[i].image,
                                channel: body.result[i].network.title,
                             }
                        );
                    }
                }
                
            }
            res.send(data);
        }
        else{
            res.send({ success: "false" });
        }
    });       
});

async function getGenreId(genre){
    const options = {
        method: 'POST',
        url: API,
        headers : {
            'Content-Type' : 'application/json'
        },
        json: {
            "jsonrpc": "2.0",
            "method": "shows.Genres",
            "params": {},
            "id": 1
        }
    };

    await request(options, async (error, response, body) => {  
        if(!error && response.statusCode == 200){
            var genreId;

            for(var i = 0; i < body.result.length; i++) {
                if(body.result[i].title == genre) {
                    var id = body.result[i].id;
                }
                genreId = id;
            }
            
            console.log("in returning")
            return genreId;
            //res.send(shows);
        }
        else{
            res.send({ success: "false" });
        }
    }); 
}

app.get('/v1/api/users', async (req, res) => {
    const users = await getUsers();
    console.log(users);
    res.send(await users.find().sort({createdAt: -1}).toArray());
});

app.post('/v1/api/users/register', async (req, res) => {
    const users = await getUsers();
    await createUser(users, req.body.login, req.body.email, req.body.password);
    res.json({success: true}); 
});

app.get('/v1/api/users/login', async (req, res) => {
    const users = await getUsers();
    const user = await findOneByLoginAndPassword(users, req.body.login, req.body.password);
    if(!user) {
        res.json({success: false});
    }
    res.json({success: true});
});


async function getUsers() {
    const client = await mongodb.MongoClient
    .connect('mongodb://root:root56288265@ds147420.mlab.com:47420/show-seeker',
     {useNewUrlParser: true});

     return client.db('show-seeker').collection('users');
}

async function createUser(users, login, email, password) {
    await users.insertOne({
        login: login,
        email: email,
        createdAt: new Date(),
        password: password
    });
}

async function findOneByLoginAndPassword(users, login, password) {
    return await users.findOne({login: login, password: password});
}

app.listen(port, () => { 
    console.log(`Server is up on ${port}`);
});

