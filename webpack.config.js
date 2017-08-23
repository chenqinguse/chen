var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
function getHtmlConfig(name){
  return {
      title:name,
      filename:'view/'+name+'.html',
      template:'./src/view/'+name+'.html',
      inject:true,
      favicon:'',
      hash:true,
      chunks:['common',name]
    };
};
module.exports = {
	entry:{
		'index':['./src/page/index/index.js'],
		'login':['./src/page/login/index.js'],
    'common':['./src/page/common/index.js']
	},
	output:{
		path: __dirname+'/dist',//编译打包的文件保存路径
    publicPath:'/dist/', //文件访问路径
		filename:'js/[name].js'
	},
	plugins: [
  //解析html模板
    new HtmlWebpackPlugin(getHtmlConfig('index')), 
    new HtmlWebpackPlugin(getHtmlConfig('login')), 
    //解析css成为单独的文件
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({name:'common'}), 
    
  ],
  //改别名
   resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=100&name=resource/[name].[ext]'
      }
    ]
  }

};