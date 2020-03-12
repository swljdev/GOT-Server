const express = require('express');
const router = express.Router();
const House = require('../db').import('../models/house')



router.get("/", (req, res) => {
    //console.log(req.body)
    House.findAll()
    .then(house => res.status(200).json(house))
    .catch(err => res.status(500).json ({
        error: err
    }))
})


router.post('/', (req, res) => {
    const houseFromRequest = {
        name: req.body.name,
        motto: req.body.motto,
        crest: req.body.crest,
       
       
    }
    console.log(req);
   
   House.create(houseFromRequest)
    .then(house => res.status(200).json(house))
    .catch(err => res.json ({
        error: err
    }))

});

//findOne()
router.get('/:name', (req, res) => {
    House.findOne({
        where: {
            nameOfHouse: req.params.name
        }
   
    })
    .then(house => res.status(200).json(house))
    .catch(err => res.status(500).json({
        error:err
    }))

})
router.put('/update/:id', (req, res) => {
    console.log(req.body);
    let data = req.params.id;
    let userID = req.user.id;

    House.update(req.body, {
        where: {
            id: data,
        }
    })
    // .then(res.send(req.body))
    .then(house => res.status(200).json(house))
    .catch(err => res.json(req.errors))
}), console.log("Success");

router.delete('/:id', (req, res) => {
    House.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(house => res.status(200).json(house))
    .catch(err => res.json(req.errors))
    erro: err
})


module.exports = router;