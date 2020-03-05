const express = require('express');
const router = express.Router();

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', (req, res) => {
    const { title, description} = req.body;
    const errors = [];
    if (!title){
        errors.push({text: 'Por favor escriba un Título'});
    }
    if(!description){
        errors.push({text: 'Por favor escriba una descripción'});
    }
    if (errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        res.send('ok');
    }
});

router.get('/notes', (req, res) => {
    res.send('Notas de la base de datos');
});

module.exports = router;