---
title: AWC65-曼哈顿距离+二维前缀和/双端队列+滑动窗口
published: 2026-05-08
description: AWC65题解-solve-3-补DE
image: ./cover.jpg
tags: [算法训练,AtCoder,AWC]
category: 算法训练
draft: False
---


# AWC65

#### 絮叨

经过AWC64的板子后也是回到了AWC对我来说的正常难度，和ABC一样只能AC前三道（wa）

E赛时是可做的，但是我饿了，吃饭去了(hhhhh）

D给的是曼哈顿距离，问题要求的看出来了是~~二维前缀和~~，但是这个距离不太会，遂放弃,,,,,,

#### 难度

Easy: A,B,C

Mid: E

Hard: D

[AtCoder Weekday Contest 0065 Beta - AtCoder](https://atcoder.jp/contests/awc0065 "AtCoder Weekday Contest 0065 Beta - AtCoder")

#### A-模拟

题意大概是对于序列的每一个值判断是k的多少倍即可

```python title="模拟"
n,k = map(int,input().split())
a = list(map(int,input().split()))
ans = 0
for i,x in enumerate(a):
    ans += x
    if i != n and i >= k and i % k == 0:
        ans += 1
print(ans)
```


#### B-模拟

题意就是找到第一个大于x的pos

```python title="模拟"
n,k = map(int,input().split())
a = list(map(int,input().split()))
cur = 0
ans = -1
for i,x in enumerate(a):
    cur += x
    if cur >= k:
        ans = i + 1
        break
print(ans)
```


#### C-DP

入门级dp，打家劫舍换皮，需要注意dp的设计

```python title="dp"
n = int(input())
a = list(map(int, input().split()))
if n == 1:
    print(max(0, a[0]))
else:
    dp = [0] * n
    dp[0] = max(0, a[0])
    dp[1] = max(dp[0], a[1])
    for i in range(2, n):
        dp[i] = max(dp[i-1], dp[i-2] + a[i])
    print(max(dp))
```


#### D-曼哈顿距离+二维前缀和

**题意：**

- 平面上有 $  N  $ 个商店，每个商店有坐标 $(X_i, Y_i)$ 和销售额 $  C_i  $。
- 有 $  M  $ 个配送中心候选点，每个候选点有坐标 $(P_j, Q_j)$ 和配送距离 $  K_j  $（曼哈顿距离）。
- 如果商店与配送中心的曼哈顿距离 $\le K_j$，则该商店可被配送。
- 对每个候选点，求可配送商店的销售额总和。

**题解：**

曼哈顿距离的覆盖区域是一个菱形

可以通过坐标变换将其转化为矩形，使用二维前缀和快速查询。

曼哈顿距离：

$$
|x - P| + |y - Q| \le K
$$

令：

$$
u = x + y, \quad v = x - y
$$

则：

$$
|x-P|+|y-Q| = \max(|u - (P+Q)|, |v - (P-Q)|)
$$

曼哈顿距离 $\le K$ 等价于：

$$
|u - (P+Q)| \le K \quad \text{且} \quad |v - (P-Q)| \le K
$$

因此，每个商店变换为点 $(u, v)$，每个候选对应矩形查询：

$$
U_1 = P+Q - K,\ U_2 = P+Q + K
$$

$$
V_1 = P-Q - K,\ V_2 = P-Q + K
$$

注意 $v$ 可能为负数，需要平移（加偏移量）使其非负。

读入所有商店，计算每个商店的 $u = x+y$，$v = x-y + \text{offset}$（offset 取 1000 或更大），将销售额累加到二维数组 `grid[u][v]`

对 `grid` 做二维前缀和 `pre`

对于每个候选，计算矩形边界，利用前缀和 $O(1)$ 查询总和

```python title="曼哈顿距离+二维前缀和"
n,m = map(int,input().split())
of = 1000
max_u = max_v = 2000
grid = [[0]*(max_v + 5) for _ in range(max_u + 5)]
for _ in range(n):
    x,y,c = map(int,input().split())
    u = x + y
    v = x - y + of
    grid[u][v] += c
pre = [[0]*(max_v + 10) for _ in range(max_u + 10)]
for i in range(max_u + 5):
    for j in range(max_v + 5):
        pre[i][j] = grid[i][j] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1]
for _ in range(m):
    p,q,k = map(int,input().split())
    u0 = p + q
    v0 = p - q + of
    u1 = max(0,u0 - k)
    u2 = min(max_u,u0 + k)
    v1 = max(0,v0 - k)
    v2 = min(max_v,v0 + k)
    ans = pre[u2][v2] - pre[u1-1][v2] - pre[u2][v1-1] + pre[u1-1][v1-1]
    print(ans)
```


#### E-双端队列+滑动窗口

**题意：**

给定长度为 $  N  $ 的整数数组 $  H  $，需要找到最长的连续子数组，使得该子数组内最大值与最小值的差 ≤ $  D  $，并且子数组长度至少为 $  K  $。如果不存在，输出 -1。

**题解：**

使用两个单调队列分别维护窗口内的最大值和最小值

随着右指针 `r` 向右移动，更新两个队列

如果当前窗口内的最大值与最小值之差 > $  D  $，则移动左指针 `l` 缩小窗口，直到差值 ≤ $  D  $

每次满足差值 ≤ $  D  $ 时，更新答案 `ans = max(ans, r - l + 1)`，但只考虑长度 ≥ $  K  $ 的窗口

```python title="双端队列+滑动窗口"
from collections import deque
n,k,d = map(int,input().split())
h = list(map(int,input().split()))
maxq = deque()
minq = deque()
ans = -1
l = 0
for r in range(n):
    while maxq and h[maxq[-1]] < h[r]:
        maxq.pop()
    maxq.append(r)
    while minq and h[minq[-1]] > h[r]:
        minq.pop()
    minq.append(r)
    while maxq and minq and h[maxq[0]] - h[minq[0]] > d:
        if maxq[0] == l:
            maxq.popleft()
        if minq[0] == l:
            minq.popleft()
        l += 1
    cur = r - l + 1
    if cur >= k:
        ans = max(ans,cur)
print(ans)

```
