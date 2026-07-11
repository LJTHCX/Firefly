---
title: ABC466-①D:逆序处理②E:K次最大子段和③F:优先队列
published: 2026-07-11
description: ABC466
image: ./cover.jpg
tags: [训练,AtCoder,ABC]
category: AtCoder
draft: False
---

# ABC466-①D:逆序处理②E:K次最大子段和③F:优先队列

[Tasks - AtCoder Beginner Contest 466](https://atcoder.jp/contests/abc466/tasks "Tasks - AtCoder Beginner Contest 466")

### D-逆序处理

#### 题意

有一个网格，其中有 $N$ 行和 $N$ 列。

起初，网格上什么都没有放置。
从这个状态开始，高桥依次对网格执行 $M$ 次操作。 $i$ -th操作 $(1\leq i\leq M)$ 如下。

- 移除从上往下第 $R_i$ 行单元格上的所有棋子。
- 接着，移除从左边起第 $C_i$ 列单元格上的所有棋子。
- 最后，在从上往下第 $R_i$ 行和从左往上第 $C_i$ 列的单元格上放置一个棋子。

输出经过 $M$ 次操作后放置在网格上的棋子数量。

#### 逆序处理

从后往前操作，维护会被清除的行和列，若当前行和列均未被清除，则计入答案

```python title="逆序处理"
n,m = map(int,input().split())
p = []
for _ in range(m):
    r,c = map(int,input().split())
    p.append([r,c])
row = set()
col = set()
ans = 0
for r,c in reversed(p):
    if r not in row and c not in col:
        ans += 1
    row.add(r)
    col.add(c)
print(ans)
```


### E-K次最大子段和

#### 题意

有 $N$ 张扑克牌排成一排。卡片的编号是 $1, 2, \ldots, N$ 。

卡片 $i$ 的正面写着一个整数 $A_i$ ，背面写着一个整数 $B_i$ 。最初，每张卡片都是正面朝上。

以下操作最多可以执行 $K$ 次。

- 选择满足 $1 \leq l \leq r \leq N$ 的整数 $l$ 和 $r$ 。对每个满足 $l \leq i \leq r$ 的整数 $i$ 翻牌 $i$ 。这里的翻牌指的是将操作前朝下的一面翻成朝上。

完成操作后，求写在纸牌朝上一面的数字之和的最大可能值。

#### 最大子段和

计算每张卡片的翻转收益

每张卡片最终会翻转0或1次

翻转区域由若干不相交的区间组成

重叠的区间可以通过合并优化

问题等价于**选择最多K个不相交的区间，使得这些区间的翻转收益之和最大化**

算法设计：

用Kadane算法找到当前收益数组的最大子段和

将该子段和加入答案

**将该子段取反**

重复k次

```python title="最大子段和"
n,k = map(int,input().split())
org = 0
d = []
for _ in range(n):
    a,b = map(int,input().split())
    org += a
    d.append(b - a)
ans = org
for _ in range(k):
    max_sum = cur_sum = 0
    bl = br = -1
    l = 0
    for i in range(n):
        if cur_sum <= 0:
            cur_sum = d[i]
            l = i
        else:
            cur_sum += d[i]
        if cur_sum > max_sum:
            max_sum = cur_sum
            bl = l
            br = i
    if max_sum <= 0:
        break
    ans += max_sum
    for i in range(bl,br+1):
        d[i] = -d[i]
print(ans)
```


### F-优先队列

#### 问题描述

给你一个整数 $N,X$ 和一个长度为 $N$ 的正整数序列 $A=(A_1,A_2,\ldots,A_N)$ 。

对于一个非负整数 $x$ ，定义 $f(x)=(\ldots((x \bmod A_1) \bmod A_2) \ldots ) \bmod A_N$ .

求介于 $1$ 与 $X$ 之间的整数 $x$ 的个数，使得 $f(x)=0$ .

给你 $T$ 个测试用例，请逐个求解。

#### 优先队列-DV4

不逐个 x 模拟，而是**将值相同的 x 合并处理**。一次模运算会把一个区间映射到更小的值，我们用优先队列维护这些"等价类"。

**1. 状态表示**

优先队列存储 `(值, 个数)`：表示有 `个数` 个不同的初始 x，经过前面的模运算后**当前值都等于这个值**。

用最大堆（负数实现），每次取当前最大值进行处理。

**初始状态**：`(X, 1)`？不，代码用了 `(X+1, 1)`。

这里 `X+1` 是哨兵，表示区间 `[1, X]`。实际上初始时，x 取 1 到 X 各一个，共 X 个不同的值。但代码简化了表示：用 `(X+1, 1)` 一个区间来代表这 X 个数。

**2. 处理模运算**

对于当前模数 `v = A[i]`：

- 如果 `val < v`：该区间不受影响，保持不变
- 如果 `val ≥ v`：**取模会改变值，需要拆分**

**拆分规则**：有 `cnt` 个 x 的当前值为 `val`，经过 `mod v` 后：

- 其中 `(val // v) * cnt` 个变成 `v-1` 及以下的值（分散在 `[0, v-1]`）
- 其中 `cnt` 个变成 `val % v`

**为什么是 ****`(-v, ...)`****？**

这里 `-v` 代表的是**被 v 完全"吸收"的部分**。当 `val ≥ v` 时，`val // v` 个完整的 `[0, v-1]` 周期被映射到了各种余数上。

实际上，这里的 `-v` 是一个**占位符**，表示这些 x 的当前值分布在 `[0, v-1]` 中，不需要精确追踪每个余数——因为后续更小的模数会统一处理它们。

**为什么可以这样？**

因为后续如果遇到比 v 更小的模数，`[0, v-1]` 内的值会进一步被处理。用 `v` 作为占位符，后续处理时如果 `v > 下一个模数`，会继续拆分；如果 `v ≤ 下一个模数`，保持不变。

取堆顶时，如果多个区间的值相同，合并它们的计数。

处理完所有 A 后，优先队列中存储的是**所有非零最终值**的分布。

`f(x) = 0` 意味着最终值为 0。队列中没有 0 的项（因为 `val % v == 0` 的部分被归入了占位符）。

实际上，**最终队列中所有计数之和 = 非零值的 x 个数**。

答案 = X - (非零值的个数)。

```python title="优先队列"
import sys
from heapq import heappush, heappop
input = sys.stdin.readline
for _ in range(int(input())):
    n, x = map(int, input().split())
    a = list(map(int, input().split()))
    pq = [(-(x + 1), 1)]
    for v in a:
        while pq and -pq[0][0] > v:
            val, cnt = heappop(pq)
            val = -val
            while pq and -pq[0][0] == val:
                cnt += heappop(pq)[1]
            heappush(pq, (-v, (val // v) * cnt))
            if val % v:
                heappush(pq, (-(val % v), cnt))
    ans = -1
    while pq:
        ans += heappop(pq)[1]
    print(ans)

```
