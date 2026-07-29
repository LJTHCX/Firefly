---
title: ABC463-①C-离线查询+贪心/单调栈②D-二分答案③E-Dijkstra+虚拟节点④F-逆元+组合数学
published: 2026-06-21
description: ABC463-solve4-补EF
image: ./cover.jpg
tags: [算法训练,AtCoder,ABC]
category: 算法训练
draft: False
---

# ABC463-①C-离线查询+贪心/单调栈②D-二分答案③E-Dijkstra+虚拟节点④F-逆元+组合数学

[更好的阅读体验](https://www.wolai.com/pBt1Eeof2jMwC1eBWyCBir "更好的阅读体验")

[AtCoder Beginner Contest 463 - AtCoder](https://atcoder.jp/contests/abc463 "AtCoder Beginner Contest 463 - AtCoder")

### C-离线查询+贪心/单调栈

#### 题目

目前，会议室里有 $N$ 个高桥（Takahashi）。高桥在一间会议室里。其中 $i$ 个 $(1\le i\le N)$ 人的身高是 $H _ i$ 。高桥的身高为 $H _ i$ ，并将在 $L _ i$ 分钟后离开会议室。高桥一旦离开会议室，就再也不会回来了。

你有 $Q$ 个问题，请按顺序回答。对于 $i$ - $(1\le i\le Q)$ 个查询，你会得到一个整数 $T _ i$ ，所以请找出从现在起 $T _ i+\dfrac12$ 分钟后在房间里的高桥的最大身高。在这个问题的约束条件下，可以保证从现在起 $T _ i+\dfrac12$ 分钟后至少有一个高桥在房间里。

#### 离线查询+贪心

输入是按照时间顺序（**升序**）来的，对q进行离线查询（**按照时间递减排序**），逆序遍历维护最大的身高即可

```python title="离线查询+贪心"
n = int(input())
h = []
l = []
for _ in range(n):
    hi, li = map(int, input().split())
    h.append(hi)
    l.append(li)
q = int(input())
t = list(map(int, input().split()))
quer = [(t[i], i) for i in range(q)]
quer.sort(reverse=True)
ans = [0] * q
max_h = 0
idx = n - 1
for ti, qi in quer:
    while idx >= 0 and l[idx] > ti:
        max_h = max(max_h, h[idx])
        idx -= 1
    ans[qi] = max_h
print('\n'.join(map(str, ans)))
```


#### 单调栈

对于两个人 i 和 j，如果 i 比 j **先离开**（L\_i < L\_j）且 i 的**身高更矮**（H\_i ≤ H\_j），那么在 j 离开之前的任何查询中，i 都不可能是答案（因为 j 更高且在房间里待得更久）。

- **同时满足"离开更早"和"身高更矮"的人是无用的**
- 只有在"离开时间"和"身高"两个维度上都构成**反比关系**的人才是候选答案

```python title="单调栈"
import sys
import bisect
def solve():
    input = sys.stdin.readline
    n = int(input())
    # 单调栈：维护 (身高, 离开时间)，满足身高严格递减，离开时间递增
    stack = []
    for _ in range(n):
        h, l = map(int, input().split())
        # 淘汰离开更早但身高更矮的人
        while stack and stack[-1][0] <= h:
            stack.pop()
        stack.append((h, l))
    q = int(input())
    t = list(map(int, input().split()))
    # 提取离开时间用于二分
    leave_times = [l for _, l in stack]
    ans = []
    for ti in t:
        # 找到第一个离开时间 > ti 的位置
        pos = bisect.bisect_right(leave_times, ti)
        ans.append(str(stack[pos][0]))
    print('\n'.join(ans))
if __name__ == "__main__":
    solve()
```


### D-二分答案

#### 题目

在一条数线上有 $N$ 块布。 $i$ /- $(1\le i\le N)$ 块布覆盖了直线上的区间 $\lbrack L _ i,R _ i\rbrack$ 。直线上的一点可能被两块或更多块布覆盖，也可能没有被任何一块布覆盖。

如果直线上的某一点同时被两块布覆盖，则称两块布重叠。

对于不重叠的两块布，其**距离**定义如下：

- 一块布覆盖的所有点 $p$ 和另一块布覆盖的所有点 $q$ 上 $|p-q|$ 的最小值。

对于没有两块布重叠的 $K$ 块布，将其**分数**定义为所有这些布对之间的最小距离。从 $N$ 块布中选择 $K$ 块布，使所选的布中没有两块重叠，求可能的最大得分。

如果无法选择 $K$ 这样的布，则输出 `-1`。

#### 二分答案

题目要求：从 N 个区间中选 K 个**互不重叠**的区间，最大化它们两两之间**最小距离**。

设答案为 `D`，则：

- 如果能在最小距离 ≥ `D` 的条件下选出 K 个区间
- 那么对于任何 `D' < D` 也一定能选出（条件更宽松）
- 对于任何 `D' > D` 一定选不出（条件更严格）

1. 将所有区间按**右端点从小到大**排序
2. 维护上一个选中区间的右端点 `last_R`
3. 遍历每个区间 `[L, R]`：如果 `L - last_R ≥ D`，则选择该区间，更新 `last_R = R`
4. 统计选中的数量是否≥k

```python title="二分答案"
def check(a, k, d):
    cnt = 0
    rr = -10 ** 18
    for l, r in a:
        if l - rr >= d:
            if d == 0 and l <= rr:
                continue
            cnt += 1
            rr = r
            if cnt >= k:
                return True
    return False
def main():
    n, k = map(int, input().split())
    a = []
    for _ in range(n):
        l, r = map(int, input().split())
        a.append((l, r))
    a.sort(key=lambda x: x[1])
    if not check(a, k, 0):
        print(-1)
        return
    l, r = -1, 10 ** 9 + 1
    while l + 1 < r:
        mid = (l + r) // 2
        if check(a, k, mid):
            l = mid
        else:
            r = mid
    print(l)
if __name__ == "__main__":
    main()
```


### E-Dijkstra+虚拟节点

#### 题目

AtCoder 国家有 $N$ 座城市和 $M$ 条道路。{9551763}条道路 $(1\le i\le M)$ 双向连接着 $u _ i$ 个城市和 $v _ i$ 个城市，从一个城市到另一个城市只需 $T _ i$ 分钟。

此外，每个城市都安装了翘曲门，使用翘曲门可以在 $X _ i+X _ j+Y$ 分钟内从城市 $i\ (1\le i\le N)$ 到达城市 $j\ (1\le j\le N)$ 。

国内没有其他城市之间的交通方式。

请为每个 $k=2,3,\ldots,N$ 解出下面的问题：

- 求从城市 $1$ 到城市 $k$ 所需的最少时间。

在同一城市，从一条道路或翘曲门到另一条道路或翘曲门所需的时间可以忽略不计。

#### Dijkstra+虚拟节点

在带道路和传送门两种移动方式的图中，求从城市1到所有其他城市的最短时间。传送门代价为 `X_i + X_j + Y`。

**最优路径最多使用一次传送门**。因为使用多次传送门可以合并。因此路径只有两种情况：不使用传送门；先走道路到某城市 u，传送至 v，再走道路到终点

从城市1出发，只走道路，得到 `dist_road[i]`——不使用传送门到达 i 的最短时间。

枚举传送门起点 u，计算使用传送门的最小代价：从1走道路到某个 u，然后从 u 进入传送门，这部分的最小代价。

对于每个城市 i，传送方案有两种可能：

- 直接传送到 i，不再走路：`min_entry + X_i + Y`
- 传送到某个 v，再走道路到 i：这等价于以 `min_entry + X_v + Y` 为起点，在道路图上走最短路

**实现**：以 `min(dist_road[i], min_entry + X_i + Y)` 作为每个城市 i 的初始距离，跑第二次 Dijkstra（多源最短路），在道路图上传播。这自动覆盖了"传送后再走道路"的情况。

```python title="Dijkstra+虚拟节点"
import heapq
n, m, y = map(int, input().split())
g = [[] for _ in range(n)]
for _ in range(m):
    u, v, t = map(int, input().split())
    u -= 1
    v -= 1
    g[u].append((v, t))
    g[v].append((u, t))
x = list(map(int, input().split()))
inf = 10 ** 30
dist_road = [inf] * n
dist_road[0] = 0
pq = [(0, 0)]
while pq:
    d, u = heapq.heappop(pq)
    if d != dist_road[u]:
        continue
    for v, t in g[u]:
        if dist_road[v] > d + t:
            dist_road[v] = d + t
            heapq.heappush(pq, (dist_road[v], v))

min_entry = inf
for i in range(n):
    if dist_road[i] != inf:
        min_entry = min(min_entry, dist_road[i] + x[i])
dist = [inf] * n
pq = []
for i in range(n):
    dist[i] = min(dist_road[i], min_entry + x[i] + y)
    heapq.heappush(pq, (dist[i], i))

while pq:
    d, u = heapq.heappop(pq)
    if d != dist[u]:
        continue
    for v, t in g[u]:
        if dist[v] > d + t:
            dist[v] = d + t
            heapq.heappush(pq, (dist[v], v))
ans = [str(dist[i]) for i in range(1, n)]
print(' '.join(ans))
```


### F-逆元+组合数学
