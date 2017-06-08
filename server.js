var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack.development');

const port = process.env.PORT || 3000;
const baseUrl = 'http://0.0.0.0:3000';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: {
        rewrites: [
           { from: /./, to: '/app/index.html' }
        ]
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}).listen(port, '0.0.0.0', function(err, result) {
    if(err) {
        console.error(err);
    }

    console.log('Listening at localhost:' + port);
});