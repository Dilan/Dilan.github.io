var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './app/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.p144.js'
    }
};
