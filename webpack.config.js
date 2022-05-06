const path = require('path');

module.exports = {
    watch: true,
    entry: './lab_7/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/srv/http/lab_7/js')
    },
};