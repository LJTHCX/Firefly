---
title: AWC67-完全背包/Floyd/bash尼莫博弈
published: 2026-05-12
description: AWC67题解-solve3-补BD
image: ./cover.jpg
tags: [算法训练,AtCoder,AWC]
category: 算法训练
draft: False
---

# AWC67

非常有意思的一场AWC，AB模拟难度挺高，C是完全背包板子，D是Floyd板子，E是bash尼莫博弈，质量在AWC中感觉算是很高的了

[Tasks - AtCoder Weekday Contest 0067 Beta](https://atcoder.jp/contests/awc0067/tasks "Tasks - AtCoder Weekday Contest 0067 Beta")

难度：

Easy: A

Mid: C、B、E

Hard: D
</details>
<details> <summary>A-模拟</summary>
按照题意给定的三种情况模拟即可

```python title="模拟"
n, q = map(int, input().split())
score = [0] * (n + 1)
for _ in range(q):
    op = list(map(int, input().split()))
    if op[0] == 1:
        _, a, b, v = op
        score[a] -= v
        score[b] += v
    elif op[0] == 2:
        _, x, l, r = op
        ans = 0
        for i in range(l, r + 1):
            if score[i] > score[x]:
                ans += 1
        print(ans)
    else:
        _, l, r, v = op
        for i in range(l, r + 1):
            score[i] += v
```

</details>
<details> <summary>B-Kadane</summary>

给定 N 天的盈亏数据序列，问题是为每个 k=1,2,…,N 找出 "前 k 天的连续子序列的最大和"

Kadane 算法（最大子数组和）生成 "每个前缀 1..k 的答案"。

- cur ：在当前位置结束的最大子序列和 

$$
icur=max(Bi, cur+Bi)
$$

- best ：到目前为止的最大区间和（ 1..i ）

$$
best=max(best, cur)
$$

```python title="Kadane"
n = int(input())
b = list(map(int, input().split()))
pre = [0] * (n + 1)
for i in range(n):
    pre[i+1] = pre[i] + b[i]
cur = b[0]
best = b[0]
print(best)
for i in range(1,n):
    x = b[i]
    cur = max(x,cur + x)
    if cur > best:
        best = cur
    print(best)

```

</details>
<details> <summary>C-完全背包</summary>
每个食品可以无限购买，目标是使总天数达到或超过D所需要的最小成本

```python title="完全背包"
n, d = map(int, input().split())
a = [tuple(map(int, input().split())) for _ in range(n)]
INF = 10**18
dp = [INF] * (d + 1)
dp[0] = 0
for c, f in a:
    for j in range(d + 1):
        if dp[j] == INF:
            continue
        nxt = min(d, j + f)
        dp[nxt] = min(dp[nxt], dp[j] + c)
print(dp[d])
```

</details>
<details> <summary>D-Floyd</summary>
正解貌似是Dijkstra，但是Floyd可做

```python title="Floyd"
n, m = map(int, input().split())
s = [0] + list(map(int, input().split()))
INF = 10 ** 15
dist = [[INF] * (n + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    dist[i][i] = 0
for _ in range(m):
    u, v, w = map(int, input().split())
    dist[u][v] = min(dist[u][v], w)
    dist[v][u] = min(dist[v][u], w)
# Floyd
for k in range(1, n + 1):
    for i in range(1, n + 1):
        if dist[i][k] == INF: continue
        for j in range(1, n + 1):
            nd = dist[i][k] + dist[k][j]
            if nd < dist[i][j]:
                dist[i][j] = nd
c = [0] * (n + 1)
for i in range(1, n + 1):
    cnt = 0
    for j in range(1, n + 1):
        if i == j: continue
        if dist[i][j] > s[i]:
            cnt += 1
    c[i] = cnt
ans = 0
for i in range(1, n + 1):
    for j in range(i + 1, n + 1):
        if dist[i][j] <= s[i] and dist[i][j] <= s[j]:
            if c[i] == c[j]:
                ans += 1
print(ans)
```

</details>
<details> <summary>E-bash尼莫博弈</summary>

尼莫博弈的变题，

```python title="bash尼莫博弈"
n,k = map(int, input().split())
a = list(map(int, input().split()))
xor_sum = 0
for x in a:
    xor_sum ^= (x % (k + 1))
if xor_sum != 0:
    print("Takahashi")
else:
    print("Aoki")
```


一系列尼莫博弈结论：

（1）尼莫博弈

- 有 n 堆硬币，每堆有若干枚
- 两人轮流行动，每次可以从任意一堆中拿走任意数量的硬币（至少1枚，最多全拿）
- **取走最后一枚硬币的人获胜**
- 小明先手，员工后手

问：员工(后手)能否获胜？

**如果所有堆的硬币数异或（XOR）结果为0，则后手必胜；否则先手必胜。**

```python title="尼莫游戏"
def f(a:list):
    xor_ = 0
    for x in a:
        xor_ ^= x
    if xor_ == 0:
        return 1 # 后手胜
    else:
        return 0 # 后手输
```


（2）反尼莫游戏

- 有 n 堆硬币，每堆若干枚
- 两人轮流，每次从某一堆中取至少 1 枚（可以全取）
- **取走最后一枚硬币的人输**
- 小明先手，员工后手

1. 如果所有堆都只有 1 枚硬币：
   - 堆数为奇数 → 先手必败，后手胜利
   - 堆数为偶数 → 先手必胜，后手失败
2. 如果存在至少一堆超过 1 枚硬币：
   - 所有堆异或为 0 → 先手必败，后手失败
   - 所有堆异或 ≠ 0 → 先手必胜，后手胜利

```python title="反尼莫游戏"
def f(a:list):
    n = len(a)
    all_ = all(x == 1 for x in a)
    if all_:
        if n % 2 == 1:
            return 1 # 后手胜
        else:
            return 0
    else:
        xor_ = 0
        for x in a:
            xor_ ^= x
        if xor_ == 0:
            return 1 # 后手胜
        else:
            return 0
```


（3）Bash模拟转尼莫模拟

- 有 n 堆石子，每堆有 aᵢ 个
- 两人轮流，每次可以从某一堆中取 1 到 k 个石子
- 取走最后一颗石子的人获胜
- 小明先手，员工后手

计算所有堆的 aᵢ mod (k+1) 的异或值：

- 如果异或值 = 0，则先手必败，后手（员工）必胜 → 输出 YES
- 如果异或值 ≠ 0，则先手必胜，后手（员工）必败 → 输出 NO

```python title="bash尼莫博弈"
def solve():
    T = int(input())
    for _ in range(T):
        n, k = map(int, input().split())
        piles = list(map(int, input().split()))
        # 计算所有堆对(k+1)取模后的异或值
        xor_sum = 0
        for x in piles:
            xor_sum ^= (x % (k + 1))
        if xor_sum == 0:
            print("YES")  # 先手必败 → 后手胜
        else:
            print("NO")  # 先手必胜 → 后手败
if __name__ == "__main__":
    solve()
```


（4）Bash博弈

- 有 n 元钱
- 两人轮流，每次可以拿 1 到 m 元
- **取走最后一元钱的人获胜**
- 小明先手，员工后手

```python title="bash博弈"
def solve():
    T = int(input())
    for _ in range(T):
        n, m = map(int, input().split())
        if n % (m + 1) == 0:
            print("YES")  # 先手必败 → 员工胜
        else:
            print("NO")   # 先手必胜 → 员工败

if __name__ == "__main__":
    solve()
```
