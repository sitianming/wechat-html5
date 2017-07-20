# wechat-html5
开发微信h5项目的模板，为开发h5项目提供便利的环境

## 大致分成3个版本
    v1.0 基础的目录版本，带webpack （当前状态）
    v2.0 基于npm包,模块化开发
    v3.0 框架化

## 主要实现功能

    1，一个基础的目录结构
    2，一个套基础的webpack配置
    3，便利的提供基本的js库（reset.css，适配js，微信分享js，jquery等，预加载js,fastclick）
    4，h5项目上线流程，注意事项的说明
    5，项目源代码用es5编写，但是支持使用es6语法

## 目录简介

    1, doc 开发h5相关的文档资料，欢迎补充
    2, src 项目所有源文件
    3, src/assets 其他各类文件，比如视频，音频，字体等
    4, src/css 所有样式表，本项目的样式，在main.css下添加
    5, src/images 图片
    6, src/js js文件
    7, src/lib htm5开发相关的辅助库文件，包括公司内部的，和第三方的
    8, src/index.html 主页
    9, public  提交到deploy分支时，服务器会执行webpack的打包，将打包完成的文件都放到public目录下

## 使用方法

    1, 本地开发，在项目根目录执行 `npm run dev`
    2, 发布到线上，和以前相同，push到deploy分支即可

### 剩余bug

    1,bundle.js放到<header>里面
    6,打包文件，比如字体文件，视频，音频
