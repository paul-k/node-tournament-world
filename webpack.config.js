var path = require("path");
var fs = require('fs');

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
		root: path.resolve(__dirname),
		extensions: ["", ".js", ".jsx", ".json", ".scss"]
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
	//devtool: 'source-map',
	target: 'node',
	externals: nodeModules
};