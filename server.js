'use strict';
const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 3004;
const cors = require('cors');
require('dotenv').config(); 
const superagent = require('superagent');

app.set('view engine', 'ejs');
app.use(express. urlencoded({extended:true }));
app.use(cors());
app.use(express.static('public/styles'));
app
app.get('/', welcomePage);

app.get('/hello',firstPage);
app.get('/searches/new',secondPage);
app.get('/searches',searchBook);
app.use('*', notFound);

const Book-Key=process.env.Book-Key;
function firstPage(request, response){
    // const objRes={
    //     Title : 'Hello word'
    // };
    response.render('pages/index')

}
function secondPage (request, response){
    response.render('pages/searches/new');
}

function welcomePage(request, response) {
    response.status(200).send('Home Page Welcome to express');
};
function searchBook(request, response){
   superagent.get(url).then(data =>{
       let result = data.body.items.map(element=>{
           return new Book(element);
       });
       response.render('pages/searches/new',)
   })
}

function notFound(request, response) {
    response.status(404).send('Error');
};

function Book(bookData){
    this.title=bookData.title;
    this.author=bookData.author;
    this.imgUrl=bookData.imgUrl || 'https://i.imgur.com/J5LVHEL.jpg' ;


}










app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
 