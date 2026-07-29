---
title: vp1080Div3-①B排序②状态机DP/贪心③数学
published: 2026-07-24
description: 1080Div3
image: ./cover.jpg
tags: [算法训练,Codeforces,Div3,vp]
category: 算法训练
draft: False
---


# vp1080Div3-①B排序②状态机DP/贪心③数学

[Dashboard - Codeforces Round 1080 (Div. 3) - Codeforces](https://codeforces.com/contest/2195 "Dashboard - Codeforces Round 1080 (Div. 3) - Codeforces")

### B-排序

#### 题目

给你一个长度为 $n$ $^{\text{∗}}$ 的排列 $a$ 。

您可以执行以下任意次数（可能为零）的操作：

- 选择索引 $i$ ( $1 \le i \le \frac{n}{2}$ ) $1 \le i \le \frac{n}{2}$ ），然后交换 $a_i$ 和 $a_{2i}$ 。

例如，当 $a=[1,4,2,3,5]$ 时，可以交换 $a_2$ 和 $a_4$ ，使其成为 $[1,3,2,4,5]$ ，但不能交换 $a_2$ 和 $a_3$ 。

请判断序列 $a$ 能否按递增顺序排序。

$^{\text{∗}}$ 长度为 $n$ 的排列是由 $n$ 个不同的整数组成的数组，这些整数从 $1$ 到 $n$ 按任意顺序排列。例如， $[2,3,1,5,4]$ 是一个排列，但 $[1,2,2]$ 不是一个排列（ $2$ 在数组中出现了两次）， $[1,3,4]$ 也不是一个排列（ $n=3$ ，但数组中有 $4$ ）。

#### 排序

实际上这不是一般的树，而是**多条独立的链**：

text

链1: 1 → 2 → 4 → 8 → 16 → ...链3: 3 → 6 → 12 → 24 → ...链5: 5 → 10 → 20 → ...链7: 7 → 14 → 28 → ...

每个奇数 `k` 对应一条链：`k, 2k, 4k, 8k, ...`

- 操作只能交换**同一链**上相邻的两个元素
- **不同链之间的元素永远无法交换**

通过多次相邻交换（冒泡），链内元素可以**任意排列**。

```python title="排序"
t = int(input())
for _ in range(t):
    n = int(input())
    a = [0] + list(map(int, input().split()))  # 1-indexed
    # 对每条链（起点为奇数）排序
    for start in range(1, n + 1, 2):
        # 收集链上的值和位置
        vals = []
        pos = []
        x = start
        while x <= n:
            pos.append(x)
            vals.append(a[x])
            x *= 2
        # 排序
        vals.sort()
        # 放回
        for p, v in zip(pos, vals):
            a[p] = v
    # 检查是否递增
    ok = True
    for i in range(2, n + 1):
        if a[i] < a[i - 1]:
            ok = False
            break
    print("YES" if ok else "NO")
```


### C-状态机DP/贪心

#### 题目

考虑下面的立方体 $D$ ，其中的数字 $x$ 和 $7-x$**位于相对的边上**。**位于对边**：

从 $1$ 到 $6$ 的整数序列 $b$如果满足以下条件，则称为掷骰子序列：

- 所有相邻元素对都位于立方体的相邻 $$ $^{\text{∗}} $$\$ 面上。

例如， $[1,4,2]$是一个掷骰子序列，而 $[3,4,6,3]$ 不是，因为 $3$ 和 $4$不在骰子的相邻面上。此外， $[2,2,4]$ 也不是掷骰子序列，因为 $2$ 和 $2$ 位于骰子的同一面（不相邻）。

给定一个从 $1$ 到 $6$ 的由 $n$个整数组成的序列 $a$，可以进行任意次数（可能为零）的以下运算。

- 选择索引 $1 \le i \le n$ 和整数 $1 \le x \le 6$。然后，将 $a  i$ 的值更改为 $x$ 。

请计算使 $a$ 成为掷骰子序列所需的最少次运算。

#### 贪心

掷骰子序列的**非法情况**只有两种：

1. **相同面相邻**：`a[i] == a[i-1]`
2. **对面相邻**：`a[i] + a[i-1] == 7`（对面：1-6, 2-5, 3-4）

遇到非法对 `(a[i-1], a[i])` 时，**必须修改其中一个**。

**最优策略**：修改 `a[i]`（而不是 `a[i-1]`），并且跳过 `a[i]`，让它和后面重新匹配。

**为什么修改 ****`a[i]`**** 更好？**

- `a[i-1]` 已经和 `a[i-2]` 匹配好了
- 修改 `a[i]` 只影响当前和下一对
- 跳过 `a[i]` 意味着把 `a[i]` 改成某个值，然后继续检查 `a[i+1]` 和 `a[i+2]`

修改 `a[i]` 后，`a[i]` 可以变成任意值：

- 可以让 `(a[i-1], a[i]')` 合法
- 可以让 `(a[i]', a[i+1])` 也合法（因为 `a[i]'` 可以选 4 种相邻面）

跳过 `a[i]` 后，检查 `(a[i+1], a[i+2])`，它们原本可能合法也可能不合法，互不影响。

```python title="贪心"
for _ in range(int(input())):
    n = int(input())
    a = list(map(int,input().split()))
    ans = 0
    i = 1
    while i < n:
        if a[i] + a[i-1] == 7 or a[i] == a[i-1]:
            ans += 1
            i += 2
        else:
            i += 1
    print(ans)
```


#### 状态机DP

每个面的相邻面 = 除了自己和对面外的 4 个面

```text title="状态定义"
dp[i][j] = 使前 i 个元素成为掷骰子序列，且第 i 个元素等于 j 的最小修改次数
```


```python title="初始化"
for j in range(1, 7):
    dp[1][j] = 1 if a[1] != j else 0
```


```python title="状态转移"
for i in range(2, n + 1):           # 遍历每个位置
    for j in range(1, 7):           # 当前元素取值 j
        for k in adj[j]:            # 前一个元素取值 k（必须与 j 相邻）
            cost = 1 if a[i] != j else 0
            dp[i][j] = min(dp[i][j], dp[i-1][k] + cost)
```


```python title="状态机DP"
for _ in range(int(input())):
    n = int(input())
    a = [0] + list(map(int, input().split()))
    adj = {
        1: [2, 3, 4, 5],
        2: [1, 3, 4, 6],
        3: [1, 2, 5, 6],
        4: [1, 2, 5, 6],
        5: [1, 3, 4, 6],
        6: [2, 3, 4, 5]
    }
    INF = 10 ** 9
    dp = [[INF] * 7 for _ in range(n + 1)]
    for j in range(1, 7):
        dp[1][j] = 1 if a[1] != j else 0
    for i in range(2, n + 1):
        for j in range(1, 7):
            for k in adj[j]:
                cost = 1 if a[i] != j else 0
                dp[i][j] = min(dp[i][j], dp[i - 1][k] + cost)
    ans = min(dp[n][1:])
    print(ans)
```


### D-数学

#### 题目

有一个由 $n$ 组成的隐藏序列 $a_1,a_2,\ldots,a_n$ 。**整数**（ $n \ge 2$ ）。保证所有 $1 \le i \le n$ 都是 $|a_i| \le 1000$ 。

让我们定义一个函数 $f(x)$ 如下：

$$
f(x)=\sum_{i=1}^n a_i \cdot |i-x|
$$

已知 $n$ 的值为 $f(1),f(2),\ldots,f(n)$ ，请确定 $a_1,a_2,\ldots,a_n$ 的值。

保证可以唯一确定 $a_1,a_2,\ldots,a_n$ 的值。

#### 数学

让我们绘制 $y=f(x)=\sum_{i=1}^n a_i \cdot |i-x|$ 的曲线图并观察斜率。 $a_i \cdot |i-x|$ 项与其他项有何不同？

在函数 $f(x)$ 中，唯一在 $x=i$ 处改变斜率的是 $a_i \cdot |i-x|$ 项。换句话说， $x=i$ 附近的斜率差与 $a_i$ 有关。让我们来计算一下这些斜率。

- $x=i$ 左侧的斜率为 $f(i)-f(i-1)$ ；
- 到 $x=i$ 右边的斜率是 $f(i+1)-f(i)$ ；
- 我们知道 $x=i$ 附近的斜率变化了 $2a_i$ ；
- 因此，当 $1 \lt i \lt n$ 时， $a_i = \frac{(f(i+1)-f(i))-(f(i)-f(i-1))}{2} = \frac{f(i+1)+f(i-1)-2f(i)}{2}$ 。

现在我们知道了 $a_2,a_3,\ldots,a_{n-1}$ 。那么 $a_1$ 和 $a_n$ 呢？让我们定义一个新函数如下。

$$
g(x)=a_1 \cdot |1-x| + a_n \cdot |n-x|
$$

从 $f(x)$ 中减去 $n-2$ 项，可以在 $\mathcal{O}(n)$ 时间内求出 $g(x)$ 的一个值。

现在请注意以下几点：

- $g(1) = (n-1) \cdot a_n$ ;
- $g(n) = (n-1) \cdot a_1$ .

因此， $a_1$ 和 $a_n$ 可以在 $\mathcal{O}(n)$ 时间内从 $g(1)$ 和 $g(n)$ 找到。

```python title="数学"
def solve(n, f):
    vec = [0] * n
    
    # 计算中间元素 a[1] 到 a[n-2]
    for i in range(1, n - 1):
        val = f[i + 1] + f[i - 1] - 2 * f[i]
        if val % 2 != 0:
            return []
        vec[i] = val // 2
        if abs(vec[i]) > 1000:
            return []
    
    # 计算 f(0) 和 f(n-1) 对应的值
    def g(j):
        w = f[j]
        for i in range(1, n - 1):
            w -= vec[i] * abs(i - j)
        return w
    
    g1 = g(0)
    gn = g(n - 1)
    
    if gn % (n - 1) != 0:
        return []
    if g1 % (n - 1) != 0:
        return []
    
    vec[0] = gn // (n - 1)
    vec[n - 1] = g1 // (n - 1)
    
    if abs(vec[0]) > 1000 or abs(vec[n - 1]) > 1000:
        return []
    
    return vec


t = int(input())
for _ in range(t):
    n = int(input())
    f = list(map(int, input().split()))
    a = solve(n, f)
    print(*a)
```
