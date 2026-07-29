---
title: 牛客周赛154-①B-贪心+构造②C-贪心③D-差分+环形结构④E-对顶堆模板
published: 2026-07-27
description: 牛客周赛154
image: ./cover.jpg
tags: [算法训练,nowcoder周赛]
category: 算法训练
draft: False
---

# 牛客周赛154-①B-贪心+构造②C-贪心③D-差分+环形结构④E-对顶堆模板

[牛客竞赛\_ACM/NOI/CSP/CCPC/ICPC算法编程高难度练习赛\_牛客竞赛OJ](https://ac.nowcoder.com/acm/contest/137840 "牛客竞赛_ACM/NOI/CSP/CCPC/ICPC算法编程高难度练习赛_牛客竞赛OJ")

### B-贪心+构造

#### 题目

$\hspace{15pt}$我们把矩阵第 $r$ 行第 $c$ 列的位置记为 $\left(r, c\right)$，定义两个位置 $\left(r_1, c_1\right),\left(r_2, c_2\right)$ 的曼哈顿距离为 $\left|r_1 - r_2\right| + \left|c_1 - c_2\right|$。
$\hspace{15pt}$请构造一个 $2$ 行 $n$ 列的矩阵，满足其中恰好包含 $1,2,\dots,n$ 各两个，且这 $n$ 组相同数字所在位置的曼哈顿距离之和尽可能大。

#### 贪心

首先为了最大化距离和，不会把两个相同数字放在一行。

不同行之间尽可能发在两端，可以得到如下的一个可行的构造。

```c++ title="贪心"
#include<iostream>
using namespace std;
int main(){
  int n;
  cin>>n;
  for(int i=n;i>=1;i--) cout<<i<<' ';
  cout<<endl;
  for(int j=1;j<=n;j++) cout<<j<<' ';
  return 0;
}
```


### C-贪心

#### 题目

$\hspace{15pt}$在二维平面中，小红初始位于 $\left(0, 0 \right)$。小红会移动 $n$ 次，每次都只会水平或垂直坐标轴方向移动一个单位距离，我们把这 $n$ 次移动用一个字符串 $s = s_1s_2\dots s_n$ 表示，具体的：
$\hspace{23pt}\bullet\,$如果 $s_i = \texttt{U}$，第 $i$ 次移动小红会从 $\left(x, y \right)$ 移动到 $\left(x, y + 1\right)$；
$\hspace{23pt}\bullet\,$如果 $s_i = \texttt{D}$，第 $i$ 次移动小红会从 $\left(x, y \right)$ 移动到 $\left(x, y - 1\right)$；
$\hspace{23pt}\bullet\,$如果 $s_i = \texttt{L}$，第 $i$ 次移动小红会从 $\left(x, y \right)$ 移动到 $\left(x - 1, y\right)$；
$\hspace{23pt}\bullet\,$如果 $s_i = \texttt{R}$，第 $i$ 次移动小红会从 $\left(x, y \right)$ 移动到 $\left(x + 1, y\right)$。
$\hspace{15pt}$现在你要删除 $s$ 中的 $k$ 个字符。设经过剩余的 $n - k$ 次移动后，小红的坐标为 $\left(x_0, y_0 \right)$，你需要最大化 $\left|x_0 \right| + \left|y_0 \right|$ 的值。

#### 贪心

对于 (U,D)，(L,R)两对，首先肯定是去消除出现次数少的那个，这样可以尽可能增大 ∣x0∣ 或 ∣y0∣。

如果消除玩两对中的较小值后 k 仍然大于 0 ，再去消除较大值。

```python title="贪心"
from collections import Counter
n, k = map(int, input().split())
s = input().strip()
cnt = Counter(s)
if cnt['U'] >= cnt['D']:
    k1 = 'U'
else:
    k1 = 'D'
if cnt['R'] >= cnt['L']:
    k2 = 'R'
else:
    k2 = 'L'

kp = {k1, k2}
ans = []
for ch in s:
    if ch in kp:
        ans.append(ch)
    elif k > 0:
        k -= 1
    else:
        ans.append(ch)
if k > 0:
    ans = ans[:-k]
print(''.join(ans))
```


### D-差分+环形结构

#### 题目

$\hspace{15pt}$给定一个长度为 $n$ 的环形字符串 $s=s_0s_1\dots s_{n-1}$，保证其仅包含 $\texttt{0},\texttt{1}$。在环形字符串中，$s_i$ 与 $s_{i+1}$ 相邻，其中规定 $s_{n}=s_0$。
$\hspace{15pt}$你需要依次执行 $q$ 次如下操作，每次操作给定 $l, r$：
$\hspace{23pt}\bullet\,$若 $l\leq r$，反置 $s_l,s_{l+1},\dots,s_r$（$\texttt{0}$ 变 $\texttt{1}$，$\texttt{1}$ 变 $\texttt{0}$）；
$\hspace{23pt}\bullet\,$若 $l>r$，反置 $s_l,s_{l+1},\dots,s_{n -1 },s_0,s_1,\dots,s_r$（$\texttt{0}$ 变 $\texttt{1}$，$\texttt{1}$ 变 $\texttt{0}$）。
$\hspace{15pt}$每次操作后，你需要输出当前环形串中相邻且不同的字符对数量。形式化地，你需要求出满足 $s_i\ne s_{i+1}$ 的下标 $i\ (0\leq i\leq n-1)$ 的数量，其中 $s_{n}=s_0$。

#### 差分

区间内部的相邻关系不变（只是 0 变 1，1 变 0，相邻是否相同不变）

**只有区间边界处**的相邻关系会改变

具体来说，翻转区间 `[l, r]`（环形意义下）后，可能改变的相邻关系只有两个：

- `(l-1, l)`：左边界外侧与区间左端
- `(r, r+1)`：区间右端与右边界外侧

（在环形意义下，下标取模 n）

维护一个数组 `diff[i]`：

- `diff[i] = 1`：表示 `s[i]` 与 `s[i+1]` 不同（环形，`s[n] = s[0]`）
- `diff[i] = 0`：表示相同

`ans` = 所有 `diff[i]` 的和 = 相邻不同字符对的总数。

翻转区间边界时，`(idx, idx+1)` 这个相邻关系会反转：

- 原来不同 → 现在相同（`diff[idx]` 从 1 变 0，`ans--`）
- 原来相同 → 现在不同（`diff[idx]` 从 0 变 1，`ans++`）

翻转 `[l, r]` 时，需要翻转两个边界：

1. **左边界**：`(l-1, l)` → `flip((l-1+n) % n)`
2. **右边界**：`(r, r+1)` → `flip(r)`

情况 1：`l <= r`（不跨环）

翻转 `[l, r]`，需要处理边界 `(l-1, l)` 和 `(r, r+1)`。

**特判**：如果 `l == 0` 且 `r == n-1`，意味着翻转整个环。此时所有相邻关系都反转两次（等价于不变），所以不需要翻转任何边界。

情况 2：`l > r`（跨环）

翻转 `[l, n-1]` 和 `[0, r]`，等价于翻转整个环再翻转 `[r+1, l-1]`。

但简单处理：翻转整个环 = 所有 `diff` 不变（因为每个相邻关系都反转了），所以等价于只翻转 `[r+1, l-1]` 的边界。

即只需要处理边界 `(r, r+1)` 和 `(l-1, l)`。

**特判**：如果 `l == (r+1) % n`，即区间覆盖了整个环（或只有一个元素），不需要翻转。

```python title="差分"
n, q = map(int, input().split())
s = input().strip()
diff = [0] * n
ans = 0
for i in range(n):
    if s[i] != s[(i + 1) % n]:
        diff[i] = 1
        ans += 1
def flip(idx):
    global ans
    if diff[idx]:
        diff[idx] = 0
        ans -= 1
    else:
        diff[idx] = 1
        ans += 1
for _ in range(q):
    l, r = map(int, input().split())
    if l <= r:
        if not (l == 0 and r == n - 1):
            flip((l - 1 + n) % n)
            flip(r)
    else:
        if l != (r + 1) % n:
            flip((l - 1 + n) % n)
            flip(r)
    print(ans)
```


### E-对顶堆模板

#### 题目

$\hspace{15pt}$给定一个长为 $n$ 的数组 $a_1, a_2, \dots, a_n$，小红可以删除它的任意一个长为 $k$ 的子数组，我们认为一次删除操作是合法的，当且仅当删除之后数组的中位数恰好为 $x$。请你计算共有多少种不同的合法删除操作，我们认为两次删除操作不同，当且仅当两个子数组的左右端点不同。 &#x20;

$\hspace{15pt}$在本题中，我们认为空数组的中位数为 $0$。 &#x20;

【名词解释】 &#x20;

$\hspace{15pt}$子数组：从原数组中，连续的选择一段元素（可以全选、可以不选）得到的新数组。 &#x20;

$\hspace{15pt}$长度为 $n$ 的数组的中位数：将所有元素从小到大排列后，位于中间的数。特别地，当 $n$ 为偶数时，中位数为中间两个数的平均值。例如，数组 $\{2,3,1,5,4\}$ 的中位数是 $3$，数组 $\{1,3,2,6,4,5\}$ 的中位数是 $3.5$。

#### 对顶堆

```python title="对顶堆"
import sys
import heapq
from collections import defaultdict
# 滑动窗口最值板子
class SlidingWindowExtreme:
    def __init__(self, x):
        self.x = x
        self.max_less = []       # 小于 x 的最大值（大根堆，存负数）
        self.min_greater = []    # 大于 x 的最小值（小根堆）
        self.del_less = defaultdict(int)
        self.del_greater = defaultdict(int)
    
    def _clean_less(self):
        while self.max_less and self.del_less[-self.max_less[0]] > 0:
            val = -heapq.heappop(self.max_less)
            self.del_less[val] -= 1
    
    def _clean_greater(self):
        while self.min_greater and self.del_greater[self.min_greater[0]] > 0:
            val = heapq.heappop(self.min_greater)
            self.del_greater[val] -= 1
    
    def add(self, v):
        if v < self.x:
            heapq.heappush(self.max_less, -v)
        elif v > self.x:
            heapq.heappush(self.min_greater, v)
    
    def remove(self, v):
        if v < self.x:
            self.del_less[v] += 1
        elif v > self.x:
            self.del_greater[v] += 1
    
    def get_max_less(self):
        self._clean_less()
        return -self.max_less[0] if self.max_less else None
    
    def get_min_greater(self):
        self._clean_greater()
        return self.min_greater[0] if self.min_greater else None


def solve():
    n, k, x = map(int, sys.stdin.readline().split())
    a = list(map(int, sys.stdin.readline().split()))
    m = n - k

    # 空数组特判
    if m == 0:
        print(1 if x == 0 else 0)
        return

    # 初始剩余数组 a[k:]
    less = sum(1 for v in a[k:] if v < x)
    eq = sum(1 for v in a[k:] if v == x)
    greater = m - less - eq

    # 初始化双堆
    heap = SlidingWindowExtreme(x)
    for v in a[k:]:
        heap.add(v)

    def add_remain(v):
        nonlocal less, eq, greater
        if v < x:
            less += 1
        elif v == x:
            eq += 1
        else:
            greater += 1
        heap.add(v)

    def remove_remain(v):
        nonlocal less, eq, greater
        if v < x:
            less -= 1
        elif v == x:
            eq -= 1
        else:
            greater -= 1
        heap.remove(v)

    def check():
        if m % 2 == 1:
            return less < (m + 1) // 2 and greater <= m // 2
        else:
            if eq >= 2:
                return less < m // 2 and greater < m // 2
            elif eq == 0:
                if less == m // 2 and greater == m // 2:
                    max_l = heap.get_max_less()
                    min_g = heap.get_min_greater()
                    return max_l is not None and min_g is not None and max_l + min_g == 2 * x
            return False

    ans = 0
    for l in range(n - k + 1):
        r = l + k - 1
        if l > 0:
            add_remain(a[l - 1])
            remove_remain(a[r])
        if check():
            ans += 1

    print(ans)


if __name__ == "__main__":
    solve()
```
