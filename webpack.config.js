var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModules = {
	'react-dom/server': 'commonjs react-dom/server'
};
fs.readdirSync('node_modules')
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => { nodeModules[mod] = 'commonjs ' + mod; });

var defaultConfig = {
	context: path.resolve(__dirname, './src'),
	resolve: {
		modules: [
			path.resolve(__dirname, './src'),
			'node_modules'
		],
		extensions: ['.js', '.jsx', '.scss'],
		enforceExtension: false
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath : '/dist',
		filename: '[name].js'
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.scss$/,
			exclude: /node_modules/
		},{
			enforce: 'pre',
			test: /\.js$|\.jsx$/,
			exclude: /node_modules/,
			loader: "eslint-loader"
		},{
			test: /\.js$|\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: ['es2015', 'react']
			}
		}]
	}
};

var server = Object.assign({}, defaultConfig);
server.entry = {
	'server': './server.js'
};
server.module.rules[0].loader = 'ignore-loader';
server.plugins = [
	new ExtractTextPlugin({ filename: 'public/style.css', disable: true })
];
server.target = 'node';
server.externals = nodeModules;


var public = Object.assign({}, defaultConfig);
public.entry = {
	'public/app': './app/app.js',
	'vendor': [
		'react',
		'react-dom',
		'react-router',
		'react-redux',
		'redux',
		'reqwest',
		'classnames'
	]
};
public.module.rules[0].loader = ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader']});
public.plugins = [
	new ExtractTextPlugin({ filename: 'public/style.css', allChunks: true }),
	new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "public/vendor.js" })
];
//public.devtool = 'source-map';

module.exports = [server, public];
