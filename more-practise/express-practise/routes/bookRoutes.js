/**
 * Created by Administrator on 10/29/2016.
 */

var express = require('express');

var bookssRoutes = function(Book){
    var bookRouter = express.Router();
    bookRouter.route('/')
        .get(function(req, res){

            var query = {};

            if(req.query.genre){
                query.genre = req.query.genre;
            }
            Book.find(query,function(err, books){
                if(err){
                    res.status(500)
                        .send(err);
                }
                res.json(books);
            });
        })
        .post(function(req,res){

            var book = new Book(req.body);
            book.save();
            res.status(201).send(book);
        });

    bookRouter.use('/:bookId',function(req, res, next){
        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
            }
            else if(book){
                req.book = book;
                next();
            }
            else{
                res.status(404).send('No book found');
            }
        });
    });

    bookRouter.route('/:bookId')
        .get(function(req, res){

            res.json(req.book);

        })
        .put(function(req, res){

            req.book.author = req.body.author;
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.json(req.book);
                }
            });

        })
        .patch(function(req, res){
            if(req.body._id){
                delete req.body._id;
            }
            for(var key in req.body){
                req.book[key] = req.body[key];
            }
            req.book.save(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.json(req.book);
                }
            });
        })
        .delete(function(req, res){
            req.book.remove(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(204).send('Book removed');
                }
            })
        });
return bookRouter;
};

module.exports =bookssRoutes;