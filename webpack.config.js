var path = require("path");
var fs = require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	context : path.resolve("src"),
	entry : {
		server: "server.js"
	},
	resolve: {
		root: path.resolve(__dirname + "/src"),
		extensions: ["", ".js", ".jsx", ".json"]
	},
	output : {
		path: path.resolve(__dirname + "/build"),
		publicPath : "/build",
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.js$|\.jsx$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				"presets": ["es2015", "react"]
			}
		},{
			test: /\.json$/, 
			loader: 'json-loader' 
		}]
	},
	plugins: [
		new CopyWebpackPlugin(
			[{ 
				from: '/src/public/**/*',
				to: '/build/public'
			}, {
				from: '/src/gulpfile.js',
				to: '/build/gulpfile.js'
			}], {
			copyUnmodified: true
		})
	],
	//devtool: 'source-map',
	target: 'node',
	externals: nodeModules
};