const express = require('express');
const bodyparser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.json());

MongoClient.connect('mongodb+srv://mrx-user:Aa123456789@cluster0.mnixu.mongodb.net/mrx-db?retryWrites=true&w=majority', {useUnifiedTopology : true})
    .then(client => {
        const db = client.db('mrx-db')
        const quotecollection = db.collection('quotes')
        app.use(bodyparser.urlencoded({ extended: true }))

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
            .then(results => { res.render('index.ejs', {quotes : results})})
            .catch()
        })

        app.post('/quotes', (req, res) => {
            quotecollection.insertOne(req.body)
            .then(result => {
                console.log(result)})
            .catch(error => console.error(error))
            .then(res.end())
        })

        app.put('/quotes', (req, res) => {
           quotecollection.findOneAndUpdate(
               {name : 'rezan'},
               {
                   $set : {
                       name : req.body.name,
                       quote : req.body.quote
                   }
               },
               {
                   upsert : true
               }
           )
           .then(result => console.log(result))
           .catch(error => console.error(error))
        });
        app.listen(8080, function () {
            console.log('listining on 8080');
        });
    })
    .catch(console.error);