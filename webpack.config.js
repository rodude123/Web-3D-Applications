const path = require('path');

module.exports = {
    entry: './assignment/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './assignment/js')
    },
};