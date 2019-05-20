var path = require('path');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
    	app: ["./src/main.js", './dev-client']
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 图片和 JS 会打包到这里来
        filename: "[name].js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },

            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // 用 ! 来连接多个 loader

            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            } // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL

        ]
    },
    resolve: {
        extensions: ['.js', '.json', 'coffee']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
	    }),
    ]

}