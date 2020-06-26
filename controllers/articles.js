var express = require('express')
var db = require('../models')
var router = express.Router()

// POST /articles - create a new post
router.post('/', function(req, res) {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    res.redirect('/')
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})

// POST /articles/:id/comments - adds a comment to the article id in the params
router.post('/:id/comments', (req, res) => {
  let id = req.params.id;
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    content: req.body.content,
    articleId: req.params.id
  })
  .then(comment => {
    res.redirect(`/articles/${req.params.id}`);
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('articles/new', { authors: authors })
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then(function(article) {
    if (!article) throw Error()
    console.log(article.author);
    res.render('articles/show', { article: article })
  })
  .catch(function(error) {
    console.log(error)
    res.status(500).render('main/404')
  })
})

module.exports = router
