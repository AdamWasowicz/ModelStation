const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	optimization: {
		minimizer: [
			new OptimizeCssAssetsWebpackPlugin({}),
		],
	},
	module: {
		rules: [
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules : {
								localIdentName: '[local]',
							}
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				]
			},

			
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'file-loader',
				options: {
				  limit: 25000,
				},
			},
			
			{
				test: /\.(s(a|c)ss|css)$/,
				exclude: /\.module.(s(a|c)ss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash:6].css',
			chunkFilename: 'style.[contenthash:6].css',
		}),
	],
};