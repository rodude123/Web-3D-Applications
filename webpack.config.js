const path = require('path');

module.exports = {
    entry: './lab_9/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/srv/http/lab_9/js')
    },
};