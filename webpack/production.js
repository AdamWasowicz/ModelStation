const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin');

module.exports = {
    optimization:
    {
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

                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            midules: {
                                localIdentName: '[local]',
                            }
                        },
                    },
    
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            },

            {
                test: /\.(s(a|c)ss|css)$/,
                exclude:  /\.module(s(a|c)ss)$/,
                loader: [
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
            chunkFilenameL: 'style.[contenthash:6].css',
            publicPath: './'
        })
    ],
}