'use strict';
const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 3004;
const cors = require('cors');
require('dotenv').config(); 


app.set('view engine', 'ejs');
app.use(express. urlencoded({extended:true }));
app.use(cors());
app.use(express.static('./public/styles'));
app.get('/', welcomePage);

app.get('/hello',firstPage);

app.use('*', notFound);

function firstPage(request, response){
    // const objRes={
    //     Title : 'Hello word'
    // };
    response.render('pages/index')

}

function welcomePage(request, response) {
    response.status(200).send('Home Page Welcome to express');
};
function notFound(request, response) {
    response.status(404).send('Error');
};


app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
 