---
title: AWC68
published: 2026-05-13
description: AWC68题解-solve3-补DE
image: ./cover.jpg
tags: [训练,AtCoder,AWC]
category: AWC
draft: False
---

# AWC68

[Tasks - AtCoder Weekday Contest 0068 Beta](https://atcoder.jp/contests/awc0068/tasks "Tasks - AtCoder Weekday Contest 0068 Beta")

Easy: A、B

Mid: C

Hard: D、E

</details>
<details> <summary>A/B-模拟</summary>
A判断序列每个元素的范围是否在\[l,r]中即可

```python title="A-模拟"
n,l,r = map(int,input().split())
ans = 0
for _ in range(n):
    t = int(input())
    if l <= t <= r:
        ans += 1
print(ans)
```


B维护最大值最小值即可

```python title="B-模拟"
n,m = map(int,input().split())
a = [0] + list(map(int,input().split()))
INF = 10**99
max_ = 0
min_ = 10**99
for _ in range(m):
    l,r = map(int,input().split())
    t = sum(a[l:r+1])
    if t > max_:
        max_ = t
    if t < min_:
        min_ = t
print(max_ - min_)
```


</details>
<details> <summary>C-并查集</summary>

**题意：**

有N个队伍，每个队伍只有一个人，且没有颜色

有M次操作，第i次操作，合并ui和vi所在的队伍，将合并后的队伍颜色设为ci

所求为所有操作结束后，有颜色的队伍中，不同颜色的数量

**题解：**

值得注意的是，**如果两个队伍已经合并，其颜色仍需被更改**

用并查集维护队伍合并，记录每个队伍根节点最终颜色，对于每个操作i：

找到ui和vi的跟ru,rv，**如果ru≠rv，则合并并将新根的颜色设为ci**

**如果ru==rv，则直接将根的颜色设为ci**

最后遍历所有根节点，如果颜色非空，加入集合

```python title="并查集"
def find(p, x):
    if p[x] != x:
        p[x] = find(p, p[x])
    return p[x]

def union(p, rank, color, x, y, c):
    rx, ry = find(p, x), find(p, y)
    if rx == ry:
        color[rx] = c
        return
    if rank[rx] < rank[ry]:
        p[rx] = ry
        color[ry] = c
    elif rank[rx] > rank[ry]:
        p[ry] = rx
        color[rx] = c
    else:
        p[ry] = rx
        rank[rx] += 1
        color[rx] = c

n, m = map(int, input().split())
p = list(range(n + 1))
rank = [0] * (n + 1)
color = [0] * (n + 1)
for _ in range(m):
    u, v, c = map(int, input().split())
    union(p, rank, color, u, v, c)

colors = set()
# 统计所有根节点
for i in range(1, n + 1):
    if p[i] == i and color[i] != 0:
        colors.add(color[i])
print(len(colors))
```


</details>
<details> <summary>D-Dijkstra最短路</summary>

**题意：**

- 图：N 个节点，M 条无向边，无重边。
- 每个节点的度数 = 拥堵程度。
- 路线：从 1 到 N，允许重复走节点和边。
- 代价 = **边数（每条 1 分钟）+ 对于每条内部节点（不包括起点和终点），如果它的度数 ≥ K，则额外 +1 分钟**。
- 求最小总时间，若不可达输出 -1。

**题解：**

节点代价只看度数≥k时才加1，且只在路径内部节点才计算，故把节点权值转化为"经过该节点时，如果度数≥k"则加1

将每个节点 u 拆成两个点：u\_in 和 u\_out。

- 对于原图中每条边 (u, v)：
  - 添加有向边 u\_out → v\_in，权值 1
  - 添加有向边 v\_out → u\_in，权值 1
- 对于每个节点 u：
  - 添加有向边 u\_in → u\_out，权值 = (1 if deg\[u] ≥ K else 0)

这样，从 1\_in 出发，到 N\_in 结束，走一条路径，总权值 = 边数 + 内部节点数（满足条件）。

边：u\_out → v\_in 权值 1；v\_out → u\_in 权值 1 &#x20;
节点内部：u\_in → u\_out 权值 = 1 if deg\[u] ≥ K and u not in {1, N} else 0

```python title="Dijkstra 最短路"
import heapq
import sys

def solve():
    input = sys.stdin.readline
    N, M, K = map(int, input().split())
    g = [[] for _ in range(N + 1)]
    degree = [0] * (N + 1)
    for _ in range(M):
        u, v = map(int, input().split())
        g[u].append(v)
        g[v].append(u)
        degree[u] += 1
        degree[v] += 1

    # 拆点：0~N-1 为 in，N~2N-1 为 out
    def in_node(x):
        return x - 1
    def out_node(x):
        return N + x - 1

    total_nodes = 2 * N
    adj = [[] for _ in range(total_nodes)]
    for u in range(1, N + 1):
        # 内部边：in -> out
        if u == 1 or u == N:
            adj[in_node(u)].append((out_node(u), 0))
        else:
            adj[in_node(u)].append((out_node(u), 1 if degree[u] >= K else 0))
        # 对外边：out -> 相邻的 in
        for v in g[u]:
            adj[out_node(u)].append((in_node(v), 1))

    INF = 10**18
    dist = [INF] * total_nodes
    start = in_node(1)
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:
            continue
        for v, w in adj[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))

    ans = dist[in_node(N)]
    print(ans if ans != INF else -1)

if __name__ == "__main__":
    solve()
```

</details>
<details> <summary>E-二维前缀和+滑窗</summary>

**题意：**

- 有一个 N×N 的网格，每个格子有风景得分 Ai,j。
- 高桥选一个 K×K的子矩阵（连续的行和列）。
- 青木**在这个子矩阵内**选一个格子，将其分数改成 0（可以选已经是 0 的格子）。
- 青木的目的是**最小化**这个子矩阵的总分。
- 高桥的目的是**最大化**青木操作后的总分。
- 求最终的最大可能总分。

**题解：**

对于高桥选定的一个 $  K \times K  $ 区域，设区域内的格子的分数为 $  a_1, a_2, \dots, a_{K^2}  $

青木会选择一个格子改成 0，使得新总和最小 &#x20;

显然，青木会选择区域内**分数最大的那个格子**改成 0

所以青木操作后的总分 = 区域总和 - 区域内的最大值

高桥希望最大化这个值：

$$
\text{score}(R) = \text{sum}(R) - \max(R)
$$

其中 $  R  $ 是选定的 $  K \times K  $ 区域。

因此，问题转化为： &#x20;

在 $  N \times N  $ 的网格中，找到所有 $  K \times K  $ 子矩阵，计算其**总和减去最大值**，并取最大值。

预先计算每个 $  K \times K  $ 子矩阵的总和（二维前缀和）。

同时需要快速得到子矩阵的最大值。

求子矩阵最大值可以用： &#x20;

预处理每行的滑动窗口最大值（对每行用单调队列），然后对每列再套一次单调队列，得到每个 $  K \times K  $ 子矩阵的最大值。

**算法设计：**

1. 计算二维前缀和 `psum`，方便 O(1) 求子矩阵和。
2. 对每个行，计算长度为 $  K  $ 的滑动窗口最大值，得到 `row_max[i][j]` 表示第 i 行从 j 列开始的 K 个元素的最大值。
3. 对 `row_max` 的每一列，计算长度为 $  K  $ 的滑动窗口最大值，得到 `sub_max[i][j]` 表示左上角为 (i,j) 的 K×K 子矩阵的最大值。
4. 对于每个 (i,j) 子矩阵，计算和 = `psum[i+K-1][j+K-1] - psum[i-1][j+K-1] - psum[i+K-1][j-1] + psum[i-1][j-1]`，然后减去 `sub_max[i][j]`，取最大值。

```python title="二维前缀和+滑窗"
def solve():
    import sys
    input = sys.stdin.readline
    N, K = map(int, input().split())
    A = [[0] + list(map(int, input().split())) for _ in range(N)]
    # 补一行一列方便前缀和
    prefix = [[0] * (N + 1) for _ in range(N + 1)]
    for i in range(1, N + 1):
        row_sum = 0
        for j in range(1, N + 1):
            row_sum += A[i-1][j]
            prefix[i][j] = prefix[i-1][j] + row_sum

    # 子矩阵和函数
    def sub_sum(x1, y1, x2, y2):
        return prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1]

    # 第一步：每行滑动窗口最大值
    row_max = [[0] * (N - K + 2) for _ in range(N + 1)]
    from collections import deque
    for i in range(1, N + 1):
        q = deque()
        for j in range(1, N + 1):
            while q and A[i-1][q[-1]] <= A[i-1][j]:
                q.pop()
            q.append(j)
            if q[0] <= j - K:
                q.popleft()
            if j >= K:
                row_max[i][j - K + 1] = A[i-1][q[0]]

    # 第二步：对行方向做滑动窗口最大值
    sub_max = [[0] * (N - K + 2) for _ in range(N - K + 2)]
    for j in range(1, N - K + 2):
        q = deque()
        for i in range(1, N + 1):
            while q and row_max[q[-1]][j] <= row_max[i][j]:
                q.pop()
            q.append(i)
            if q[0] <= i - K:
                q.popleft()
            if i >= K:
                sub_max[i - K + 1][j] = row_max[q[0]][j]

    ans = 0
    for i in range(1, N - K + 2):
        for j in range(1, N - K + 2):
            total = sub_sum(i, j, i + K - 1, j + K - 1)
            mx = sub_max[i][j]
            ans = max(ans, total - mx)

    print(ans)
if __name__ == "__main__":
    solve()
```
