const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: resolve('./src/index.html'),
    filename: './index.html'
})
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    entry: resolve('./src/index.js'),
    output: {
        path: resolve('./dist'),
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"]
        }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            '@': resolve('src'),
            'components': resolve('src/components'),
            'test':resolve('src/componentsTest')
        }
    },
    devServer: {
        port: 3001
    }

}