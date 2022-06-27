const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadsPath : path.join(rootPath, 'public/uploads'),
    mongo : {
        db: 'mongodb://localhost/gallery',
        options: {useNewUrlParser: true},
    }
}