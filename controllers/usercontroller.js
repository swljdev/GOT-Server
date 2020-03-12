require('dotenv').config();
const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


router.post('/createuser', function (req, res) {

    const username = req.body.user.username;
    const pass = req.body.user.password

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    
    }).then(
        function createSuccess(user) {
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function(req, res){
    User.findOne( {where: {username: req.body.user.username}}).then (
            
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if (matches) {
                        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: 'successfully authenticated',
                            sessionToken: token
                        });
                    } else {
                        res.status(502),send({error: "you failed, yo"});
                    }
                });
            } else {
                res.status(500).send({error: "failed to authenticate"});
            }
        }, 
        function (err) {
            res.status(501).send({error: "you failed, yo"});
        }
        );
});



module.exports = router;
