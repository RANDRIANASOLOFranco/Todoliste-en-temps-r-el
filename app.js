var express = require('express');
var http = require('http');
var io = require('socket.io');
var session = require('cookie-session'); // Charge le middlewares de sessions
var bodyParser = require('body-Parser'); // Charge le middlewares de gestion des paramètres
var ent = require('ent');
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Declaration de la port et le hostname qu'on va utiliser
const port = 8080;
var hostname = 'localhost';

var app = express();
  // On utilise les sessions
  app.use(session({secret: 'todotopsecret'}));
  /* S'il n'y a pas de todolist dans la session,
  on en crée une vide sous forme d'array avant la suite */
  .use(function(req, res, next){
    if(typeof(req.session.todolist) == 'undefined'){
      req.session.todolist = [];
    }
    next();
  });
  // On affiche la todolist et le formulaire
  .get('/todo' function(req, res){
    res.render('todo.ejs', {todolist : req.session.todolist});
  });
  // On ajoute un élément à la todolist
  .post('/todo/ajouter/', urlencodedParser, function(req, res){
    if(req.body.newtodo != ''){
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
  });
  // Supprime un élément de la todolist
  .get('/todo/suprimer/:id', function(req, res){
    if(req.params.id = ''){
      req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
  });
  // On redirige vers la todolist si la page demandée n'est pas trouvée
  .use(function(req, res, next){
    res.redirect('/todo');
  });

app.listen(port, hostname, function(){
  console.log('Server running at http://' + hostname + ':' + port);
});
