---
title: 使用API调用大模型
author: Yuchen
excerpt: 以DeepSeek为例，将其API接入cherry studio
banner_img: https://cn-nb1.rains3.com/wordpress/image-4.jpg
tags:
  - ai
  - llm
  - api
categories:
  - ai
cover: https://picgo.cn-nb1.rains3.com/2026/05/0f75a98856dc2cfa898df1b79dbca053.png
---


## 前言

### 为什么要用 api？

当前语言大模型盛行，但在线使用网页版常常出现卡顿，特别是 **deepseek** 的：

![image-1](https://cn-nb1.rains3.com/wordpress/image-1.png)

每次看到这个都没绷住。

所以，本文将教学如何付费购买 api 使用大模型，避免卡顿。

### 国内好用的大模型

目前国内好用的（有 api 接口）的语言大模型有：Qwen3 系列，Deepseek 系列，MiniMax 系列。

其中 `Qwen3` 和 `Deepseek` 更常见且应用面更广。本文以后者为例。

## 软件部署

使用 **`Cherry Studio`** 进行调用。

### 下载

搜索栏搜索 `Cherry Studio`，并且进入：

![屏幕截图-2026-01-26-225654](https://cn-nb1.rains3.com/wordpress/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE-2026-01-26-225654.png)

然后点击下载：

![image-2](https://cn-nb1.rains3.com/wordpress/image-2.png)

![image-3](https://cn-nb1.rains3.com/wordpress/image-3.png)

之后正常安装。

安装完成之后可以看到如下界面，说明成功：

![image-4](https://cn-nb1.rains3.com/wordpress/image-4.png)

## API 申请与调用

### Deepseek

进入 `deepseek` 官网，点击 `API 开放平台`：

![image-5](https://cn-nb1.rains3.com/wordpress/image-5.png)

进入之后，先 `充值` 一定的数额，然后点击 `api keys`：

![image-6](https://cn-nb1.rains3.com/wordpress/image-6.png)

点击创建 `api key`：

![image-7](https://cn-nb1.rains3.com/wordpress/image-7.png)

之后随便输一个名称，然后点创建，会看到以下界面：

![image-8](https://cn-nb1.rains3.com/wordpress/image-8.png)

这时候放着别动。

然后打开 `Cherry Studio`，点击右上角设置图标：

![image-9](https://cn-nb1.rains3.com/wordpress/image-9.png)

然后找到深度求索，把前面申请的密钥粘贴进去：

![image-10](https://cn-nb1.rains3.com/wordpress/image-10.png)

之后点击检测，随便选一个模型，出现以下结果说明成功：

![image-11](https://cn-nb1.rains3.com/wordpress/image-11.png)

之后就可以选择 `Deepseek` 模型进行对话了：

![image-12](https://cn-nb1.rains3.com/wordpress/image-12.png)

![image-13](https://cn-nb1.rains3.com/wordpress/image-13.png)

![image-14](https://cn-nb1.rains3.com/wordpress/image-14.png)

### 其他模型

`Cherry Studio` 集成了市面上几乎所有的 ai 大模型调用。

如果想要调用其他大模型，只需要去官网申请 api，然后在 `Cherry Studio` 的设置中选择对应的选项，填入 api key，然后将该模型设置为开启即可，总体步骤和 Deepseek 的调用大同小异。



