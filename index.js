require('dotenv').config();

const express = require('express');
const mongodb = require('mongodb')
const logger =  require('morgan');
const bodyParser =  require('body-parser');
const errorhandler =  require('errorhandler');
const cors = require('cors');

const url = 'mongodb+srv://Fredoom03:fredipondio@cluster0.bbpdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let app  =  express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger('dev'));


mongodb.MongoClient.connect(url, (error, database) => {
    if(error) return process.exit(1);
    const db = database.db('702nosql');

    app.get('/FillWater',(req,res)=>{
        db.collection('FillWater').find().toArray((error,results)=>{
            if(error) return next(error);
            console.log(results);
            res.send(results);
        });
    });

    app.post('/FillWater',(req, res)=>{
        let newAccount =  req.body;
        db.collection('FillWater').insert(newAccount,(error,results)=>{
            if(error)  return next(error);
            res.send(results);
        });
    });

    app.put('/FillWater/:id',(req,res)=>{
        db.collection('FillWater').update(
            {_id: mongodb.ObjectID(req.params.id)},
            {$set:req.body},
            (error,results)=>{
                if(error) console.log(error);
                res.send(results);
            });
    });

    app.delete('/FillWater/:id',(req,res)=>{
        db.collection('FillWater').remove({_id: mongodb.ObjectID(req.params.id)},(error,results)=>{
            if(error) console.log(error);
            res.send(results);
        });
    });

        app.listen(port, () => {
        console.log(`Server on port ${app.get('port')}`);
    });
});