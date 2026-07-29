---
title: "[算法训练] 185双周赛-①Q1-构造②Q2-差分+贪心③Q3-DFS④Q4-数位DP"
published: 2026-06-21
description: LeetCode185双周赛
image: ./cover.jpg
tags: [算法训练,LeetCode周赛]
category: 算法训练
draft: False
---


# 185双周赛①Q1-构造②Q2-差分+贪心③Q3-DFS④Q4-数位DP

[更好的阅读体验](https://www.wolai.com/agypJiPVbaobVzY6eBFLHi "更好的阅读体验")

### Q1-构造

#### 题目

给你两个整数 `m` 和 `n`，分别表示网格的行数和列数。

请你构造 **任意** 一个只包含字符 `'.'` 和 `'#'` 的 `m x n` 网格，其中：

- `'.'` 表示空单元格。
- `'#'` 表示障碍物单元格。

**有效路径** 是满足以下条件的空单元格序列：

- 从左上角单元格 `(0, 0)` 开始。
- 在右下角单元格 `(m - 1, n - 1)` 结束。
- 只能向：
  - 右移动，从 `(i, j)` 到 `(i, j + 1)`，或者
  - 下移动，从 `(i, j)` 到 `(i + 1, j)`。

返回任意一个从左上角到右下角 **恰好只有一条有效路径** 的网格。

#### 题解

一个倒L型的路径即可

```python title="构造"
class Solution:
    def createGrid(self, m: int, n: int) -> list[str]:
        g = [['#']*n for _ in range(m)]
        for i in range(n):
            g[0][i] = '.'
        for j in range(m):
            g[j][n-1] = '.'
        return [''.join(r) for r in g]
```


### Q2-差分+贪心

#### 题目

给你一个长度为 `n` 的整数数组 `lights`，表示一条路上从 0 到 `n - 1`有 `n` 个位置。

对于每个位置 `i`：

- 如果 `lights[i] = v`，其中 `v > 0`，则在位置 `i` 有一个正常工作的灯泡，它**照亮** 从 `max(0, i - v)` 到 `min(n - 1, i + v)`（包含边界）的每个位置。
- 如果 `lights[i] = 0`，则在位置 `i` 没有正常工作的灯泡。

如果一个位置被**至少** 一个正常工作的灯泡照亮，则该位置是**可见的** 。

你可以在**任意** 位置安装**额外的** 灯泡。每个安装在位置 `j` 的额外灯泡将**照亮**从 `max(0, j - 1)` 到 `min(n - 1, j + 1)`（包含边界）的位置。

返回使路上**每个** 位置都可见所需安装的最少额外灯泡数量。

#### 差分+贪心

对灯泡的位置进行差分，遍历差分数组的维护一个布尔型数组记录当前位置是否被照明

遍历后，对未被照明的位置贪心的在位置`i+1`安放灯泡`for j in range(i, min(n, i + 3))`维护数组记录答案即可

```python title="差分+贪心"
class Solution:
    def minLights(self, a: list[int]) -> int:
        n = len(a)
        diff = [0] * (n + 1)
        for i, v in enumerate(a):
            if v > 0:
                l = max(0, i - v)
                r = min(n - 1, i + v)
                diff[l] += 1
                diff[r + 1] -= 1
        cur = 0
        ok = [False] * n
        for i in range(n):
            cur += diff[i]
            if cur > 0:
                ok[i] = True
        ans = 0
        i = 0
        while i < n:
            if not ok[i]:
                ans += 1
                for j in range(i, min(n, i + 3)):
                    ok[j] = True
            i += 1
        return ans

```


### Q3-DFS

#### 题目

给你一个整数 `n`，表示项目中的任务数量，编号从 0 到 `n - 1`。这些任务以任务 0 为根的**树** 的形式连接。这由一个长度为 `n - 1` 的二维整数数组 `edges` 表示，其中 `edges[i] = [ui, vi]` 表示任务 `ui` 是任务 `vi` 的父节点。

同时给你一个长度为 `n` 的数组 `baseTime`，其中 `baseTime[i]` 表示完成任务 `i` 所需的时间。

每个任务的 **完成时间** 计算如下：

- 叶子任务：完成时间为 `baseTime[i]`。
- 非叶子任务：
  - 令`earliest` 为其子节点中的 **最小** 完成时间，`latest` 为其子节点中的 **最大** 完成时间。
  - 令`ownDuration` 为 `(latest - earliest) + baseTime[i]`。
  - 任务 `i` 的完成时间为 `latest + ownDuration`。

返回根任务 0 的完成时间。

#### DFS

按照题意模拟即可

```python title="DFS"
class Solution:
    def finishTime(self, n: int, edges: list[list[int]], baseTime: list[int]) -> int:
        g = [[] for _ in range(n)]
        for x, y in edges:
            g[x].append(y)
        def dfs(x: int) -> int:
            if not g[x]:
                return baseTime[x]
            earliest = inf
            latest = 0
            for y in g[x]:
                t = dfs(y)
                earliest = min(earliest, t)
                latest = max(latest, t)
            return latest * 2 - earliest + baseTime[x]
        return dfs(0)
```


### Q4-数位DP

#### 题目

给你三个整数 `l`，`r` 和 `k`。

如果一个数字中每一对 **相邻** 数位之间的 **绝对差** 都 **至多** 为 `k`，则称该数字为 **好数**。

返回在范围 `[l, r]`（包含边界）内的 **好** 整数的数量。

值 `x` 和 `y` 之间的 **绝对差** 定义为 `abs(x - y)`。

#### 数位DP

```python title="数位DP"
class Solution:
    def goodIntegers(self, l: int, r: int, k: int) -> int:
        def cnt(x):
            if x < 0:
                return 0
            s = str(x)
            n = len(s)

            @lru_cache(None)
            def dfs(pos, pre, t, l):
                if pos == n:
                    return 1
                lim = int(s[pos]) if t else 9
                tot = 0
                for d in range(lim + 1):
                    if l and d == 0:
                        tot += dfs(pos + 1, -1, t and d == lim, True)
                    elif pre == -1:
                        tot += dfs(pos + 1, d, t and d == lim, False)
                    elif abs(d - pre) <= k:
                        tot += dfs(pos + 1, d, t and d == lim, False)
                return tot

            return dfs(0, -1, True, True)

        return cnt(r) - cnt(l - 1)

```
