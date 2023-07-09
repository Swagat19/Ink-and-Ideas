const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// Home page
router.get('/' , (req,res) => {
    Blog.find().sort({createdAt : -1}) // newest to oldest
    .then((result)=> {
        res.render('index',{title: 'All Blogs' , blogs:result})
    })
    .catch((err) => {
      console.log(err);
    })
  })
  
 // Post request from create blog page  
router.post('/' , (req,res)=> {
     const blog = new Blog(req.body);
     
     blog.save()
     .then((result)=>{
      res.redirect('/blogs');
     })
      .catch((err) => {
        console.log(err);
      })
  });

// Create Blog page 
router.get('/create',(req,res) => {
      res.render('create' , {title : 'Create a new blog'});
  });


// Go to the particular Blog page on the basis of blog id accessed from home page 
router.get('/:id',(req,res) => {
     const id = req.params.id;
     Blog.findById(id)
     .then(result => {
      res.render('details' , {blog:result , title : result.title});
     })
     .catch(err=>{
         res.status(404).render('404',{title : 'Blog not found'});
     });
  });
  

// Process the delete request 
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
    .then((result)=>{
      res.json({redirect : '/blogs'});
    })
    .catch(err=>console.log(err));
  
  });
  
  
  module.exports = router;