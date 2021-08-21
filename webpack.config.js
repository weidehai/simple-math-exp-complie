const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
    entry:'./index.js',
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        port:'9999'
    }
}