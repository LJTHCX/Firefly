---
title: ABC468-①C-DFS/托康展开②D-中心扩展③E-贡献法+逆元+前缀和
published: 2026-07-25
description: ABC468
image: ./cover.jpg
tags: [训练,AtCoder,ABC]
category: AtCoder
draft: False
---

# ABC468-①C-DFS/托康展开②D-中心扩展③E-贡献法+逆元+前缀和

[Tasks - AtCoder Beginner Contest 468](https://atcoder.jp/contests/abc468/tasks "Tasks - AtCoder Beginner Contest 468")

[https://www.wolai.com/3tQDqVUDZjQfGd14L8ppmE](https://www.wolai.com/3tQDqVUDZjQfGd14L8ppmE "https://www.wolai.com/3tQDqVUDZjQfGd14L8ppmE")

### C-DFS/康托展开

#### 题目

给你一个整数 $N$ 和整数序列 $P=(P_1,P_2,\ldots, P_N)$ 和 $Q=(Q_1,Q_2,\ldots,Q_N)$ ，每个序列都是 $(1,2,\ldots,N)$ 的排列。

请问有多少个整数序列是 $(1,2,\ldots,N)$ 的置换序列，且其序数大于 $P$ ，小于 $Q$ 。

什么是整数序列的词序？

对于整数序列 $S = (S_1,S_2,\ldots,S_{|S|})$ 和 $T = (T_1,T_2,\ldots,T_{|T|})$ ，如果下面的 $1.$ 或 $2.$ 成立，我们就说 $S$ 在词典上**小于** $T$ 。这里， $|S|, |T|$ 分别表示 $S, T$ 的长度。

1. $|S| \lt |T|$ 和 $(S_1,S_2,\ldots,S_{|S|}) = (T_1,T_2,\ldots,T_{|S|})$ 。
2. 存在一个整数 $1 \leq i \leq \min\lbrace |S|, |T| \rbrace$ ，使得以下两个条件都成立。
   - $(S_1,S_2,\ldots,S_{i-1}) = (T_1,T_2,\ldots,T_{i-1})$
   - $S_i$ 在数值上小于 $T_i$ 。

#### DFS

排列型DFS

```python title="DFS-py"
def dfs(n, p, q):
    used = [False] * (n + 1)
    ans = 0
    def dfs(pos, cur):
        nonlocal ans
        if pos == n:
            if p < cur < q:
                ans += 1
            return
        for num in range(1, n + 1):
            if not used[num]:
                if cur and cur < p[:pos] and cur > q[:pos]:
                    continue
                used[num] = True
                cur.append(num)
                dfs(pos + 1, cur)
                cur.pop()
                used[num] = False

    dfs(0, [])
    return ans
n = int(input())
p = list(map(int,input().split()))
q = list(map(int,input().split()))
print(dfs(n,p,q))
```


```c++ title="DFS-c++"
#include <bits/stdc++.h>
using namespace std;

int dfs(int n, vector<int>& p, vector<int>& q) {
    vector<bool> used(n + 1, false);
    int ans = 0;

    function<void(int, vector<int>&)> dfs_impl = [&](int pos, vector<int>& cur) {
        if (pos == n) {
            if (cur > p && cur < q) {
                ans++;
            }
            return;
        }
        for (int num = 1; num <= n; num++) {
            if (!used[num]) {
                // 剪枝：如果前缀已经不可能在区间内
                bool prefix_ok = true;
                if (pos > 0) {
                    bool less_than_p = true, greater_than_q = true;
                    for (int k = 0; k < pos; k++) {
                        if (cur[k] >= p[k]) less_than_p = false;
                        if (cur[k] <= q[k]) greater_than_q = false;
                    }
                    if (less_than_p && greater_than_q) {
                        prefix_ok = false;
                    }
                }
                if (!prefix_ok) continue;

                used[num] = true;
                cur.push_back(num);
                dfs_impl(pos + 1, cur);
                cur.pop_back();
                used[num] = false;
            }
        }
    };

    vector<int> cur;
    dfs_impl(0, cur);
    return ans;
}

int main() {
    int n;
    cin >> n;
    vector<int> p(n), q(n);
    for (int i = 0; i < n; i++) cin >> p[i];
    for (int i = 0; i < n; i++) cin >> q[i];

    cout << dfs(n, p, q) << endl;
    return 0;
}
```


#### 库函数

使用`permutations`直接生成全排列

```python title="permutations"
from itertools import permutations
n = int(input())
p = list(map(int, input().split()))
q = list(map(int, input().split()))
ans = 0
for a in permutations([i + 1 for i in range(n)]):
    ans += p < list(a) < q
print(ans)

```


#### 康托展开

**定义**

康托展开是一个**双射**，它将一个排列映射为一个整数，该整数表示该排列在所有排列中的**字典序排名**（从 0 开始）。

$$
\text{rank} \in [0, N! - 1]
$$

***

对于一个排列 $X = (X_1, X_2, \dots, X_N)$：

$$
\text{rank}(X) = \sum_{i=1}^{N} a_i \times (N - i)!
$$

其中 $a_i$ = **在 X\[i] 后面出现的、比 X\[i] 小的数的个数**。

等价于：**在当前未使用的数字中，有多少个比 X\[i] 小的数**。

***

```python title="康托展开"
def cantor_rank(X):
    N = len(X)
    fact = [1] * (N + 1)
    for i in range(1, N + 1):
        fact[i] = fact[i-1] * i
    
    rank = 0
    used = [False] * (N + 1)
    
    for i in range(N):
        # 统计未使用且小于 X[i] 的数字个数
        cnt = 0
        for num in range(1, X[i]):
            if not used[num]:
                cnt += 1
        
        rank += cnt * fact[N - i - 1]
        used[X[i]] = True
    
    return rank
```


***

把排列看作一个 N 位数字，每位可以选剩余未用的数字：

```text 
第1位：有 N 种选择 → rank 变化量 = 选第 k 小的数，跳过 (k-1) × (N-1)! 个排列
第2位：有 N-1 种选择 → rank 变化量 = 选第 k 小的数，跳过 (k-1) × (N-2)! 个排列
...
```


**本质**：康托展开就是计算"有多少个排列排在它前面"。

***

**逆康托展开**

给定 rank，还原排列：

```python title="逆康托展开"
def cantor_inverse(N, rank):
    fact = [1] * (N + 1)
    for i in range(1, N + 1):
        fact[i] = fact[i-1] * i
    
    available = list(range(1, N + 1))
    res = []
    
    for i in range(N):
        idx = rank // fact[N - i - 1]
        rank %= fact[N - i - 1]
        res.append(available.pop(idx))
    
    return res
```


***

1. **排列哈希**：将排列压缩为一个整数（$0 \sim N!-1$）
2. **排列的第 k 个**：逆康托展开求排名第 k 的排列
3. **区间计数**：统计字典序在某区间的排列数
4. **状态压缩**：在 BFS/A\* 中表示排列状态（如八数码问题）

```python title="托康排序+树状数组优化"
MOD = 998244353
class Fenwick:
    def __init__(self, n):
        self.n = n
        self.bit = [0] * (n + 1)

    def add(self, idx, val):
        while idx <= self.n:
            self.bit[idx] += val
            idx += idx & -idx

    def sum(self, idx):
        res = 0
        while idx > 0:
            res += self.bit[idx]
            idx -= idx & -idx
        return res
def tuo_kang(a):
    n = len(a)
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = fact[i - 1] * i % MOD
    bit = Fenwick(n)
    for i in range(1, n + 1):
        bit.add(i, 1)
    rank = 0
    for i in range(n):
        cnt = bit.sum(a[i] - 1)  # 未使用且小于 a[i] 的个数
        rank = (rank + cnt * fact[n - i - 1]) % MOD
        bit.add(a[i], -1)  # 标记 a[i] 已使用
    return (rank + 1) % MOD
def main():
    n = int(input())
    a = list(map(int,input().split()))
    b = list(map(int,input().split()))
    print(tuo_kang(b) - tuo_kang(a) - 1 if tuo_kang(b) - tuo_kang(a) - 1 > 0 else 0)
if __name__ == "__main__":
    main()
```


### D-中心扩展

#### 题目

如果一个由小写英文字母组成的字符串满足以下条件，它就被称为**好字符串**。

- 它最多可以通过改写一个字符变成一个回文字符串。

例如，`a`、`iwai`和`abcdcza`是好字符串，但`abcd`和`atcoder`不是好字符串。特别要注意的是，重码字符串也是好字符串。

给您一个由小写英文字母组成的字符串 $S$ 。

请找出 $S$ 的非空子串（连续子序列）中有多少个是好字符串。

从 $S$ 的不同位置取出的两个子串即使作为字符串相等，也要分别计算。

什么是子串？

$S$ 的**子串**是删除 $S$ 开头的零个或多个字符和结尾的零个或多个字符后得到的字符串。
例如，`ab`是`abc`的子串，但`ac`不是`abc`的子串。

#### 中心扩展

找出好字符串的中间字符在整个搜索中的位置。让这个中间字符成为第 $i$ 个字符。

中心为 $i$ 长度为 $2k+1$ 的子串是一个好字符串，这一事实等同于满足 $S_{i-j}\neq S_{i+j}$ 的 $j=1,2,\ldots,k$ 的个数小于 $1$ 。因此，只需确定在 $k$ 中升序为 $S_{i-j}\neq S_{i+j}$ 的 $1\le j\le k$ 的个数是否小于 $1$ 即可。用同样的方法可以确定偶数长度的好字符串的个数。

```python title="中心扩展法"
s = input().strip()
n = len(s)
ans = 0
for i in range(n):
    diff = 0
    l, r = i, i
    while l >= 0 and r < n:
        if s[l] != s[r]:
            diff += 1
        if diff <= 1:
            ans += 1
        else:
            break
        l -= 1
        r += 1
for i in range(n - 1):
    diff = 0
    l, r = i, i + 1
    while l >= 0 and r < n:
        if s[l] != s[r]:
            diff += 1
        if diff <= 1:
            ans += 1
        else:
            break
        l -= 1
        r += 1
print(ans)
```


```python title="二合一"
s = input()
n = len(s)
ans = 0
for k in range(2):
    for st in range(n):
        l,r = st - k,st
        cnt = 0
        while 0 <= l and r < n:
            if s[l] != s[r]:
                cnt += 1
                if cnt == 2:
                    break
            l -= 1
            r += 1
            ans += 1
print(ans)
```


### E-贡献法+逆元+前缀和

#### 题目

给定序列 `A`，定义 $f(l, r)$ 为子数组 `A[l..r]` 的**算术平均值**。

求所有子数组的平均值之和，答案对 `998244353` 取模。

#### 贡献法+逆元+前缀和

***

**交换求和顺序**

原问题：

$$
\sum_{l=1}^N \sum_{r=l}^N f(l, r) = \sum_{l=1}^N \sum_{r=l}^N \frac{\sum_{k=l}^r A_k}{r - l + 1}
$$

考虑每个 `A[i]` 对答案的贡献：

$$
\text{答案} = \sum_{i=1}^N A_i \times \left( \sum_{l=1}^i \sum_{r=i}^N \frac{1}{r - l + 1} \right)
$$

括号内的部分记为 `coeff[i]`，即位置 `i` 的**贡献系数**。

***

$$
coeff[i] = \sum_{l=1}^i \sum_{r=i}^N \frac{1}{r - l + 1}
$$

令子数组长度 `k = r - l + 1`：

- 左端点 `l` 范围：`max(1, i - k + 1)` 到 `min(i, N - k + 1)`
- 长度 `k` 范围：`1` 到 `N`

`coeff[i]` = 所有包含 `i` 的子数组的 $\frac{1}{len}$ 之和。

***

**前缀和优化**

定义：

- `inv[k]`：k 的模逆元
- `S[x] = inv[1] + inv[2] + ... + inv[x]`

则对于固定的 `l` 和 `r`：

$$
\frac{1}{r - l + 1} = inv[r - l + 1]
$$

`coeff[i]` = $\sum_{l=1}^i \sum_{r=i}^N inv[r - l + 1]$

***

**二重前缀和**

令 `pref[i] = S[1] + S[2] + ... + S[i]`（S 的前缀和）

经过推导：

$$
coeff[i] = pref[N] - pref[N - i] - pref[i - 1]
$$

（其中 `pref[0] = 0`）

***

$$
\text{答案} = \sum_{i=1}^N A_i \times coeff[i] \pmod{998244353}
$$

***

1. 预处理逆元 `inv[1..N]`
2. 前缀和 `S[1..N]`
3. 二重前缀和 `pref[1..N]`
4. 遍历 `i`，计算 `coeff[i] = pref[N] - pref[N-i] - pref[i-1]`
5. 累加 `A[i] * coeff[i]`

***

```python title="贡献法+逆元+前缀和"
MOD = 998244353
n = int(input())
a = list(map(int, input().split()))
inv = [0] * (n + 1)
inv[1] = 1
for i in range(2, n + 1):
    inv[i] = MOD - MOD // i * inv[MOD % i] % MOD
s = [0] * (n + 1)
for i in range(1, n + 1):
    s[i] = (s[i - 1] + inv[i]) % MOD
pre = [0] * (n + 1)
for i in range(1, n + 1):
    pre[i] = (pre[i - 1] + s[i]) % MOD
ans = 0
for i in range(n):
    dif = (pre[n] - pre[n - i - 1] - pre[i]) % MOD
    ans = (ans + a[i] * dif) % MOD
print(ans)
```
