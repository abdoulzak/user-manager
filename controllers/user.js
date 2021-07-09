const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

//process.env['NODE_TLS_REJECT_UNAUTHORIZED']=0;

exports.verif = (req, res, next) => {
  Marchand.findOne({
    cleParrain: req.params.ref
  }).then(
    (response) => {
      res.status(200).json({ message: response });
    }
  ).catch(
    (error) => {
      res.status(500).json({
        message: false
      });
    }
  );
}

const getcode = ()=>{
  var _sym = '1234567890';
  var str = '';
  for(var i = 0; i < 6; i++) { str += _sym[parseInt(Math.random() * (_sym.length))]; }
  return str;
}

exports.signup = (req, res, next) => {
  User.findOne({
    numero: req.body.numero
  }).then(
    (result) => {
      if (result){
        res.status(406).json({status: 406, data:"", message: 'Le numero est déja utilisé'});
      }
      
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          firstId: getcode(),
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          ref: "dustring",
          password: hash,
          numero: req.body.numero+"",
          status: "string value",
          frozen: false,
          creatDate: new Date(),
          updateDate: new Date()
        });

        user.save()
          .then((response) => {
            res.status(201).json({status: 201, data: "",  message: "Utilisateur inscrit" });
          })
          .catch(error => {
            res.status(400).json({status: 500, data: error+'',  message: "une erreur vient de se produire contacter l'administrateur et reéssayer" });
          });

      })
      .catch(error => {
        //console.log(error);
        res.status(500).json({ error });
      } );
      
    }
  ).catch(
    (error) => {
      res.status(500).json({message: false}) 
    }
  );
};


exports.login = (req, res, next) => {
  User.findOne({ numero: req.body.numero })
    .then(user => {
      if (!user) {
        res.status(204).json({message: "L'utilisateur n'existe pas !"});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            res.status(204).json({message: "Mot de passe incorrecte !"}); 
          }
          res.status(200).json({
            userId: user.firstId,
            userPhone: user.numero,
            token: jwt.sign(
              { userId: user._id },
              'Saving_Money_Secret_Token',
              { expiresIn: '1h' }
            ),expiresIn: '1' 
          });
        })
        .catch(error => res.status(500).json({message: "Une erreur vient de se produire"}));
    })
    .catch(error => res.status(500).json({message: "Une erreur vient de se produire"}));        
}
exports.deleteUser = (req, res, next) => {
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
    }));
};