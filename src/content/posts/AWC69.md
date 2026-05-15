---
title: AWC69-贪心+差分/区间覆盖+贪心/离线处理+树状数组
published: 2026-05-14
description: AWC69题解-solve2-补CDE
image: ./cover.jpg
tags: [训练,AtCoder,AWC]
category: AWC
draft: False
---
Easy: A、B

Mid: E

Hard: D、C
# AWC69

[Tasks - AtCoder Weekday Contest 0069 Beta](https://atcoder.jp/contests/awc0069/tasks "Tasks - AtCoder Weekday Contest 0069 Beta")

难度挺大的一场AWC，DEF都没做出来（菜菜/(ㄒoㄒ)/ \~\~）

</details>
<details> <summary>A/B-模拟</summary>
A题意：

给你N个股票，每个股票记录M天股价，计算股票的波动率，输出波动率最大的股票编号

按照题意模拟即可，值得注意的是max\_设置要小于0（不会有人设置成0然后吃了一发WA吧？？（没错，就是我,,,,））

```python title="模拟"
n,m = map(int,input().strip().split())
ans = 0
max_ = -1
for k in range(n):
    p = 0
    t = list(map(int,input().strip().split()))
    for i in range(1,m):
        p += abs(t[i] - t[i-1])
    if p > max_:
        max_ = p
        ans = k + 1
print(ans)

```


B题意：

给定N个数据，每个数据有T+C，选出K个，求T+C的最大值

模拟排序即可

```python 
n,k = map(int,input().split())
g = []
for _ in range(n):
    t,c = map(int,input().split())
    g.append(t + c)
g.sort(reverse = True)
print(sum(g[:k]))
```

</details>
<details> <summary>C-贪心+差分</summary>

**题意**

- 有 $  N  $ 盏灯排成一行，初始状态由字符串 $  S  $ 给出（'1' 表示开，'0' 表示关）。
- 每次操作可以任意选择一个长度为 $  K  $ 的连续区间，将区间内所有灯的状态翻转（开变关，关变开）。
- 问：能否通过若干次操作使得所有灯都变成开的状态？如果能，最少需要多少次操作？如果不能，输出 -1。

**题解**

**从左到右处理** &#x20;

如果某个位置的灯是关的，那么为了把它变成开，我们必须选择一个以它作为起点的长度为 $  K  $ 的区间进行翻转（因为后面的区间无法影响到它前面的位置，而前面的操作已经决定）。 &#x20;

这种“从左到右”的贪心策略可以保证每个位置只被考虑一次，并且不会影响已经处理好的左边部分。

**翻转的奇偶性** &#x20;

每盏灯被翻转的次数决定了它的最终状态。初始状态为 `1` 的灯，经过奇数次翻转后变为 `0`，偶数次则保持 `1`；初始为 `0` 的灯则相反。 &#x20;

所以我们可以维护一个“当前累计翻转次数”的奇偶性，并结合初始状态判断当前灯是否需要额外翻转。

**差分数组高效维护区间翻转** &#x20;

如果我们在位置 $  i  $ 进行一次翻转（即以 $  i  $ 为起点的长度为 $  K  $ 的区间），那么从 $  i  $ 到 $  i+K-1  $ 的灯都会受到一次影响。 &#x20;

为了快速知道当前位置的累计翻转次数，可以使用差分数组：

- `diff[i]` 表示在位置 $  i  $ 处翻转次数的变化量。
- 用一个变量 `cur` 记录当前位置的累计翻转次数，遍历时 `cur += diff[i]`。
- 如果需要在位置 $  i  $ 开始新增一次翻转，则 `cur++`，并在 `diff[i+K]--`（表示在 $  i+K  $ 处翻转效果结束）。

**算法步骤**

1. 将字符串 $  S  $ 转换为整数数组 `a`，`a[i] = 1` 表示开，`0` 表示关。
2. 初始化差分数组 `diff` 长度为 $  N+2  $（下标从 0 到 N+1）。
3. 初始化 `cur = 0`（当前累计翻转次数的奇偶性），`ans = 0`。
4. 遍历 `i` 从 0 到 $  N-1  $：
   - `cur += diff[i]`（累计到当前位置的翻转次数）。
   - 当前灯实际状态 = `a[i] ^ (cur % 2)`（因为奇数次翻转会改变状态）。
   - 如果实际状态 == 0（即当前灯是关的）：
     - 如果 `i + K > N`，说明无法以 `i` 为起点做一次长度为 $  K  $ 的翻转（超出右边界），则无解，输出 -1。
     - 否则：

       `ans++`（进行一次操作）

       `cur++`（增加一次翻转）

       `diff[i+K]--`（标记翻转效果在 `i+K` 处结束）
5. 遍历结束后，输出 `ans`。

**贪心正确性证明**

- **必要性**：当扫描到位置 $  i  $ 时，所有之前的位置已经处理成开的状态，并且不会再有操作影响它们（因为后续操作起点 ≥ i）。因此，如果当前灯是关的，必须立刻在 $  i  $ 开始一次翻转，否则它永远无法变开。
- **充分性**：按照上述贪心，每次翻转都是必要的，且不会影响已经处理好的左边部分。因为翻转区间长度为 $  K  $，只会影响 $  i  $ 到 $  i+K-1  $ 的灯，而 $  i  $ 之后的灯尚未被处理，所以未来的操作可以纠正它们。因此贪心策略保证最少操作数。

```python title="贪心+差分"
def main():
    n, k = map(int, input().split())
    s = input().strip()
    a = [1 if ch == '1' else 0 for ch in s]
    diff = [0] * (n + 2)
    cur = 0
    ans = 0
    for i in range(n):
        cur += diff[i]
        if (a[i] + cur) % 2 == 0:
            if i + k > n:
                print(-1)
                return
            ans += 1
            cur += 1
            diff[i + k] -= 1
    print(ans)
if __name__ == "__main__":
    main()
```

</details>
<details> <summary>D-区间覆盖+贪心</summary>

**题意**

- 有 N 个村庄，每个村庄有坐标 $X_i$ 和海拔 $P_i$。 &#x20;
- 一个村庄可以安装信号塔当且仅当 $P_i \geq K$。 &#x20;
- 信号塔可以覆盖距离 $D$ 以内的所有村庄（即村庄与塔的坐标差绝对值 ≤ D）。 &#x20;
- 目标是选择最少数量的塔，使得所有村庄都被至少一个塔覆盖。 &#x20;

**题解**

- 每个候选塔（海拔足够）对应一个覆盖区间：$[X_i - D, X_i + D]$。
- 每个村庄就是一个需要被覆盖的点（位置 $X_i$）。
- 我们需要用最少的区间覆盖所有点。

**算法步骤**

1. **筛选可建塔的村庄**： &#x20;

   对于每个村庄，如果 $P_i \geq K$，则生成区间 $[X_i - D, X_i + D]$。&#x20;

   如果没有可建塔的村庄且 N > 0，直接输出 -1。
2. **排序**：
   - 将 `points` 按坐标升序排序。
   - 将 `intervals` 按左端点升序排序。
3. **贪心覆盖**：
   - 用指针 `i` 遍历 `intervals`，用指针 `j` 遍历 `points`。
   - 初始化 `ans = 0`。
   - 当 `j < len(points)` 时：
     - 设当前最左边未覆盖的点 `cur = points[j]`。
     - 找出所有左端点 ≤ `cur` 的区间，记录其中最大的右端点 `max_r`（移动 `i` 指针，同时更新 `max_r`）。
     - 如果 `max_r < cur`，说明没有区间能覆盖当前点，返回 -1。
     - 否则，`ans++`，然后跳过所有坐标 ≤ `max_r` 的点（即移动 `j` 直到 `points[j] > max_r`）。
   - 输出 `ans`。

**贪心正确性证明**

- 贪心选择能覆盖当前最左点的最右区间，是因为这样能尽可能多地覆盖后面的点，从而最小化区间数。
- 由于区间按左端点排序，且我们每次只考虑能覆盖当前点的区间，保证了不会遗漏必要的区间。
- 如果存在可行解，贪心一定能找到最优解（这是区间覆盖问题的经典结论）。

```python title="区间覆盖+贪心"
def main():
    n, k, d = map(int, input().split())
    vil = []
    pos = []
    for _ in range(n):
        x, p = map(int, input().split())
        vil.append((x, p))
        pos.append(x)
    cur = []
    for x, p in vil:
        if p >= k:
            cur.append((x - d, x + d))
    if not cur:
        print(-1)
        return
    pos.sort()
    cur.sort(key=lambda x: x[0])
    i = j = ans = 0
    n = len(pos)
    m = len(cur)
    while j < n:
        curr = pos[j]
        max_r = -10 ** 18
        while i < m and cur[i][0] <= curr:
            max_r = max(max_r, cur[i][1])
            i += 1
        if max_r < curr:
            print(-1)
            return
        ans += 1
        while j < n and pos[j] <= max_r:
            j += 1
    print(ans)
if __name__ == "__main__":
    main()


```


</details>
<details> <summary>E-离线 + 树状数组</summary>

**题意**

有一个图书馆，共有 $  N  $ 个书架，从左到右编号 $  1  $ 到 $  N  $。 &#x20;

每个书架 $  i  $ 有 $  A_i  $ 本书，修复完成日为 $  D_i  $，每本书借出费用为 $  V_i  $。 &#x20;

在修复完成日当天及之后，该书架上的所有书都可以借出。

现在有 $  Q  $ 个独立的借阅计划。每个计划指定一个连续书架区间 $[L_j, R_j]$ 和一个日期 $  T_j  $。 &#x20;

在该计划中，只有那些 $  D_i \le T_j  $ 的书架（即在该日期前已修复完成）上的所有书才会被借出。 &#x20;

每个书架 $  i  $ 借出后产生的费用为 $  A_i \times V_i  $。

对于每个计划，需要计算该区间内所有符合条件书架的费用总和。输出每个计划的结果。

**题解**

要求对每个查询 `(L, R, T)`，计算区间 `[L, R]` 内所有满足 `D_i ≤ T` 的书架的 `A_i * V_i` 之和。

1. **将书架按修复日期 ****`D_i`**** 升序排序**。 &#x20;
2. **将查询按日期 ****`T_j`**** 升序排序**。 &#x20;
3. **使用一个树状数组（Fenwick Tree）维护**： &#x20;
   - 初始时，树状数组为空（所有书架的权值都未加入）。 &#x20;
   - 遍历排序后的查询，同时维护一个指针 `p` 指向书架列表。 &#x20;
   - 对于当前查询的日期 `T`，将书架中所有 `D_i ≤ T` 的书架，将其权值 `A_i * V_i` 添加到树状数组的对应位置 `i` 上（单点更新）。 &#x20;
   - 然后对当前查询的区间 `[L, R]` 用树状数组求区间和（前缀和相减），得到答案。

```python title=" 树状数组-TLE"
 class FenwickTree:
    def __init__(self, length):
        self.length = length
        self.tree = [0] * (length + 1)

    def lowbit(self, x):
        return x & -x

    def update(self, idx, val):
        while idx <= self.length:
            self.tree[idx] += val
            idx += self.lowbit(idx)

    def query(self, idx):
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= self.lowbit(idx)
        return res
def solve():
    n, q = map(int, input().split())
    book = []
    for i in range(1, n + 1):
        a, d, v = map(int, input().split())
        book.append((d, i, a * v))
    book.sort(key=lambda x: x[0])
    for _ in range(q):
        l, r, t = map(int, input().split())
        bit = FenwickTree(n)
        i = 0
        while i < n and book[i][0] <= t:
            _, pos, w = book[i]
            bit.update(pos, w)
            i += 1
        ans = bit.query(r) - bit.query(l - 1)
        print(ans)
if __name__ == "__main__":
    solve()
```


```python title="离线排序+树状数组"
import sys
class FenwickTree:
    def __init__(self, length):
        self.length = length
        self.tree = [0] * (length + 1)
    def lowbit(self, x):
        return x & -x
    def update(self, idx, val):
        while idx <= self.length:
            self.tree[idx] += val
            idx += self.lowbit(idx)
    def query(self, idx):
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= self.lowbit(idx)
        return res
def solve():
    input = sys.stdin.readline
    n, q = map(int, input().split())
    books = []
    for i in range(1, n + 1):
        a, d, v = map(int, input().split())
        books.append((d, i, a * v))
    books.sort(key=lambda x: x[0])
    queries = []
    for idx in range(q):
        l, r, t = map(int, input().split())
        queries.append((t, l, r, idx))
    queries.sort(key=lambda x: x[0])
    bit = FenwickTree(n)
    ans = [0] * q
    ptr = 0
    for t, l, r, qid in queries:
        while ptr < n and books[ptr][0] <= t:
            _, pos, w = books[ptr]
            bit.update(pos, w)
            ptr += 1
        ans[qid] = bit.query(r) - bit.query(l - 1)

    sys.stdout.write("\n".join(map(str, ans)))

if __name__ == "__main__":
    solve()
```
