---
title: "[算法训练] 牛客周赛149①B-构造②C-构造③D-数学+前缀和+二分④E-状态机DP"
published: 2026-06-24
description: 牛客周赛149
image: ./cover.jpg
tags: [算法训练,nowcoder周赛]
category: 算法训练
draft: False
---

# 牛客周赛149①B-构造②C-构造③D-数学+前缀和+二分④E-状态机 DP

[更好的阅读体验](https://www.wolai.com/6zrQJShsu9zArN9PPL9Wod "更好的阅读体验")

[牛客竞赛\_ACM/NOI/CSP/CCPC/ICPC算法编程高难度练习赛\_牛客竞赛OJ](https://ac.nowcoder.com/acm/contest/136720 "牛客竞赛_ACM/NOI/CSP/CCPC/ICPC算法编程高难度练习赛_牛客竞赛OJ")

### B-构造

#### 问题

构造一个长度为n的仅包含0,1的字符串s，其中0和1的数量相等，且有尽可能多的i满足`si = s(i+1)`

#### 题解

显然的如果n为奇数则无法构造

对于偶数n，只需0\*n//2 + 1\*n//2即可

```python title="构造"
n = int(input())
if n % 2 == 1:
    print(-1)
else:
    k = n // 2
    print('0' * k + '1' * k)
```


### C-构造

#### 问题

构造一个 n×m 的矩阵，满足：

1. 所有元素为正整数。
2. 任意相邻（四连通）的元素不相等。
3. 所有元素之和恰好为 k。

#### 题解

为了使总和尽可能小，我们让一种格子放 `1`，另一种放 `2`（最小的两个不同正整数）。

- 总格子数：`tot = n * m`
- 根据 `(i+j)` 的奇偶性，`(i+j)%2==0` 的格子数为 `cnt2`，`(i+j)%2==1` 的格子数为 `cnt1`。
- 令较多的一类格子放 `2`（为了使总和尽量小，应该少放大的数，但这里为了后期加值方便，把多的放2，少的放1），则：
  - `cnt2 = (tot + 1) // 2` （较多的一类）
  - `cnt1 = tot // 2` （较少的一类）
- 最小总和：`min_sum = cnt2 * 2 + cnt1 * 1`

如果给定的 kk 比这个最小总和还小，则无法构造，输出 `NO`。

否则，我们一定能通过给某个格子加差值来达到 k。

`diff = k - min_sum` 时，可以把这 `diff` 全部加到某一个格子上（例如第一个格子），使其数值增大 `diff`。这样做：

- 不会破坏“相邻不等”的性质，因为只改了一个格子，且它的值变大了，本来就和邻居不同，现在更不同。
- 所有格子仍是正整数。
- 总和正好是 `min_sum + diff = k`。

```python title="构造"
n, m, k = map(int, input().split())
tot = n * m
cnt2 = (tot + 1) // 2
cnt1 = tot // 2
min_sum = cnt2 * 2 + cnt1 * 1

if k < min_sum:
    print("NO")
else:
    print("YES")
    diff = k - min_sum
    fir = True
    for i in range(n):
        row = []
        for j in range(m):
            val = 2 if (i + j) % 2 == 0 else 1
            if fir:
                val += diff
                fir = False
            row.append(str(val))
        print(' '.join(row))
```


### D-数学+前缀和+二分

#### 题目

从一个正整数数组中选一个连续子数组，使得：

- 子数组的和为 S
- 剩余部分的和为 tot−S
- 乘积 S×(tot−S) 最大

#### 题解

显然所求问题为二次函数优化问题，最值在S = tot//2处取得

- 记前缀和数组 `pref`，其中 `pref[i]` 是前 `i` 个元素的和（`pref[0]=0`）。
- 任意子数组的和 = `pref[r] - pref[l]`，其中 `l < r`。
- 目标：找一个 `pref[r] - pref[l]` 最接近 `tot/2`。

这等价于：固定右端点 `pref[r]`，在之前的前缀和中找一个 `pref[l]`，使得差值最接近目标 `t = tot/2`。

即对于每个 `pref[r]`，我们要找 `pref[l]` 最接近 `pref[r] - t` 的值。

1. 计算总 `tot`，目标 `t = tot / 2.0`。
2. 初始化前缀和列表 `pref = [0]`。
3. 遍历原数组，累加得到当前前缀和 `pre`。
4. 在已有的前缀和中用 `bisect_left` 找到最接近 `pre - t` 的位置，检查该位置和前一个位置对应的子数组和，更新最接近 `t` 的 `best_sum`。
5. 将当前前缀和加入 `pref` 列表（自动保持有序，因为数组元素为正，前缀和递增）。
6. 最后答案 = `best_sum * (tot - best_sum) % MOD`。

```python title="数学+前缀和+二分"
import bisect
MOD = 998244353
n = int(input())
a = list(map(int, input().split()))
tot = sum(a)
t = tot / 2.0
pre = 0
pref = [0]
best_sum = 0
for x in a:
    pre += x
    idx = bisect.bisect_left(pref, pre - t)
    pref.append(pre)
    for i in (idx - 1, idx):
        if 0 <= i < len(pref):
            sub_sum = pre - pref[i]
            if abs(sub_sum - t) < abs(best_sum - t):
                best_sum = sub_sum
print(best_sum * (tot - best_sum) % MOD)

```


### E-**状态机 DP**

#### 问题

给定一个 2×n2×n 的矩阵，元素为 `0`、`1` 或 `?`。要将所有 `?` 替换为 `0` 或 `1`，使得矩阵成为“好矩阵”：

- **好矩阵定义**：任意一个 2×2 的子区域内的四个元素**不全相同**。

求所有可能的填充方案数，对 998244353 取模。

#### 题解

转移规则：

- `new_dp[0] = dp[1] + dp[2] + dp[3]` （不能从 0 来）
- `new_dp[1] = dp[0] + dp[1] + dp[2] + dp[3]` （都能来）
- `new_dp[2] = dp[0] + dp[1] + dp[2] + dp[3]` （都能来）
- `new_dp[3] = dp[0] + dp[1] + dp[2]` （不能从 3 来）

1. **状态定义** &#x20;

   `dp[s]` 表示处理到当前列，且当前列状态为 `s` 时的方案数。
2. **初始化** &#x20;

   第 0 列：遍历 4 种状态，若与给定字符不冲突，则 `dp[s] = 1`。
3. **状态转移** &#x20;

   从第 1 列到第 n-1 列，根据当前列的可能状态和上一列的合法转移计算新的 `dp` 数组。
4. **预处理合法状态** &#x20;

   用 `can[i][s]` 表示第 `i` 列能否取状态 `s`（即与输入给定的字符一致）。
5. **答案** &#x20;

   最终答案是 `sum(dp[0..3]) % MOD`。

```python title="状态机DP"
MOD = 998244353
n = int(input())
row1 = input().strip()
row2 = input().strip()
can = [[0] * 4 for _ in range(n)]
for i in range(n):
    for s in range(4):
        val1 = (s >> 1) & 1
        val2 = s & 1
        ok = True
        if row1[i] != '?' and int(row1[i]) != val1:
            ok = False
        if row2[i] != '?' and int(row2[i]) != val2:
            ok = False
        if ok:
            can[i][s] = 1
dp = [0, 0, 0, 0]
for s in range(4):
    if can[0][s]:
        dp[s] = 1
for i in range(1, n):
    new_dp = [0, 0, 0, 0]
    if can[i][0]:
        new_dp[0] = (dp[1] + dp[2] + dp[3]) % MOD
    if can[i][1]:
        new_dp[1] = (dp[0] + dp[1] + dp[2] + dp[3]) % MOD
    if can[i][2]:
        new_dp[2] = (dp[0] + dp[1] + dp[2] + dp[3]) % MOD
    if can[i][3]:
        new_dp[3] = (dp[0] + dp[1] + dp[2]) % MOD
    dp = new_dp
ans = sum(dp) % MOD
print(ans)

```
