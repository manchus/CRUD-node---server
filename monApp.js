const express = require('express') 
// express app
const app = express() 
const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);
//const connection = mongoose.connection;
//mongo DB
const  bodyParser = require('body-parser');
//bodyParser nous permet de lire les objects JSON
const Utilisateur = require('./models/modUtilisateur');
const Commentaire = require('./models/modCommentaire');
const Question = require('./models/modQuestion');
const Login = require('./models/modLogin');
//Nous importons le modèle de données 
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));

/**  Labo 6 install avant installer  Npm install cors */
const cors = require('cors');
app.use(cors());
// register view engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const uri = "mongodb://german:F1n4lPr0jet@cluster0-shard-00-00.8i2k7.mongodb.net:27017,cluster0-shard-00-01.8i2k7.mongodb.net:27017,cluster0-shard-00-02.8i2k7.mongodb.net:27017/projetFinal?ssl=true&replicaSet=atlas-edafgd-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(uri,({ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })).
  then(()=>console.log('Funciona BD')).
  catch(e=>console.log(e));


app.get('/lireLogin', (req,res) =>{
  Login.find()
    .exec()  //se mettre en attente de la réponse de la BD.
    .then(login => res.status(200).json(login));
});

app.get('/lireUtilisateur', (req,res) =>{
  Utilisateur.find()
    .exec()  //se mettre en attente de la réponse de la BD.
    .then(utilisateur => res.status(200).json(utilisateur));
});

app.get('/lireCommentaire', (req,res) =>{
  Commentaire.find()
    .exec()  //se mettre en attente de la réponse de la BD.
    .then(commentaire => res.status(200).json(commentaire));
});

app.get('/lireQuestion', (req,res) =>{
  Question.find()
    .exec()  //se mettre en attente de la réponse de la BD.
    .then(question => res.status(200).json(question));
});


