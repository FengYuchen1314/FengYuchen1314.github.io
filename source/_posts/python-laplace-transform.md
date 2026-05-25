---
title: 使用Python求解拉普拉斯变换
author: Yuchen
excerpt: 包含正变换与逆变换代码
tags:
  - python
  - math
categories:
  - python
cover: https://cn-nb1.rains3.com/wordpress/image_910371419550692.png
---

## 前置准备

导入 `sympy` 库：

```python
import sympy as sp
```

定义符号变量 `s` 和 `t` ：

```python
t,s=sp.symbols("t s")
```

## 正变换

自定义一个函数来调用：

```python
def Laplace_transform(func,t,s):
    return sp.laplace_transform(func,t,s)[0]
```

其中 `[0]` 代表只返回结果，不返回收敛域；

`func` 就是要变换的 `f(t)` 。直接 `print` 这个自定义函数即可查看结果

## 逆变换

同样的，自定义一个函数来调用：

```python
def Inverse_Laplace_transform(func,s,t):
    return sp.inverse_laplace_transform(func,s,t)
```

注意这次不能带 `[0]` 。

其中 `func` 就是要变换的 `F(s)` 。直接 `print` 这个自定义函数即可查看结果

## 关于函数输入

注意不能混用 `math` 和 `sympy` 的函数！

比如指数要用 `sp.exp(-t)`，不能用 `math.exp(-t)`。对于其他的平方、除法等运算，正常输入即可。

## 完整示例

我们求下面两个函数的拉普拉斯变换和逆变换：

$$
f(t)=\dfrac{\sin (kt)}{t}
$$

$$
F(s)=\dfrac{s}{(s^2 -1)^2}
$$

代码如下：

```python
import sympy as sp

def Laplace_transform(func,t,s):
    return sp.laplace_transform(func,t,s)[0]

def Inverse_Laplace_transform(func,s,t):
    return sp.inverse_laplace_transform(func,s,t)

# 定义符号，k也是符号，因为没有指定具体值
t,s=sp.symbols("t s")
k=sp.symbols("k",positive=True)

# 求 f(t)=sin(kt)/t 的拉普拉斯变换
func_t=sp.sin(k*t)/t
func_s=Laplace_transform(func_t,t,s)
print(f"F(s) = {func_s}")  # 结果: atan(k/s)

# 求 F(s)=s/(s^2-1)^2 的逆拉普拉斯变换
func_s=s/((s**2-1)**2)
func_t=Inverse_Laplace_transform(func_s,s,t)
print(f"f(t) = {func_t}")  # 结果: t*sinh(t)/2
```

运行后得到结果：

![运行结果截图](https://cn-nb1.rains3.com/wordpress/%E6%88%AA%E5%B1%8F2026-03-12-23.38.19.png)

是正确的。