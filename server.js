const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.listen(8080, function(){
   console.log('listining on 8080');
});

app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/postdata.html', (req, res)=>{
    res.sendFile(__dirname + '/postdata.html');
});

app.post('/quotes', (res, req)=> {
    console.log('I have got my first data.')
});