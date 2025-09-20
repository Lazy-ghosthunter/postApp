const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



router.get('/', function(req, res){
    Post.findAll().then(function(posts){
        posts = posts.map(post => post.toJSON());
        res.render('home', {posts:posts});
    });
});

router.get('/cad', function(req,res){
    res.render('formulario');
});

router.get('/postar', function(req,res){
    res.render('formulario');
})

router.post('/add', async function(req,res){
   try {
    await Post.create({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo,
      usuario: req.session.user.id_user
    });
    res.redirect('/postagens');
  } catch (erro) {
    res.send('Houve um erro: ' + erro);
  }
});

router.get('/deletar/:id', async function(req,res){
    await Post.destroy({where: {
        id: req.params.id
    }}).then(()=> res.redirect('/postagens')).catch(erro => res.send('Essa postagem não existe'))
})

router.get('/alterar/:id', async function(req,res){
    await Post.findAll({where: {
        id: req.params.id
    }}).then(posts => {
        posts = posts.map(post => post.toJSON());
        res.render('alterar',{ posts:posts});
    });
});

router.post('/update', function (req,res){
    Post.update(
        {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        },
        {
            where:{id:req.body.id}
        }
    ).then(()=> res.redirect('/postagens')).catch(erro => res.send("Erro ao atualizar postagem: "+erro));
});

module.exports = router;

