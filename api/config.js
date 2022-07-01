const path = require('path');

const rootPath = __dirname;

let dbUrl = 'mongodb://localhost/api';
let port = 8000;

if (process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://localhost/now-i-am-test';
    port = 8010;
}

module.exports = {
    corsWhiteList: [
        'http://localhost:4200',
        'http://localhost:4210',
    ],
    port,
    rootPath,
    uploadsPath : path.join(rootPath, 'public/uploads'),
    mongo : {
        db: 'mongodb://localhost/gallery',
        options: {useNewUrlParser: true},
    }
}