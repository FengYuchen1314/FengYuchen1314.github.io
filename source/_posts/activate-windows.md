---
title: 激活windows系统
author: Yuchen
excerpt: 快速激活windows系统，仅供学习使用
tags:
  - windows激活
categories:
  - 实用教程
cover: https://picgo.cn-nb1.rains3.com/2026/05/30f2b55c68d69a38576a8ac766bb089d.png
---

### 第一步：以管理员身份打开cmd

在搜索栏中输入 `cmd`，之后点击 `以管理员身份运行`：

![以管理员身份运行cmd截图](https://cn-nb1.rains3.com/wordpress/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE-2026-01-26-181923.png)

你会看到如下界面：

![cmd管理员界面截图](https://cn-nb1.rains3.com/wordpress/image.png)

### 第二步：依次输入代码

依次输入以下三行代码。注意，每输入一条就要按一次回车：

```text
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
```

```text
slmgr /skms kms.0t.net.cn
```

```text
slmgr /ato
```

之后 Windows 就激活好了。