const path = require('path');

module.exports = {
    watch: true,
    entry: './lab_8/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/srv/http/lab_8/js')
    },
};