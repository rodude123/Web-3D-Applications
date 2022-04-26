const path = require('path');

module.exports = {
    watch: true,
    entry: './lab_4/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'lab_4/js')
    },
};