---
title: Git 备份指令以及脚本
tags:
  - git
categories:
  - git
author: Yuchen
excerpt: 用github备份文件，保存每次更改
---
**配置（只需一次）**  

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

**初始化仓库（第一次）**  

```bash
git init
git branch -M main
git remote add origin https://github.com/用户名/仓库名.git
```

**添加文件**  

```bash
git add .                  # 添加所有改动（推荐）
git add -u                 # 只添加已修改和删除的文件
git add 文件名             # 添加单个文件
```

**提交**  

```bash
git commit -m "备份信息"   # 普通提交
git commit -am "信息"      # 添加已跟踪文件并提交
```

**上传与下载**  

```bash
git push                   # 上传
git push -u origin main    # 第一次推送
git pull                   # 下载最新内容
```

**查看状态**  

```bash
git status                 # 当前状态
git log --oneline          # 提交历史
```

**其他常用**  

```bash
git clone 仓库地址         # 克隆到本地
git rm --cached 文件名     # 取消跟踪但保留本地文件
git checkout -- 文件名     # 恢复单个文件
git reset --hard HEAD~1    # 撤销最后一次提交
```

**日常备份最简三行**  

```bash
git add .
git commit -m "备份 $(date)"
git push
```
**一键运行脚本**
将以下代码复制到txt文件里，之后把后缀改成.bat即可：
```
@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

echo.
echo 🚀 开始 Git 提交流程...
echo.

git add .
echo 📁 已执行 git add .

git diff --cached --quiet
if %errorlevel% == 1 (
    echo.
    echo ✍️ 请输入提交信息（直接回车结束）：
    set "commit_msg="
    set /p "commit_msg="
    
    if "!commit_msg!"=="" (
        echo ❌ 提交信息不能为空！
        pause
        exit /b
    )
    
    echo.
    echo 💾 正在提交...
    git commit -m "!commit_msg!"
    
    echo 🌐 正在推送...
    git push
    
    echo.
    echo ✅ 全部完成！
) else (
    echo ⚠️ 没有检测到任何文件改动。
)

echo.
pause
endlocal
```
