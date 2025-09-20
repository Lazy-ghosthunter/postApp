const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const rota_post = require('./controllers/PostController.js');
const rota_user = require('./controllers/UserController.js')
const session = require('express-session');

app.use(session({
  secret: 'sessao', 
  resave: false,               
  saveUninitialized: false     
}));

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  if(req.session.user){
    res.render('home');
  } else {res.redirect('/usuario/entrar');}
});





//rota
app.use('/postagens', rota_post);
app.use('/usuario', rota_user);


app.listen(8081, function() {
    console.log("Servidor rodando na porta 8081");
});
