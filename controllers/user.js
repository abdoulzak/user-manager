// @ts-nocheck
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

//process.env['NODE_TLS_REJECT_UNAUTHORIZED']=0;

exports.verif = (req, res, next) => {
  var numero = req.body.numero+"";
  console.log(req);
  if(numero == "" || numero < 11 ){
    res.status(406).json({message: 'Choisir un numero de téléphone valide !'});
  }else
  User.findOne({
    numero: numero
  }).then(
    (response) => {
      if (response){
        res.status(200).json({ data: true, message: response });
      }else{
        res.status(406).json({ message: "non autorisé !" });
      }
    }
  ).catch(
    (error) => {
      res.status(500).json({
        message: "une erreur vient de se produire!"
      });
    }
  );
}

const getcode = ()=>{
  var _sym = '1234567890';
  var str = '';
  // @ts-ignore
  for(var i = 0; i < 6; i++) { str += _sym[parseInt(Math.random() * (_sym.length))]; }
  return str;
}

exports.signup = (req, res, next) => {
  var numero = req.body.numero+"";
  var password = req.body.password+"";
  if(numero == "" || numero.length < 11 || 11 < numero.length ){
    res.status(406).json({message: 'Choisir un numero de téléphone valide !'});
  }else
  if(password == "" || password == null || password.length < 6){
    res.status(406).json({message: 'Choisir un mot de passe valid !'});
  }else
  User.findOne({
    numero: numero
  }).then(
    (result) => {
      if (result){
        res.status(406).json({message: 'Le numero est déja utilisé !'});
      }else {
        bcrypt.hash(password, 10)
          .then(hash => {
            const user = new User({
              firstId: getcode(),
              lastName: req.body.lastName,
              firstName: req.body.firstName,
              ref: "dustring",
              password: hash,
              numero: numero,
              status: "string value",
              frozen: false,
              creatDate: new Date(),
              updateDate: new Date()
            });
            user.save()
              .then((response) => {
                //envoie de mail ou de sms
                res.status(201).json({ message: "Utilisateur inscrit " });
              })
              .catch(error => {
                res.status(500).json({ message: "une erreur vient de se produire contacter l'administrateur ou reéssayer" });
              });

          })
          .catch(error => {
            res.status(500).json({ error });
          } 
        );
      }    
    }
  ).catch(
    (data) => {
      res.status(500).json( {error: data}) 
    }
  );
};

exports.user = (req, res, next) => {
  
  User.find().then(
    (result) => {
      res.status(200).json({message: result});  
    }
  ).catch(
    (data) => {
      res.status(500).json( {error: data}) 
    }
  );
};


exports.login = (req, res, next) => {
  console.log(req.body);
  const numero = req.body.numero+"";
  const password = req.body.password+"";
  if(numero == "" || numero.length < 11 || 11 < numero.length ){
    res.status(406).json({message: 'Choisir un numero de téléphone valide !'});
  }else
  if(password == "" || password == null || password.length < 6){
    res.status(406).json({message: 'Choisir un mot de passe valid !'});
  }else
  User.findOne({ numero: numero })
    .then((user) => {
      if (!user) {
        res.status(405).json("L'utilisateur n'existe pas !");
      }else{
        bcrypt.compare(password, user.password)
          .then(valid => {
            if (valid == false) {
              res.status(405).json({message: "Mot de passe incorrecte !"}); 
            }else{
              res.status(200).json({
                userId: user._id,
                userPhone: user.numero,
                token: jwt.sign(
                  { userId: user._id },
                  'Saving_Money_Secret_Token',
                  { expiresIn: '1d' }
                ),expiresIn: '1' 
              });
            }
          })
          .catch(error => res.status(500).json({message: "Une erreur vient de se produire !"}));
      }
      
    })
    .catch(error => res.status(500).json({message: "Une erreur vient de se produire!"}));
}

exports.deleteUser = (req, res, next) => {/*
  Pronostique.findOne({ _id: req.body.id })
    .then(pronostique => {
        Pronostique.deleteOne({ _id: req.body.id })
          .then(() => res.status(200).json({ message: 'Supprimé !'}))
          .catch(error => res.status(401).json({
            error: new Error('Invalid request!')
          }));
    })
    .catch(error => res.status(401).json({
      error: new Error('Invalid request!')
    }));*/
};