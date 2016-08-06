var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => { nodeModules[mod] = 'commonjs ' + mod; });

var defaultConfig = {
	context: path.join(__dirname, 'src'),
	entry: {
	},
	resolve: {
		root: path.join(__dirname, 'src'),
		extensions: ['', '.js', '.jsx', '.json']
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
		},{
			test: /\.json$/, 
			loader: 'json-loader' 
		}]
	}
};

var server = Object.assign({}, defaultConfig);
server.entry = {
	'server': 'server.js',
};
server.target = 'node';
server.externals = nodeModules;


var public = Object.assign({}, defaultConfig);
public.entry = {
	'public/app': 'app/app.js'
};
//public.devtool = 'source-map';

module.exports = [server, public];
