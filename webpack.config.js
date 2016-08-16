var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModules = {
	'react-dom/server': 'commonjs react-dom/server'
};
fs.readdirSync('node_modules')
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => { nodeModules[mod] = 'commonjs ' + mod; });

var defaultConfig = {
	context: path.join(__dirname, 'src'),
	entry: {
	},
	resolve: {
		root: path.join(__dirname, 'src'),
		extensions: ['', '.js', '.jsx', '.scss']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath : '/dist',
		filename: '[name].js'
	},
	module: {
		preLoaders: [{
			test: /\.js$|\.jsx$/,
			exclude: /node_modules/,
			loader: "eslint-loader" 
		}],
		loaders: [{
			test: /\.js$|\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				'presets': ['es2015', 'react']
			}
		}]
	}
};

var server = Object.assign({}, defaultConfig);
server.entry = {
	'server': 'server.js',
};
server.module.preLoaders.push({
	test: /\.scss$/,
	loader: 'ignore-loader'
});
server.plugins = [
	new ExtractTextPlugin('public/style.css', {
		disable: true
	})
];
server.target = 'node';
server.externals = nodeModules;


var public = Object.assign({}, defaultConfig);
public.entry = {
	'public/app': 'app/app.js'
};
public.module.preLoaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'sass-loader'])
});
public.plugins = [
	new ExtractTextPlugin('public/style.css', {
		allChunks: true
	})
];
//public.devtool = 'source-map';

module.exports = [server, public];
