<h1 align='center'>TensorflowJS 深度学习识别图片</h1>
<p align='center'>
<img src="https://img.shields.io/badge/License-MIT-green"/><br/>
</p>
<ul>
	<li>使用Tensorflow JS【tensorflow/tfjs-node】 训练图片，对图片识别后进行分类的深度学习程序。</li>
	<li>使用开源的学习模型，进行修改后，训练图片生成模型。</li>
	<li>使用Parcel启动前端服务，使用http-server将本地文件构建成http文件服务</li>
</ul>

---

## 一、系统环境配置

### 训练环境变量配置
- 在运行训练程序Terminal中执行命令`export TF_CPP_MIN_LOG_LEVEL=2`

### 下载@tensorflow/tfjs-node
- 此依赖包需要<mark> **翻墙后才能下载** </mark>
- 配置代理DNS环境变量
	- 修改 **.bash_profile** 文件，文件最后增加如下内容
	
	``` text
	#proxy
	export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7891
	```
	- 修改保存后执行：`source ~/.bash_profile` 环境生效

- git地址

	```https://github.com/tensorflow/tfjs/tree/master/tfjs-node```
	
- <mark> **安装tensorflow node** </mark>
	- mac 环境需要先安装```$ xcode-select --install```

	```
	npm install @tensorflow/tfjs-node
	(or)
	yarn add @tensorflow/tfjs-node
	```
	
## 二、深度学习训练模型

- 训练模型地址：
	`https://ai-sample.oss-cn-hangzhou.aliyuncs.com/pipcook/models/mobilenet/web_model/model.json`
- 离线模型文件：`mobileNet.json`	

## 三、前端环境配置

- <mark> **前端环境安装** </mark>

``` node
1、npm i parcel-bundler -S （前端服务程序）
2、npm i react react-dom antd -S (前端依赖库)
3、npm i @tensorflow/tfjs -S (前端调用tensorflow)
4、npm i http-server --save-dev （把本地文件作为文件服务器启动）
```

- 前端服务启动：`npm start`
- 启动本地目录为服务目录：`hs output --cors` 
	- 加载output目录内容
	- cors 防止跨域
- package.json配置：`"start": "parcel app/index.html"`