


HOW TO BEGIN
-------

1. __Create the package.json__
> npm init

2. __Create dependencies__
> npm install --save react react-dom redux react-redux
> npm install --save-dev typescript webpack webpack-cli ts-loader @types/react @types/react-dom html-webpack-plugin css-loader style-loader webpack-dev-server babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-env babel-preset-react

3. __Create tsconfig.json__

...

    {
        "compilerOptions": {
            //Base directory to allow us import relative to the current folder
            "baseUrl": "./",
            
            //Strict Type Checking
            "strict": true,

            //JSX is required to use JSX in React
            "jsx": "react",

            //Required for Webpack
            "sourceMap": true,
        },
        "include": [
            "./src/**/*"
        ],
        //Dont Compile these folders
        "exclude": [
            "node_modules"
        ]
    }
...

4. __Create webpack.config.js__

...

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
...

5. __Create .babelrc__

...

    {
        "presets": [
            "react",
            "env"
        ],
        "plugins": ["syntax-dynamic-import"]
    }
...

6. __Add the following to your package.json file__

...

  "scripts": {
    "start": "webpack-dev-server"
  },

...

7. __Start__
> npm start

REFERENCES
-------
1. https://webpack.js.org/configuration/
2. https://medium.com/@XValhallaCoderX/way-of-the-script-react-redux-typescript-part-1-introduction-68e6b74d7f33