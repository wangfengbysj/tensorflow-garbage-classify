<h1 align='center'>TensorflowJS 深度学习识别图片</h1>
<p align='center'>
<img src="https://img.shields.io/badge/License-MIT-green"/><br/>
</p>
<ul>
	<li>使用Tensorflow JS 训练图片，以识别图片进行分类的深度学习程序。</li>
	<li>使用开源的学习模型，进行修改后，训练图片生成模型。</li>
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
	
- 安装tensorflow node
	- mac 环境需要先安装```$ xcode-select --install```

	```
	npm install @tensorflow/tfjs-node
	(or)
	yarn add @tensorflow/tfjs-node
	```
