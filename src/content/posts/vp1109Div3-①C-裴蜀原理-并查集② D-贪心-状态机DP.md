---
title: "[算法训练] 1109Div3-①C-裴蜀原理/并查集②D-贪心/状态机DP"
published: 2026-07-20
description: 1109Div3
image: ./cover.jpg
tags: [算法训练,Codeforces,Div3,vp]
category: 算法训练
draft: False
---


# 1109Div3-①C-裴蜀原理/并查集②D-贪心/状态机DP

[https://www.wolai.com/iSpZ6hzfvrLoyaYiX1ExDL](https://www.wolai.com/iSpZ6hzfvrLoyaYiX1ExDL "https://www.wolai.com/iSpZ6hzfvrLoyaYiX1ExDL")

[Dashboard - Codeforces Round 1109 (Div. 3) - Codeforces](https://codeforces.com/contest/2244 "Dashboard - Codeforces Round 1109 (Div. 3) - Codeforces")

#### A-贪心

#### 题目

在一节几何课上，伊斯坎德尔觉得非常无聊，于是决定在尤拉的笔记本上画画。为此，他在上面画了一排横线。有的线长，有的线短，有的地方还是空的。

这一页由一个字符串 $s$表示，其中字符" \*"表示纸张的空白部分，字符 "#"表示已画线的一厘米。连续的 "#"字符序列构成一行。

尤拉决定擦掉所有的线，并让伊斯坎德尔帮助他：他们将同时从两端擦掉其中一条线。

- 每秒钟，伊斯坎德尔从右端擦除 $1$ 厘米，尤拉从左端擦除 $1$ 厘米。
- 如果当前线条的长度是 $1$ 或 $2$ 厘米，那么下一秒它就会被完全擦除，过程结束。

尤拉想选择一条线，以便和伊斯坎德尔一起尽可能长时间地擦除它。帮他确定这个最长时间。如果页面上没有线条，答案是 $0$ 秒。

#### 贪心

统计各线段的长度，

$经过 k 秒后剩余：$$len - 2k$$当$$ len - 2k ≤ 2$$ 时，下一秒擦完$$即 $$2k ≥ len - 2$$即 $$k ≥ (len - 2) / 2$

$k = ⌈(len - 2) / 2⌉$

$总时间 = k + 1 = ⌈(len - 2) / 2⌉ + 1 = ⌈len / 2⌉$

$即 (len + 1) // 2$

```python title="贪心"
for _ in range(int(input())):
    n = int(input())
    s = input()
    ans = 0
    cur = 0
    for c in s:
        if c == "#":
            cur += 1
        else:
            ans = max(ans,-(-cur//2))
            cur = 0
    ans = max(ans,-(-cur//2))
    print(ans)
```


#### B-贪心

#### 题目

众所周知，尼基塔热爱阅读。今天，他把自己的房间弄得乱七八糟，把书摆成了 $n$ 堆，从左到右依次编号为 $1$ 到 $n$ 。 $i$ 这一摞里有 $a_i$ 本书。如果除了最右边的一叠之外，其他每叠的书籍数量都严格少于其右边的一叠，即数组 $a$ 是严格递增的，那么这种排列就叫做整齐。

尤拉想通过执行以下任意次数的操作使排列整齐：

1. 选择一个书堆 $i$ ，使得 $1 \le i \lt n$ 和 $a_i \gt 1$ .
2. 从书堆 $i$ 顶端取出 $1$ 本书，这样 $a_i$ 就减少了 $1$ 。
3. 将这本书放到书堆 $i + 1$ 的顶部，因此 $a_{i+1}$ 增加 $1$ 。

判断尤拉能否使排列整齐。

#### 贪心

构造出1，2，3...的数列即可

对于第$i$个数，如果`a[i] + pre < i`，则说明无法构造

其中，`pre = a[i] + pre - i`

```python title="贪心"
for _ in range(int(input())):
    n = int(input())
    a = [0] + list(map(int,input().split()))
    ok = 1
    pre = 0
    for i in range(1,n+1):
        if a[i] + pre < i:
            ok = 0
            break
        pre = a[i] + pre - i
    if ok:
        print("Yes")
    else:
        print("No")
```


#### C-裴蜀原理/并查集

#### 题目

斯捷潘发现了长度为 $n$ 的排列 $p$ 。当然，他决定对其进行排序。为了让排序过程更有趣，他选择了两个正整数 $x$ 和 $y$ 。 $(x + y \le n)$ 并定义了一个交换元素的规则。

在一步棋中，斯捷潘可以选择 $i$ 和 $j$ 这两个指数 $(1 \le i, j \le n)$ 并交换 $p_i$ 和 $p_j$ 中的元素，条件是以下条件中至少有一个\*\*成立：

- $|i - j| = x$
- $|i - j| = y$

斯捷潘想知道是否有可能使用任意数量的此类操作将排列按升序排序。请帮助他回答这个问题。

#### 裴蜀原理

设 `g = gcd(x, y)`。

根据**裴蜀定理**，通过多次交换距离 `x` 和距离 `y`，实际可以交换**任意距离为 ****`g`**** 的倍数**的两个元素。

因此，所有**下标模 ****`g`**** 同余**的位置构成一个连通块，元素只能在这个块内移动。

```python title="裴蜀原理"
from math import gcd
for _ in range(int(input())):
    n, x, y = map(int, input().split())
    p = list(map(int, input().split()))
    g = gcd(x,y)
    ok = True
    for i in range(n):
        if (p[i]%g) != ((i+1)%g):
            ok = False
            break
    if ok:
        print("Yes")
    else:
        print("No")
```


#### 并查集

每个位置`i`可以和`i+x`和`i+y`交换 构成连通的边

同一连通分量内的元素可以任意排列

检查每个分量，当前值的元素集合`[p[i] for i in idx]`是否满足`sorted([i + 1 for i in idx])`

```python title="并查集"
for _ in range(int(input())):
    n, x, y = map(int, input().split())
    p = list(map(int, input().split()))
    parent = list(range(n))
    def find(u):
        while parent[u] != u:
            parent[u] = parent[parent[u]]
            u = parent[u]
        return u
    def union(u, v):
        pu, pv = find(u), find(v)
        if pu != pv:
            parent[pu] = pv
    for i in range(n):
        if i + x < n:
            union(i, i + x)
        if i + y < n:
            union(i, i + y)
    groups = {}
    for i in range(n):
        root = find(i)
        if root not in groups:
            groups[root] = []
        groups[root].append(i)
    ok = True
    for idx in groups.values():
        vals = [p[i] for i in idx]
        t = sorted([i + 1 for i in idx])
        if sorted(vals) != t:
            ok = False
            break
    print("YES" if ok else "NO")

```


#### D-贪心/状态机DP

#### 题目

雅罗斯拉夫一天的工作效率由长度为 $n$ 的数组 $a$ 描述。如果雅罗斯拉夫观看短视频，那么他的工作效率可能为负数；如果他工作，那么他的工作效率可能为正数。总生产率定义为数组中所有值的\*\*\*和。

雅罗斯拉夫有时会阅读励志文章。他有 $m$ 篇帖子，其中 $j$ -th 帖子的影响值为 $b_j$ 。如果雅罗斯拉夫阅读了一篇价值为 $b_j$ 的帖子，那么从一天开始到位置 $b_j$ 的所有生产力值都会改变符号，也就是说，所有整数 $a_1, a_2, a_3, \dots, a_{b_j}$ 都会乘以 $-1$ 。

例如，假设 $a = [1, -4, 3, -4]$ ，雅罗斯拉夫读取了数值为 $3$ 的帖子。然后将前三个元素的符号翻转，数组就变成了 $[-1, 4, -3, -4]$ 。如果雅罗斯拉夫读取了一个数值为 $1$ 的帖子，那么第一个元素的符号再次翻转，数组变为 $[1, 4, -3, -4]$ 。

雅罗斯拉夫读取任何一个（可能一个都没有）帖子所能达到的**最大**总生产率是多少？

#### 贪心

将帖子排序：`b_1 < b_2 < ... < b_m`，添加 `b_0 = 0`。

数组被分为 `m+1` 段：

- 第 k 段（k=1..m）：`(b_{k-1}, b_k]`
- 最后一段：`(b_m, n]`

对于第 k 段 `(b_{k-1}, b_k]`：

- 该段是否被翻转，取决于 **从 ****`b_k`**** 到 ****`b_m`**** 的帖子中选取了多少个**
- 设 `y_k ∈ {0,1}` 表示选取个数的奇偶性
- `y_k = 0`：该段符号为正（+段和）
- `y_k = 1`：该段符号为负（-段和）

由于可以任意选择帖子，`y_1, ..., y_m` 可以是任意组合。

**但最后一段 ****`(b_m, n]`**** 永远不被翻转**，所以 `y_{m+1} = 0` 固定。

- 前 m 段：可以选择正负号 → 贡献 = `abs(段和)`
- 最后一段：符号固定 → 贡献 = 段和（原值）

```python title="贪心"
for _ in range(int(input())):
    n, m = map(int, input().split())
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))
    pre = [0] * (n + 1)
    for i in range(n):
        pre[i + 1] = pre[i] + a[i]
    b.sort()
    ans = 0
    prev = 0
    for bk in b:
        ans += abs(pre[bk] - pre[prev])
        prev = bk
    ans += pre[n] - pre[prev]
    print(ans)
```


#### 状态机DP

从后往前遍历数组，维护两种状态：

- `dp0`：当前位置之后，**当前段符号为正**时的最大后缀和
- `dp1`：当前位置之后，**当前段符号为负**时的最大后缀和

```python title="初始状态"
dp0 = 0      # 正号段初始为 0
dp1 = -INF   # 负号段初始为负无穷（因为一开始不能是负号段）
```


从右往左遍历 `i = n-1` 到 `0`：

`val0 = a[i]`（当前元素取正）
`val1 = -a[i]`（当前元素取负）

```javascript title="i+1 是帖子位置（可以翻转）"
ndp0 = max(dp0 + val0, dp1 + val0)  // 保持正号段，或从负号段切过来
ndp1 = max(dp1 + val1, dp0 + val1)  // 保持负号段，或从正号段切过来
```


```c-like title="i+1 不是帖子位置（不能翻转）"
ndp0 = dp0 + val0  // 正号段只能继续正号
ndp1 = dp1 + val1  // 负号段只能继续负号
```


```python title="状态机DP"
for _ in range(int(input())):
    n, m = map(int, input().split())
    a = list(map(int, input().split()))
    b = set(map(int, input().split()))
    INF = 10 ** 18
    dp0 = 0
    dp1 = -INF
    for i in range(n - 1, -1, -1):
        val0 = a[i]
        val1 = -a[i]
        if (i + 1) in b:
            ndp0 = max(dp0 + val0, dp1 + val0)
            ndp1 = max(dp1 + val1, dp0 + val1)
        else:
            ndp0 = dp0 + val0
            ndp1 = dp1 + val1
        dp0, dp1 = ndp0, ndp1
    print(max(dp0, dp1))
```
