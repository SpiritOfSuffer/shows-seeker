const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/v1/api', async (req, res) => {
    let title = req.query.title;
    let options = {
        method: 'POST',
        url: 'https://api.myshows.me/v2/rpc/',
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

    request(options, async (error, response, body) => {
        if(!error && response.statusCode == 200){
            res.send(body);
            console.log(body);
            //var data = JSON.parse(body);
            //console.log(data);
            //res.render('results', {data: data});
        }
        else {
            res.send({ success: "false" });
        }
    });



});

app.listen(port, () => { 
    console.log(`Server is up on ${port}`);
});

