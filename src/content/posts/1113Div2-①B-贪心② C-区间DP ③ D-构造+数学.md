---
title: "[算法训练] 1113Div2-①B-贪心②C-区间DP③D-构造+数学"
published: 2026-08-02
description: 1113Div2 - CD
image: ./cover.jpg
tags: [算法训练,Codeforces,Div2]
category: 算法训练
draft: False
---

# 1113Div2-①B-贪心②C-区间DP③D-构造+数学

[https://codeforces.com/contest/2248](https://codeforces.com/contest/2248 "https://codeforces.com/contest/2248")

[https://www.wolai.com/a8BYfRnqMj3XoJVVtRHYfN](https://www.wolai.com/a8BYfRnqMj3XoJVVtRHYfN "https://www.wolai.com/a8BYfRnqMj3XoJVVtRHYfN")

### A-贪心

#### 题目

给爱丽丝和鲍勃一个二进制字符串 ∗ 。 s 长度为 n 。它包含至少一个 0 和至少一个 1 。

它们按照以下顺序各执行一次\*\*\*操作：

- 首先，爱丽丝在 s 中选择 0 的一个出现点并将其删除。
- 然后，鲍勃在得到的字符串中选择 1 的一个出现点并删除它。

爱丽丝希望最终的字符串在 † 的词典中尽可能大，而鲍勃希望它在 † 的词典中尽可能小。如果双方都采取最优行动，请确定最终字符串。

∗ 一个二进制字符串是一个只由字符 0 和 1 组成的字符串。

† 对于两个长度相同的二进制字符串 a 和 b ，如果在它们不同的第一个位置上， a 的数字小于 b ，那么 a 在词法上小于 b 。

#### 贪心

两个人均删掉第一个0或1即可使得出现第一个1或0从而达到目的

```python title="贪心"
for _ in range(int(input())):
    s = input().strip()
    pos0 = s.find('0')
    s = s[:pos0] + s[pos0 + 1:]
    pos1 = s.find('1')
    s = s[:pos1] + s[pos1 + 1:]
    print(s)
```


### B-贪心

#### 题目

给你两个长度分别为 n 和 m 的数组 a 和 b 。这些数组中的所有 n+m 个整数都是**不同的**。

您可以对 a 执行以下操作，次数不限（可能为零）：

- 从 a 中选择两个元素，值分别为 x 和 y ，其中 x≤y 。
- 从 a 中删除这两个元素。
- 在 a 中插入一个整数 z ，使得 x≤z≤y .

完成所有操作后，可以任意排列 a 中的元素。

判断是否有可能使 a 等于 b 。

#### 贪心

要把`a`通过题述操作变成`b`显然的`n ≥ 2*m`

排序`a`和`b`，

排序后，用 `a` 中最小的 `m` 个数作为"左边界"，最大的 `m` 个数作为"右边界"。

对于`b`中的每个元素，在`a`中找配对须满足：

$$
a[i] ≤ b[i] ≤ a[n-m+i]
$$

即`b[i]`应在`a[i]`左边能提供的最小值和`a[n-m+i]`右边能提供的最大值之间

```python title="贪心"
import bisect
for _ in range(int(input())):
    n, m = map(int, input().split())
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))
    a.sort()
    b.sort()
    ok = True
    if n < m*2:
        ok = False
    else:
        for i in range(m):
            if a[i] > b[i] or a[n-m+i] < b[i]:
                ok = False
                break
    print("YES" if ok else "NO")
```


### **C-区间DP**

#### 题目

给你一个长度为 $2n$ 的数组 $a$ 。从 $1$ 到 $n$ 的每个整数在 $a$ 中恰好出现两次。

最初，您的得分是 $0$ 。

当 $a$ 为非空时，您可以重复执行以下操作：

- 选择一个在 $a$ 中存在的整数 $x$ 。
- 设 $l$ 和 $r$ 分别是当前数组中出现 $x$ 的最左边和最右边的索引。如果 $x$ 只出现一次，那么就是 $l = r$ 。
- 将 $(r - l + 1)^2$ 加入您的得分。
- 从 $a$ 中删除 $a_l, a_{l + 1}, \ldots, a_r$ 元素。其余元素在不改变顺序的情况下进行连接，并从 $1$ 开始重新索引。

将数组清空后，求最大可能得分。

#### 区间DP

对于每个数字 `x`，它在数组中出现两次，记两个位置为：

$$
[l_x,r_x]
$$

如果选择 `x` 进行操作，会删除整个区间：

$$
[l_x,r_x]
$$

并获得：

$$
(r_x-l_x+1)^2
$$

的分数。

***

考虑多个数字对应的区间：

- 如果两个区间互不相交，那么它们可以分别执行操作。
- 如果两个区间存在交叉或包含关系，那么其中一个区间被删除后，另一个区间中的元素也会一起消失。

因此最终能够贡献完整分数的数字对应区间一定满足：

> 所有选择的区间两两不相交。

问题变成：

> 在所有区间中选择若干互不重叠的区间，使得收益最大。

这是经典的 **加权区间调度问题**。

***

假设选择一个区间：

$$
[l,r]
$$

长度：

$$
len=r-l+1
$$

如果不选择：

- 其中 `len` 个元素最终会单独删除。
- 每个元素贡献 `1`。

因此贡献为：

$$
len
$$

如果选择：

$$
len^2
$$

所以选择该区间产生的额外收益：

$$
len^2-len
$$

***

所有 `2n` 个元素无论如何都会被删除，因此基础贡献为：

$$
2n
$$

只需要最大化：

$$
\sum(len^2-len)
$$

最后答案：

$$
answer=2n+最大额外收益
$$

***

将每个数字形成的区间记为：

$$
(l_i,r_i,w_i)
$$

其中：

$$
w_i=(r_i-l_i+1)^2-(r_i-l_i+1)
$$

按照右端点 `r` 从小到大排序。

定义：

$$
dp[i]
$$

表示考虑前 `i` 个区间时能够获得的最大额外收益。

***

对于第 `i` 个区间：

情况 1：不选择

直接继承：

$$
dp[i]=dp[i-1]
$$

情况 2：选择

需要找到最后一个与当前区间不冲突的区间：

$$
j=\max(r_j<l_i)
$$

那么：

$$
dp[i]=dp[j]+w_i
$$

综合：

$$
dp[i]=max(dp[i-1],dp[j]+w_i)
$$

***

由于区间已经按照右端点排序。

维护：

```python 
ends[i] = 第 i 个区间的右端点
```


对于当前区间左端点 `l`：

使用：

```python 
bisect_left(ends,l)
```


找到第一个：

$$
r \ge l
$$

的位置。

因此其前一个位置就是最后一个满足：

$$
r<l
$$

的不冲突区间。

***

遍历数组，记录每个数字出现的位置。

根据两个位置构造区间：

$$
[l_x,r_x]
$$

计算每个区间的额外收益：

$$
(r_x-l_x+1)^2-(r_x-l_x+1)
$$

按右端点排序。

使用加权区间 DP。

输出：

$$
2n+dp[n]
$$

***

```python title="区间DP"
import bisect
for _ in range(int(input())):
    n = int(input())
    a = list(map(int, input().split()))
    pos = [[] for _ in range(n + 1)]
    for i, x in enumerate(a):
        pos[x].append(i)
    b = []
    for x in range(1, n + 1):
        l, r = pos[x]
        length = r - l + 1
        g = length * length - length
        b.append((l, r, g))
    b.sort(key=lambda x: x[1])
    en = [r for l, r, w in b]
    m = len(b)
    dp = [0] * (m + 1)
    for i in range(1, m + 1):
        l, r, w = b[i - 1]
        j = bisect.bisect_left(en, l, 0, i - 1)
        dp[i] = max(
            dp[i - 1],
            dp[j] + w
        )
    print(2 * n + dp[m])
```


将每个数字出现的位置看成一个带权区间，把原问题转化为最大权不相交区间选择问题，用`dp[i]=max(dp[i-1],dp[pre[i]]+w[i])`求最大额外收益，最后加上所有单点删除的基础贡献`2n`。

### D-构造+数学

#### 题目

给你两个二进制字符串 $s$ 和 $t$ ，长度都是 $n$ 。

对于长度相同的两个二进制字符串 $a$ 和 $b$ ，如果执行下面的操作 0 次或 0 次以上就能使两个字符串变为空，那么这对字符串 $(a, b)$ 就叫做好字符串：

- 选择一组非空的位置 $1 \le i_1 \lt i_2 \lt \ldots \lt i_k \le |a|$ 和一个字符 $c \in \{\mathtt{0}, \mathtt{1}\}$ 。
- 让 $x = a_{i_1}a_{i_2}\ldots a_{i_k}$ 和 $y = b_{i_1}b_{i_2}\ldots b_{i_k}$ .
- 字符 $c$ 必须是 $x$ 和 $y$ 的模式 $^{\text{∗}}$ 。
- 从两个字符串中删除所选位置上的字符。其余字符将在不改变相对顺序的情况下进行连接。

二进制字符串的模式可以是 $\mathtt{0}$ 和 $\mathtt{1}$ 。

您需要回答 $q$ 个查询。每个查询都给出两个整数 $l$ 和 $r$ 。请判断一对子串 $(s_l s_{l+1} \ldots s_r, t_l t_{l+1} \ldots t_r)$ 是否合适。

这些查询是**独立的**。

$^{\text{∗}}$ 对于二进制字符串 $z$ ，如果字符 $c$ 在 $z$ 中至少出现 $\left\lceil \frac{|z|}{2} \right\rceil$ 次，则该字符 $c$ 是一个模式。这里， $\lceil x \rceil$ 表示大于或等于 $x$ 的最小整数。

####

***

对于每个位置 `i`，考虑：

$$
(s_i,t_i)
$$

共有四种情况：

| 类型 | 含义            |
| -- | ------------- |
| 00 | 两个字符串当前位置均为 0 |
| 01 | s 为 0，t 为 1   |
| 10 | s 为 1，t 为 0   |
| 11 | 两个字符串当前位置均为 1 |

对于一个查询区间，设：

$$
a=cnt_{00}
$$

$$
b=cnt_{01}
$$

$$
c=cnt_{10}
$$

$$
d=cnt_{11}
$$

***

一次操作需要选择若干位置，并选择一个字符 `x`。

要求：

- `x` 在第一个字符串选出的子序列中出现次数不少于一半。
- `x` 在第二个字符串选出的子序列中出现次数不少于一半。

***

**情况1：选择字符 0**

第一个字符串：

```text 
0 的数量 = a+b
1 的数量 = c+d
```


需要：

$$
a+b\ge c+d
$$

第二个字符串：

```text 
0 的数量 = a+c
1 的数量 = b+d
```


需要：

$$
a+c\ge b+d
$$

化简：

$$
a-d\ge |b-c|
$$

***

**情况2：选择字符 1**

同理：

$$
d-a\ge |b-c|
$$

***

因此一次操作合法条件：

$$
|a-d|\ge |b-c|
$$

***

**3. 整个字符串可删除条件**

考虑：

$$
b=cnt_{01}
$$

$$
c=cnt_{10}
$$

其中：

- 一个 `01` 和一个 `10` 可以互相抵消。
- 剩余的不平衡部分需要通过 `00` 或 `11` 提供贡献。

因此：

需要：

$$
|b-c|\le a+d
$$

即：

$$
|cnt_{01} - cnt_{10}| \le cnt_{00} + cnt_{11}
$$

这就是 good 的充要条件。

***

由于：

$$
n,q\le2\times10^5
$$

不能每次重新统计。

维护四个前缀数组：

```text 
pre00[i]
pre01[i]
pre10[i]
pre11[i]
```


表示前 `i` 个位置中四种类型出现次数。

对于查询：

$$
[l,r]
$$

有：

$$
cnt_x=pre_x[r]-pre_x[l-1]
$$

即可 `O(1)` 得到四个数量。

***

1. 遍历字符串。
2. 统计每个位置属于哪一种类型。
3. 建立四个前缀和数组。
4. 对每个查询：
   - 求 `cnt00,cnt01,cnt10,cnt11`
   - 判断：

$$
|cnt01-cnt10|\le cnt00+cnt11
$$

1. 输出结果。

***

**引理 1**

一次操作可以删除一个非空集合，当且仅当：

$$
|cnt_{01}-cnt_{10}|
$$

证明：

选择 `0` 时：

$$
|cnt_{01}-cnt_{10}|
$$

选择 `1` 时：

$$
|cnt_{01}-cnt_{10}|
$$

两种情况合并：

$$
|cnt_{01}-cnt_{10}|
$$

***

**引理 2**

如果：

$$
cnt_{00}+cnt_{11}
$$

则整个字符串一定可以删除。

原因：

- `01` 与 `10` 可以配对删除。
- 多余部分由 `00` 或 `11` 补偿。
- 每次操作至少删除一个字符。
- 最终可以删除全部位置。

***

**定理**

对于任意查询：

$$
(s[l,r],t[l,r])
$$

good 当且仅当：

$$
|cnt_{01}-cnt_{10}|\le cnt_{00}+cnt_{11}
$$

因此算法正确。

***

```python 
import sys
input = sys.stdin.readline
T = int(input())
for _ in range(T):
    n, q = map(int, input().split())
    s = input().strip()
    t = input().strip()
    pre00 = [0] * (n + 1)
    pre01 = [0] * (n + 1)
    pre10 = [0] * (n + 1)
    pre11 = [0] * (n + 1)
    for i in range(n):
        pre00[i+1] = pre00[i]
        pre01[i+1] = pre01[i]
        pre10[i+1] = pre10[i]
        pre11[i+1] = pre11[i]
        if s[i] == '0' and t[i] == '0':
            pre00[i+1] += 1
        elif s[i] == '0' and t[i] == '1':
            pre01[i+1] += 1
        elif s[i] == '1' and t[i] == '0':
            pre10[i+1] += 1
        else:
            pre11[i+1] += 1
    for _ in range(q):
        l, r = map(int, input().split())
        c00 = pre00[r] - pre00[l-1]
        c01 = pre01[r] - pre01[l-1]
        c10 = pre10[r] - pre10[l-1]
        c11 = pre11[r] - pre11[l-1]
        if abs(c01 - c10) <= c00 + c11:
            print("YES")
        else:
            print("NO")
```


***
