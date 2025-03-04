const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Account = require('../models/Account');

exports.home = (req, res) => {
    res.status(200).json({message: "je suis trop fort use"});
}


exports.signup = async (req, res, next) => {
    // verifie if email already exist ?
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((user) => {
        if(!user){
            res.status(400).json({error: "cette email est deja enregistrer veiller vous connecter Merci!"});
        }
    }).catch(error => res.status(400).json({error}));
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            
            Account.findOne({
                where: {
                    email: req.body.email
                }
            }).then((account) => {
                if(!account){
                    account = Account.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone: req.body.phone,
                        email: req.body.email,
                        cni: req.body.cni,
                        deliver_on: req.body.deliver_on,
                    }).then((account) => {
                        account.createUser({
                            email: req.body.email,
                            password: hash,
                        }).then((user) => { res.status(201).json({message: 'utilisateur cree', user})})
                            .catch(error => {
                                res.status(400).json({ error });
                            });
                    })
                    .catch(error => res.status(400).json({ error }));
                } else {
                    account.createUser({
                        email: req.body.email,
                        password: hash,
                    }).then((user) => { res.status(201).json({message: 'utilisateur cree', user})})
                        .catch(error => {
                            console.error(error);
                            res.status(400).json({ error });
                        });
                }               

            }).catch(error => {
                res.status(404).json({ error });
            });
            
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error })
    });
        
};

exports.login = async (req, res, next) => {
    await User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
            if (!user){
                res.status(401).json({message: 'Paire identification/mot de passe incorrecte111'});
            } else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid){
                            res.status(401).json({ message: 'Paire identification/mot de passe incorrecte' });
                        } else {
                            res.status(200).json({ 
                                user_id: user.id,
                                token: jwt.sign(
                                    { userId: user.id},
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                ),

                            });
                        }                        
                    })
                    .catch(error => res.status(500).json({ error }));

            }
        })
        .catch(error => res.status(500).json({ error }));
};