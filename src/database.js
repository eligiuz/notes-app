const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notesdb-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB conectada'))
    .catch(err => console.error(err));