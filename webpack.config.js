const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Redux Typescript Example',
            template: path.join(__dirname, 'src/index.html'),
        }),
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                exclude: path.join(__dirname, './node_modules'),
                use: [ 
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            }
                        },
                        {
                            loader: "ts-loader"
                        } 
                ] 
            },
            {
                test: /\.css$/,
                exclude: path.join(__dirname, './node_modules'),
                use: [ {loader: 'style-loader'}, {loader: 'css-loader'} ],
            },
        ]
    },
    devtool: "eval-source-map",
    devServer: {
        host: process.env.HOST,
        port: process.env.PORT,
    }
};