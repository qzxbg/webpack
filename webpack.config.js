//因为webpack是运行在node环境下的，所以该文件也就是运行在node环境下
//那么node模块语法都可以进行调用
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//这个导出去的对象就是webpack打包所需要用到的配置对象
module.exports = {
    /**
     * 开发模式 mode
     * 1."production"生产环境
     * 2."development"开发环境
     * 3.none
     */
    mode:"development",

    /**
     * 源文件内容映射，方便调试
     * devtool
     */

    devtool:"source-map",

    /**
     * 文件打包入口 entry valueType:String/Object/Array
     * 入口方式
     * 1.单一入口单一出口
     * 2.多个入口单个出口
     * 3.多个入口多个出口
     */
    // 入口方式一 
    entry:"./src/index.js",

    // 入口方式二 
    // entry:[
    //     "./src/index.js",
    //     "./src/list.js"
    // ],

    // 入口方式三 
    // entry:{
    //     index:"./src/index.js",
    //     list:"./src/list.js"
    // },

    /**
     * 文件打包出口 output
     * 1.path 输出文件的路径 必须是绝对路径
     * 
     */

    output:{
        path:path.resolve(__dirname,"dist"),
        //入口方式一对应的输出方式
        filename:"index.js"
        //入口方式三对应的输出方式
        // filename:"[name].js"
    },

    /**
     * 功能扩展 plugins
     */
    plugins:[
        //每一项对象就是一个插件
        new htmlWebpackPlugin({
           template:'./src/static/index.html',
           titlename:"开课吧"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    /**
     * 文件加载器 module
     */

    module:{
        //各种loader加载处理规则
        rules:[
            //每一种规则就是一个对象
            //单个lodader
            {
                //将加载的文件原生输出
                //被加载的模块规则匹配
                test:/\.txt$/i,
                //使用模块加载处理规则
                use:"raw-loader"
            },
            // {
            //     //被加载的文件转化为url格式
            //     test:/\.jpg$/i,
            //     use:"url-loader"
            // }
            //无需loader配置参数
            // {
            //     test:/\.jpg$/i,
            //     use:"file-loader"
            // }
            //需要设置loader的配置参数
            {
                test:/\.jpg$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:"[name].[ext]",
                            //真实存放的物理路径
                            outputPath:"./img",
                            //打包文件后的url
                            publicPath:"./img",
                            limit:10000
                        }
                    }
                ]
            },
            {
                test:/\.css$/i,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                    },{
                        loader:"css-loader",
                        options:{
                            url:true
                        }
                    }
                ]
            }
        ]
    },

    /**
     * webpack-dev-server配置项
     */

     devServer:{
         //另外加入的虚拟目录
        contentBase:path.join(__dirname,"dist"),
        //服务端口
        port:8000,
        //自动开启浏览器,
        open:true,
        //开启热更新
        hot:true,

        //代理
        proxy:{
            "/pusher":{
                target:"https://camorope-client-a.meiqia.com"
                // pathRewrite:{
                //     "^/api":""
                // }
            }
            //重写规则
            
        }
     }

    
    
}