//read only One
app.get('/lireUnUtilisateur/:id', (req, res) => {
  const id = req.params.id; 
  Utilisateur.findById(id).then(Utilisateur=> res.json(Utilisateur))
  .catch(err => res.status(400).json('Error:'+err));
  });
  /** */
  
  app.get('/lireUnCommentaire/:id', (req, res) => {
    const id = req.params.id; 
    Commentaire.findById(id).then(Commentaire=> res.json(Commentaire))
    .catch(err => res.status(400).json('Error:'+err));
    });
    /** */
    app.get('/lireUneQuestion/:id', (req, res) => {
      const id = req.params.id; 
      Question.findById(id).then(Question=> res.json(Question))
      .catch(err => res.status(400).json('Error:'+err));
      });
      /** */
  
  /** */
  app.get('/lireCommentByQuestion/:id', (req, res) => {
  const id = req.params.id; 

  Commentaire.find({ titleQuestion: id }).
    then(Commentaire=> res.json(Commentaire))
  .catch(err => res.status(400).json('Error:'+err));

    });

    /** */
  
  app.get('/lireUtilisateurByEmail/:id', (req, res) => {
    const id = req.params.id; 
    Utilisateur.find({ email: id }).
    then(Utilisateur=> res.json(Utilisateur))
    .catch(err => res.status(400).json('Error:'+err));
  
  });
    
        /** */
      
    
    app.post('/ecrireLogin',(req, res) =>{
      console.log('req.body', req.body);
     //nous créons premier l'objet JSON
      const util = new Login(req.body);
      util.save((err, util_save)=>{
        if(err){
          return res.status(500).json(err);
        }
        res.status(201).json(util_save);
      });
    });

  app.post('/ecrireUtilisateur',(req, res) =>{
    console.log('req.body', req.body);
   //nous créons premier l'objet JSON
    const util = new Utilisateur(req.body);
    util.save((err, util_save)=>{
      if(err){
        return res.status(500).json(err);
      }
      res.status(201).json(util_save);
    });
  });
  
  app.post('/ecrireCommentaire',(req, res) =>{
    console.log('req.body', req.body);
   //nous créons premier l'objet JSON
    const comm = new Commentaire(req.body);
    comm.save((err, comment)=>{
      if(err){
        return res.status(500).json(err);
      }
      res.status(201).json(comment);
    });
  });

  app.post('/ecrireQuestion',(req, res) =>{
    console.log('req.body', req.body);
   //nous créons premier l'objet JSON
    const quest = new Question(req.body);
    quest.save((err, quest)=>{
      if(err){
        return res.status(500).json(err);
      }
      res.status(201).json(quest);
    });
  });

  app.post('/updLogin/:id',(req, res)=>{
    const util = req.params.id;
    console.log(util);
    console.log(req.body);
    Login.findById(util).then(Utilisateur=>{
      Login.nomUser = req.body.nomUser;
      Login.idUser = req.body.idUser;
      Login.idQuestion = req.body.idQuestion;
      
      Login.save()
      .then(()=>res.json('Édition réussie !'))
      .catch(err => res.status(400).json('Error:'+err));
    })
    .catch(err => res.status(400).json('Error:'+err));
  });



  app.post('/updUtilisateur/:id',(req, res)=>{
    const util = req.params.id;
    console.log(util);
    console.log(req.body);
    Utilisateur.findById(util).then(Utilisateur=>{
      Utilisateur.nom = req.body.nom;
      Utilisateur.prenom = req.body.prenom;
      Utilisateur.nomUser = req.body.nomUser;
      Utilisateur.email = req.body.email;
      Utilisateur.genre = req.body.genre;
      Utilisateur.age = req.body.age;
      
      Utilisateur.save()
      .then(()=>res.json('Édition réussie !'))
      .catch(err => res.status(400).json('Error:'+err));
    })
    .catch(err => res.status(400).json('Error:'+err));
  });

  app.post('/updCommentaire/:id',(req, res)=>{
    const util = req.params.id;
    console.log(util);
    console.log(req.body);
    Commentaire.findById(util).then(Commentaire=>{
      Commentaire.description = req.body.description;
      Commentaire.titleQuestion = req.body.titleQuestion;
      Commentaire.date = req.body.date;
      Commentaire.nomUser = req.body.nomUser;
      Commentaire.notePositive = req.body.notePositive;
      Commentaire.noteNegative = req.body.noteNegative;
      
      Commentaire.save()
      .then(()=>res.json('Édition réussie !'))
      .catch(err => res.status(400).json('Error:'+err));
    })
    .catch(err => res.status(400).json('Error:'+err));
  });


  app.post('/updQuestion/:id',(req, res)=>{
    const util = req.params.id;
    console.log(util);
    console.log(req.body);
    Question.findById(util).then(Question=>{
      Question.title = req.body.title;
      Question.description = req.body.description;
      Question.calification = req.body.calification;
      Question.date = req.body.date;
      Question.nomUtilisateur = req.body.nomUtilisateur;
      
      Question.save()
      .then(()=>res.json('Édition réussie !'))
      .catch(err => res.status(400).json('Error:'+err));
    })
    .catch(err => res.status(400).json('Error:'+err));
  });
  
  app.delete('/supLogin/:id', (req, res) => {
    const id = req.params.id;
    Login.findByIdAndDelete(id, (err, Login) => {
    if(err){
      return res.status(500).json(err);
    }
    res.status(202).json({msg: ` le Login User avec L'id ${Login._id} supprimée`});
  });
});



app.delete('/supCommentaire/:id', (req, res) => {
    const id = req.params.id;
    Commentaire.findByIdAndDelete(id, (err, Commentaire) => {
    if(err){
      return res.status(500).json(err);
    }
    res.status(202).json({msg: ` le commentaire avec L'id ${Commentaire._id} supprimée`});
  });
});

app.delete('/supUtilisateur/:id', (req, res) => {
  const id = req.params.id;
Utilisateur.findByIdAndDelete(id, (err, util) => {
  if(err){
    return res.status(500).json(err);
  }
  res.status(202).json({msg: `Utilisateur avec L'id ${util._id} supprimée`});
});
});

app.delete('/delQuestion/:id', (req, res) => {
  const id = req.params.id;
Question.findByIdAndDelete(id, (err, quest) => {
  if(err){
    return res.status(500).json(err);
  }
  res.status(202).json({msg: `Commentaire avec L'id ${quest._id} supprimée`});
});
});



//UPDATE
app.put('/lireUpdUtil/:id', (req, res) => {
  const id = req.params.id; 
  const update = req.body;
  console.log('id:',id);
  Utilisateur.findByIdAndUpdate(id, update,  (err, Utilisateur) => {
    if(err){
      return res.status(500).send({message:`La mise à jour du produit a échoué: ${err} `});
    }
    res.status(200).send({Utilisateur: Utilisateur });
  });
  });
  

/**** */

  app.listen(3437, ()=> { 
    console.log("j'écoute le port 3437!");
  });
  