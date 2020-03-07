const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
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
        const newNote = new Note({title, description});
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    //const notes = await Note.find();
    await Note.find().sort({date: 'desc'})
        .then(documentos => {
            const contexto = {
                notes: documentos.map(documento => {
                    return{
                        id: documento._id,
                        title: documento.title,
                        description: documento.description
                    }
                })
            };
            res.render('notes/all-notes', {notes:contexto.notes});
        })
});

router.get('/notes/edit/:id', async (req, res) => {
    //const note = await Note.findById(req.params.id);
    await Note.findById(req.params.id)
        .then(documentos1 => {
            const contexto1 = {
                note: documentos1.map(documento1 => {
                    return{
                        id: documento1._id,
                        title:documento1.title,
                        description: documento1.description
                    }
                })
            };
            res.render('notes/edit-note', {note:contexto1.note});
        })
});

module.exports = router;