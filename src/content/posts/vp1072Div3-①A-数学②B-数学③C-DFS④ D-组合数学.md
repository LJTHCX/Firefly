---
title: "[算法训练] vp1072Div3-①A-数学②B-数学③C-DFS④D-组合数学"
published: 2026-08-01
description: 1072Div3
image: ./cover.jpg
tags: [算法训练,Codeforces,Div3,vp]
category: 算法训练
draft: False
---

# vp1072Div3-①A-数学②B-数学③C-DFS④D-组合数学

[Dashboard - Codeforces Round 1072 (Div. 3) - Codeforces](https://codeforces.com/contest/2184 "Dashboard - Codeforces Round 1072 (Div. 3) - Codeforces")

### A-数学

#### 题目

现在，Codeforces 历史上最大规模的社会实验正在进行，有 $n$ 人参与其中。他们需要组成由 $2-3$ 人组成的团队，然后每个团队从两个文明中选择一个参与社会实验。

这个社会实验的组织者想知道两种文明的人数可能相差多少？请找出可能的最小差异。

#### 数学

把任意数量的两人一组加到两人一组，就可以得到任意偶数的人数。同样的方法也可以用在 $3$ 人的群体中；因此，除了 $1$ 这个数字之外，可以得到任何奇数的人数。也就是说，除了 $1$ 之外，文明的规模可以是任何非负数。

这意味着，如果我们将 $n$ 尽可能平均地分割成两个文明（如果 $n$ 是偶数，则分割到 $\frac{n}{2}$ ；如果 $n$ 是奇数，则分割到 $\frac{n-1}{2}$ 和 $\frac{n+1}{2}$ ），并且大小都不等于 $1$ ，那么这样的分割是可以实现的。需要注意的是，只有当 $n$ 等于 $2$ 或 $3$ 时，这样的分割才能达到 $1$ 的大小。因此，如果 $n \le 3$ ，答案为 $n$ ；否则，答案为 $n \mod 2$ 。

```python title="数学"
for _ in range(int(input())):
    n = int(input())
    if n == 1:
        print(1)
    elif n == 2:
        print(2)
    elif n == 3:
        print(3)
    elif n % 2 == 0:
        print(0)
    else:
        print(1)
```


### B-数学

#### 题目

瓦迪姆的沙漏可以测量 $s$ 分钟。他把沙漏翻转过来，时间就开始了。每隔 $k$ 分钟，瓦迪姆会再次翻转沙漏。即使沙子仍在下落，他也会这样做。此外，如果沙子已经落完，但还剩几分钟，瓦迪姆也会等待所需的时间，然后才翻转沙漏。每次翻转都是即时完成的。

然而，瓦迪姆需要在 $m$ 分钟后出门办事，他将停止翻转沙漏（如果瓦迪姆需要在最后一分钟翻转沙漏，他将翻转沙漏）。求在瓦迪姆离开后，沙子会继续下落多少分钟？

#### 数学

我们暂时不考虑 $m$ 。让我们注意两种情况：

1. 如果是 $s \gt k$ ，那么在最初的 $k$ 分钟里，会有 $k$ 分钟的沙子掉出来，沙漏的上半部分会剩下 $s-k$ 分钟的沙子。第一次翻转后，沙漏上半部分将有 $k$ 分钟的沙子。这意味着，在最初的 $2 \cdot k$ 分钟里，上半部分的沙子将所剩无几。由此，我们可以得出结论：每隔 $2 \cdot k$ 分钟，上半部分的沙子数量将保持不变。
2. 如果 $s \le k$ ，那么在最初的 $k$ 分钟内， $s$ 分钟内的沙子将全部掉落，上半部分将什么也不剩。由此，我们可以得出结论：每隔 $k$ 分钟，上半部分的沙子数量将保持不变。

现在让我们回到 $m$ 。我们将考虑这两种情况：

1. 如果是 $s \gt k$ ，则将 $m$ 的值替换为 $m \mod {2 \cdot k}$ 。如果是 $0 \le m \le k-1$ ，那么上半部分将剩下 $s - m$ 分钟的沙子，如果是 $k \le m \le 2\cdot k - 1$ ，那么上半部分将剩下 $k - (m - k)$ 分钟的沙子。
2. 如果 $s \le k$ ，则将 $m$ 的值替换为 $m \mod {k}$ 。如果 $0 \le m \lt s$ ，那么上半部分将剩下 $s - m$ 分钟的沙子；否则，将剩下 $0$ 分钟的沙子。

```python title="数学"
for _ in range(int(input())):
    s, k, m = map(int, input().split())
    n = m // k
    r = m % k
    if s < k:
        ans = max(s - r, 0)
    else:
        if s == k:
            u_n = s
        else:
            u_n = s if n % 2 == 0 else k
        ans = max(u_n - r, 0)
    print(ans)
```


### C-DFS

#### 题目

安德烈有一大堆 $n$ 个苹果。他可以把这堆苹果分成两小堆：如果这堆苹果有 $x$ 个，那么他将得到 $\lfloor \frac{x}{2} \rfloor$ $^{\text{∗}}$ 个和 $\lceil \frac{x}{2} \rceil$ $^{\text{†}}$ 个。这个分割过程需要安德烈花费 $1$ 分钟。

安德烈想吃 $k$ 个苹果，但他根本不想数苹果。因此，他想得到一堆正好有 $k$ 个苹果的苹果堆。请判断是否可以通过分堆来实现这一目标。如果可能，求安德烈得到一堆正好有 $k$ 个苹果所需的最短时间。

$^{\text{∗}}$ $\lfloor \frac{x}{2} \rfloor$ - 最大整数 $\le \frac{x}{2}$ 。

$^{\text{†}}$ $\lceil \frac{x}{2} \rceil$ - 最小整数 $\ge \frac{x}{2}$ 。

#### DFS

按照题意DFS即可

```python title="DFS"
for _ in range(int(input())):
    n, k = map(int, input().split())
    if k > n:
        print(-1)
        continue
    ans = float('inf')
    visited = set()
    def dfs(x, depth):
        global ans
        if x in visited or depth >= ans:
            return
        visited.add(x)
        if x == k:
            ans = min(ans, depth)
            return
        if x < k:
            return
        left = x // 2
        right = x - left
        dfs(left, depth + 1)
        dfs(right, depth + 1)
    dfs(n, 0)
    print(ans if ans != float('inf') else -1)
```


### D-组合数学

#### 题目

- 初始数字从 1 到 n，其中 n = 2^d
- 爱丽丝每次操作：
  - 偶数 → 除以 2
  - 奇数 → 减 1
- 每次操作后收到反馈 x，表示当前数字能被 2^x 整除但不能被 2^{x+1} 整除
- 爱丽丝的最优策略：偶数除 2，奇数减 1
- 游戏在 k 步内结束则爱丽丝赢
- 求有多少个初始数字，爱丽丝**不能**在 k 步内赢

#### 组合数学

初始数字 a，爱丽丝每一步：

- 偶数 → 除以 2
- 奇数 → 减 1

**例子**：a = 11（二进制 `1011`）

```text 
11 是奇数，减 1 → 10
10 是偶数，除 2 → 5
5  是奇数，减 1 → 4
4  是偶数，除 2 → 2
2  是偶数，除 2 → 1
1  是奇数，减 1 → 0（赢）
```


共 6 步。

***

观察二进制变化：

```text 
11 = 1011
10 = 1010  (减1：最后一个1变0)
5  = 101   (除2：去掉末尾0)
4  = 100   (减1)
2  = 10    (除2)
1  = 1     (除2)
0          (减1)
```


规律：

- **0**（除前导零）：1 步（除 2，删掉这个 0）
- **1**（除最高位）：2 步（减 1 把 1 变 0，除 2 删掉这个 0）
- **最高位的 1**：最后减 1，1 步结束

***

设数字的二进制表示：

- `maxBit`：最高位索引（0-indexed）
- `cntBit`：1 的个数

| 二进制位   | 步数 | 数量                      |
| ------ | -- | ----------------------- |
| 最高位的 1 | 1  | 1 个                     |
| 其余 1   | 2  | cntBit - 1 个            |
| 0（非前导） | 1  | maxBit - (cntBit - 1) 个 |

总步数：

```text 
= 1 + 2×(cntBit-1) + 1×(maxBit - (cntBit-1))
= 1 + 2cntBit - 2 + maxBit - cntBit + 1
= maxBit + cntBit
```


***

爱丽丝不能赢 ⟺ 需要超过 k 步 ⟺ `maxBit + cntBit > k`

***

n = 2^d，所以 d ≤ 30（因为 2^30 ≈ 10^9）。

数字 a 的范围：1 ≤ a ≤ n。

***

**步骤 1**：枚举 `maxBit`（0 到 d-1）

对于 `1 ≤ a < 2^d`，`maxBit` 可以取 0 到 d-1。

**步骤 2**：枚举 `cntBit`（1 到 maxBit+1）

至少有最高位的 1，所以 cntBit ≥ 1。最多所有位都是 1，所以 cntBit ≤ maxBit+1。

**步骤 3**：判断

如果 `maxBit + cntBit > k`，则这种数字合法。

**步骤 4**：计数

最高位固定为 1。在剩余的 `maxBit` 个低位中，选 `cntBit - 1` 个放 1。

方案数 = `C(maxBit, cntBit - 1)`

***

当 a = n = 2^d 时：

- maxBit = d
- cntBit = 1
- 步数 = d + 1

如果 d + 1 > k，答案 +1。

***

用 DP 预处理组合数：

```python 
dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
```


即：`C(i, j) = C(i-1, j-1) + C(i-1, j)`

***

```python title="组合数学"
# 预处理组合数 C[n][k]
C = [[0] * 31 for _ in range(31)]
for i in range(31):
    C[i][0] = C[i][i] = 1
    for j in range(1, i):
        C[i][j] = C[i-1][j-1] + C[i-1][j]
t = int(input())
for _ in range(t):
    n, k = map(int, input().split())
    d = 0
    while (1 << d) < n:
        d += 1
    ans = 0
    # 1 ≤ a < n
    for maxBit in range(d):
        for cntBit in range(1, maxBit + 2):
            if maxBit + cntBit > k:
                ans += C[maxBit][cntBit - 1]
    # a = n
    if d + 1 > k:
        ans += 1
    print(ans)
```
