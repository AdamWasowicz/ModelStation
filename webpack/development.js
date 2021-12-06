module.exports = {
	devServer: {
		static: './public',
		port: 3000,
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					'style-loader',
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
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				]
			},
		],
	},
};