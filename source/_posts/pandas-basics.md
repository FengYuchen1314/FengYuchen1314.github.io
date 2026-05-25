---
title: Pandas库基础用法
author: Yuchen
excerpt: 最基础的数据读取、筛选和写入
tags:
  - 教程
  - python
categories:
  - python
cover: https://cn-nb1.rains3.com/wordpress/image_913565572041200.png
---

## 前言

`pandas` 库常常用于文件读取与写入，也可以进行一些数据处理。

本文将介绍 `pandas` 库的常用函数，使用 `data.csv` 进行演示，文件内容如下图：

![data.csv 文件内容](https://cn-nb1.rains3.com/wordpress/image-15.png)

## 输入部分

### 引入头文件

```python
import pandas as pd
import os
```

### 读取 csv 文件

```python
df = pd.read_csv('data.csv')
```

此时 `data.csv` 可以通过 **df** 调用。

打印出来看看结果：

```python
print(df)
```

![打印结果](https://cn-nb1.rains3.com/wordpress/image-16.png)

### 获得列

以下两种方法均不会读取第一行。

#### 用列名

```python
utctime = df["datetime"]
```

这样会根据列名读取对应的列。

#### 用索引

```python
utctime1 = df.iloc[:, 0]
```

注意，索引是从 0 开始的，也就是说代码中的 0 代表实际中的第一列。

### 获得行

#### 用标签

这里仅作参考：

```python
row3 = df.loc["Name3"]
```

#### 用索引

```python
row3 = df.iloc[2]
```

注意，这里的行数，是从第二行开始算的。

## 数据清洗与处理

### 处理缺失值

```python
# 检测缺失值
print(df.isnull().sum())  # 每列缺失值数量
print(df.isna().any())    # 是否有缺失值

# 处理缺失值
df_clean = df.dropna()              # 删除含缺失值的行
df_filled = df.fillna(0)            # 用 0 填充
df_filled = df.fillna(df.mean())    # 用均值填充
df_forward = df.fillna(method='ffill')  # 前向填充
```

这里的缺失值处理常常需要手动处理，而非简单调用。

### 数据类型转换

```python
# 转换数据类型
df['date'] = pd.to_datetime(df['date'])
df['category'] = df['category'].astype('category')
df['price'] = df['price'].astype(float)
# 处理重复值
df_unique = df.drop_duplicates()
df_unique = df.drop_duplicates(subset=['id'])  # 基于特定列去重
```

### 数据筛选

#### 条件筛选

```python
# 单条件筛选
filtered = df[df['age'] > 25]

# 多条件筛选
filtered = df[(df['age'] > 25) & (df['salary'] < 50000)]
filtered = df[(df['city'] == '北京') | (df['city'] == '上海')]

# 使用 query 方法（更简洁）
filtered = df.query('age > 25 and salary < 50000')
filtered = df.query('city in ["北京", "上海"]')
```

#### 字符串查找

```python
# 字符串筛选
df[df['name'].str.contains('张')]
df[df['email'].str.endswith('@gmail.com')]
```

## 数据写入

### 创建 DataFrame

```python
list1 = [1, 2, 3, 4, 5]
list2 = ['a', 'b', 'c', 'd', 'e']
list3 = [10.5, 20.3, 30.1, 40.7, 50.9]
# 直接创建 DataFrame
df = pd.DataFrame({
    '列1名称': list1,
    '列2名称': list2,
    '列3名称': list3
})
```

### 写入

#### 覆盖写入

```python
df.to_csv('my_data.csv', index=False, encoding='utf-8-sig')
```

#### 追加写入

较为麻烦，所以封装成一个函数供调用：

```python
def append_to_csv(df, filename):
    file_exists = os.path.exists(filename)
    df.to_csv(filename,
              mode='a' if file_exists else 'w',
              index=False,
              header=not file_exists,
              encoding='utf-8-sig')
```

只需要：

```python
append_to_csv(df, filename)
```

即可追加写入。