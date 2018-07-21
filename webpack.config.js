//webpack配置
const path=require('path');
let HtmlWebpackPlugin=require('html-webpack-plugin');
let CleanWebpackPlugin=require('clean-webpack-plugin');
let webpack=require('webpack');
let ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');
let CopyWebpackPlugin=require('copy-webpack-plugin');

//let indexExtract=new ExtractTextWebpackPlugin({
//	filename:'css/index.css',
//	disable:true
//});
//let aExtract=new ExtractTextWebpackPlugin({
//	filename:'css/a.css',
//	disable:true
//});

let indexExtract=new ExtractTextWebpackPlugin({
	filename:'css/index.css'
});
let aExtract=new ExtractTextWebpackPlugin({
	filename:'css/a.css'
});

let PurifyCssWebpack=require('purifycss-webpack');
let Glob=require('glob');
//let MiniCssTractPlugin=require('mini-css-extract-plugin');
module.exports={
    entry:'./src/index.js',
//	entry:['./src/index.js','./src/a.js'],//入口
//	entry:{
//		index:'./src/index.js',
//		a:'./src/a.js'
//	},//多入口
	output:{
//		filename:'build.[hash:8].js',
		filename:'[name].[hash:8].js',//多出口
		path:path.resolve(__dirname,'dist')
	},//出口
	devServer:{
		contentBase:'./dist',
		port:3000,
		compress:true,//服务器压缩
		open:true,//自动打开浏览器
		hot:true//热更新
	},//开发服务器
	module:{
		rules:[
			{
				test:/.css$/,
				use:indexExtract.extract({
//					fallback:'style-loader',
					use:[
						{loader:'css-loader'},
						{loader:'postcss-loader'}
					]
				})
			},
			{
				test:/.less$/,
				use:aExtract.extract({
//					fallback:'style-loader',
					use:[
						{loader:'css-loader'},
						{loader:'less-loader'}
					]
				})
			}
//			{
//				test:/.css$/,
//				use:[
//					MiniCssTractPlugin.loader,
//					{loader:'css-loader'}
//				]
//			},
//			{
//				test:/.less$/,
//				use:[
//					MiniCssTractPlugin.loader,
//					{loader:'css-loader'},
//					{loader:'less-loader'}
//				]
//			}
		]
	},//模块配置
	plugins:[
//		new ExtractTextWebpackPlugin({
//			filename:'css/index.css'
//		}),
		
		indexExtract,
		aExtract,
		new CopyWebpackPlugin([
			{
				from:'./src/doc',
				to:'public'
			}
		]),
//		new MiniCssTractPlugin({
//			filename:'css/index.css'
//		}),
		new webpack.HotModuleReplacementPlugin(),//热更新
		new HtmlWebpackPlugin({
			//打包HTML插件
//			filename:'a.html',
			template:'./src/index.html',
			title:'www',
			hash:true
//			minify:{
//				removeAttributeQuotes:true,//删除属性双引号
//				collapseWhitespace:true//删除空格
//				
//			}
//			chunks:['index']
		}),
		new PurifyCssWebpack({
			paths:Glob.sync(path.resolve('src/*.html'))
		}),
		new CleanWebpackPlugin(['./dist']),
//		new HtmlWebpackPlugin({
//			filename:'b.html',
//			template:'./src/index.html',
//			title:'www',
//			hash:true,
//			chunks:['a']
//		})
	],//插件的配置
	mode:'development',//可以更改模式
	resolve:{}//配置解析
}
