var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== 'production';
var plugins = [
  new webpack.DefinePlugin({
    __DEV__: debug
  }),

  new webpack.BannerPlugin('d3 demo'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin()

  ,new webpack.HotModuleReplacementPlugin()

];

!debug && plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    test: /(\.js)$/,
    compress: {
      warnings: false
    }
  })
);

var browsers = '{browsers:["last 2 version", "ie >= 8"]}';

module.exports = {
  context: __dirname,
  entry: {
    index: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  plugins: plugins,
  devtool: '#source-map',
  module:{
    loaders:[

      { test: /\.png$/, loader: 'url?limit=65536&mimetype=image/png' }
      ,{ test: /\.jpg$/, loader: 'url?limit=65536&mimetype=image/jpeg' }
      ,{ test: /\.gif$/, loader: 'url?limit=65536&mimetype=image/gif' }

      ,{ test: /\.css$/, loader: 'style!css!autoprefixer?'+browsers }

      ,{ test: /\.less$/, loader: 'style!css!autoprefixer?'+browsers+'!less' }




      ,{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
      ,{ test: /\.json$/, loader: 'json', exclude: /node_modules/ }

    ]
  },
  resolve: {
    extensions: ['', '.js', '.less'],
    modulesDirectories: ["node_modules", "bower_components"]
  }

  ,devServer: {
    hot: true,
    quiet: false,
    colors: true,
    inline: true,
    compress: true,
    contentBase: './app',
    host: '127.0.0.1',
    port: 8000,
    setup: function(app) {
      // Here you can access the Express app object and add your own custom middleware to it.
      // For example, to define custom handlers for some paths:
      // app.get('/some/path', function(req, res) {
      //   res.json({ custom: 'response' });
      // });
    },
    // proxy: {
    //   '/some/path*': {
    //     target: 'https://other-server.example.com',
    //     secure: false
    //   }
    // }
  }

};
