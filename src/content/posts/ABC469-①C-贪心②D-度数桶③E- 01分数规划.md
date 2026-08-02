---
title: "[算法训练] ABC469-①C-贪心②D-度数桶③E-01分数规划"
published: 2026-08-02
description: ABC469
image: ./cover.jpg
tags: [算法训练,AtCoder,ABC]
category: 算法训练
draft: False
---

# ABC469-①C-贪心②D-度数桶③E-01分数规划

[Tasks - AtCoder Beginner Contest 469](https://atcoder.jp/contests/abc469/tasks "Tasks - AtCoder Beginner Contest 469")

[https://www.wolai.com/7jscsCLsnKPcCP2RJy6Zjr](https://www.wolai.com/7jscsCLsnKPcCP2RJy6Zjr "https://www.wolai.com/7jscsCLsnKPcCP2RJy6Zjr")

### C-贪心

#### 题目

给你一个长度为 $N$ 的字符串 $S$ ，由 `o` 和 `x` 组成。
$N$ 个袋子排成一行，每个袋子里有一个甜点。
在第 $i$ 个袋子上，如果 $S$ 的第 $i$ 个字符是 "o"，则写下 "命中"；如果是 "x"，则写下 "未中"。
针对每个 $k=1,2,\dots,N$ 求解下面的问题。

> 高桥从排头的 $k$ 个袋子中取出第一个袋子，吃掉里面的糖果，并保留袋子。
> 然后，他尽可能多次重复下面的操作。
>
> \- 他扔掉手中一个标有 "击中 "的袋子，接过排在最前面的袋子，吃掉里面的糖果，并保留这个袋子。这个动作只能在该行还有一个袋子且他拿着一个标有 "中 "的袋子时进行。
>
> 找出他能吃掉的糖果数量。
> 注意，当他收到一个袋子时，该袋子就会从这一行中移除。

#### 贪心

初始拿 m 个袋子，最多吃到第 m 个 x 的位置。如果没有第 m 个 x，就全吃完。

```python title="贪心"
n = int(input())
s = input().strip()
res = [n] * (n + 1)
cnt = 0
for i in range(1, n + 1):
    if s[i - 1] == 'x':
        cnt += 1
    v = cnt
    if v <= n and res[v] == n and i >= v:
        res[v] = i
for k in range(1, n + 1):
    print(res[k])
```


### D-度数桶

#### 题目

有一盘有 $N$ 名棋手 $1,2,\dots,N$ 的棋局。
这盘棋采用两位棋手一对一对弈的形式。
在 $N$ 名棋手中举行了 $M$ 次比赛， $A_m$ 和 $B_m$ 两名棋手进入了 $m$ -次比赛的决赛。
求满足以下条件的整数 $x$ 和 $y$ 对的个数。

- $1 \leq x \lt y \leq N$
- 在每次比赛中， $x$ 和 $y$ 中至少有一名棋手晋级决赛。

#### 度数桶

设 `deg[i]` = 玩家 i 参加的场次数。

对于一对 `(x, y)`，它们覆盖的比赛数 = `deg[x] + deg[y] - cnt_xy`

其中 `cnt_xy` = x 和 y **共同参加**的比赛数。

合法条件：覆盖所有 M 场 → `deg[x] + deg[y] - cnt_xy = M`

移项：`deg[y] - cnt_xy = M - deg[x]`

令 `need = M - deg[x]`，则要求 `deg[y] - cnt_xy = need`。

对于每个 x：

- `need = M - deg[x]`
- 如果 `0 <= need <= max_deg`：

  **非邻居**：从 `by_deg[need]` 中找 y，检查 `y > x` 且 `y` 不是 `x` 的邻居。

  **邻居**：遍历 `adj[x]`，对每个邻居 `y`，检查 `deg[y] - cnt_xy == need`。

```python title="度数桶"
from collections import defaultdict
n, m = map(int, input().split())
d = [0] * (n + 1)
ad = [defaultdict(int) for _ in range(n + 1)]
for _ in range(m):
    u, v = map(int, input().split())
    d[u] += 1
    d[v] += 1
    ad[u][v] += 1
    ad[v][u] += 1
max_d = max(d)
by_d = [[] for _ in range(max_d + 1)]
for i in range(1, n + 1):
    by_d[d[i]].append(i)
# print(by_d)
ans = 0
for x in range(1, n + 1):
    need = m - d[x]
    if 0 <= need <= max_d:
        for y in by_d[need]:
            if y > x and y not in ad[x]:
                ans += 1
        for y, cnt in ad[x].items():
            if y > x and d[y] - cnt == need:
                ans += 1
print(ans)
```


### E-**01分数规划**

#### 题目

给你一个长度为 $N$ 的字符串 $S$ ，它由 `o` 和 `x` 组成。
保证 $S$ 中至少有 $K$ 次出现 `o`。
高桥玩了某个游戏 $N$ 次。
在第 $i$ 次对局中，如果 $S$ 的第 $i$ 个字符是 "o"，他就赢了，如果是 "x"，他就输了。

高桥选择了一对满足以下条件的整数 $l$ 和 $r$ 。

- $1 \leq l \leq r \leq N$
- 他在从 $l$ 之三到 $r$ 之三的对局中至少赢了 $K$ 次。

求从 $l$ （之三）到 $r$ （之三）的对局中胜率的最大可能值。

#### 01分数规划

问题等价于：选区间 `[l, r]`，要求 `o` 的数量 ≥ K，最大化 `o的数量 / 区间长度`

二分胜率 `mid`，判定是否存在满足条件的区间。

条件：`o的数量 / 区间长度 ≥ mid`

⟺ `o的数量 - mid × 区间长度 ≥ 0`

***

每个位置：

- `o` → `1 - mid`
- `x` → `-mid`

`sum[i]` = 前 i 个位置的权值和。

条件变为：存在 `l < r`，使得 `sum[r] - sum[l-1] ≥ 0` 且 `cnt[r] - cnt[l-1] ≥ K`。

***

遍历右端点 `r`，维护满足 `cnt` 条件的最小 `sum[l-1]`。

用数组 `mn[t]` 记录 `cnt = t` 时的最小 `sum` 值。

对于每个 `r`：

- 如果 `cnt[r] ≥ K`，可以取 `t = cnt[r] - K` 对应的最小 `sum`
- 维护 `now = min(mn[0..cnt[r]-K])`

判断 `sum[r] ≥ now`。

***

`mn[cnt[i]]` 只在**遇到 ****`o`**** 时才可能更新**（因为 `cnt` 变化），所以可以用滚动维护最小值。

```python title="01分数规划"
n, k = map(int, input().split())
s = input().strip()
s = ' ' + s  # 1-indexed

cnt = [0] * (n + 1)
for i in range(1, n + 1):
    cnt[i] = cnt[i - 1] + (1 if s[i] == 'o' else 0)

def check(mid: float) -> bool:
    sum_val = 0.0
    now = 1e18
    mn = [1e18] * (n + 1)
    mn[0] = 0.0

    for i in range(1, n + 1):
        if s[i] == 'o':
            sum_val += 1.0 - mid
            if cnt[i] >= k:
                now = min(now, mn[cnt[i] - k])
        else:
            sum_val -= mid

        if sum_val >= now:
            return True

        mn[cnt[i]] = min(mn[cnt[i]], sum_val)

    return False

l, r = -0.1, 1.1
for _ in range(50):
    mid = (l + r) / 2.0
    if check(mid):
        l = mid
    else:
        r = mid

print(f"{l:.8f}")
```
