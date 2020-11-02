'use strict';
require('dotenv').config(); 
const express = require('express');
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3004;
const cors = require('cors');




app.set('view engine', 'ejs');
app.use(express. urlencoded({extended:true })); // to get values from form by requse them.
app.use(cors());
app.use(express.static('public/styles'));

app.get('/', welcomePage);

app.get('/hello',firstPage);
app.get('/searches/new',secondPage);
app.post('/searches',searchBook);
// app.use('*', notFound);

const Book_Key =process.env.Book_Key;
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
    let title = request.body.title;
    let type = request.body.search;

    let urlbooks= '';
    if (type === 'title')
    // booktype = 'intitle';
    url = `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}+intitle`;

    else 
    // booktype = 'inauthour';
    url = `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}+inauthor`;


    // const url = `https://www.googleapis.com/books/v1/volumes?q=${booktype}+${title}`;
   
    // const parametrs={
    //     key: Book_Key,
    //     q: `${booktype}+${title}`
    //     maxResults: 10
       
    // }
    // let books=[];
   superagent.get(url).then(data =>{
      let result= data.body.items.map(element=>{
         return new Book(element);
       });
       response.render('pages/searches/new',{booksResult:result})
   })
//    .catch(()=>response.render('pages/error',{error:'No Results'})
//    )
}

// function notFound(request, response) {
//     response.status(404).send('Error');
// };

function Book(bookData){
    this.title=bookData.volumeInfo.title || 'Book Title';
    this.author=bookData.volumeInfo.author || 'Authour Name';
    this.description = bookData.volumeInfo.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    this.imageLinks=bookData.volumeInfo.imageLinks || 'https://i.imgur.com/J5LVHEL.jpg';
}

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
app.use('*', (request, resp) => {
    resp.status(404).send('Not found!!');
  }) 