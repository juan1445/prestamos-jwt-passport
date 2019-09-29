const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Juan:Juan1445$@cluster0-j2ivx.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));