---
title: 1104Div1+2①A-贪心②C-贪心+栈模拟③B-贪心+逆序对+树状数组优化④D-贪心+数学+构造⑤E-贪心+图论
published: 2026-06-19
description: 1104Div1+2-solve3-补D-E
image: ./cover.jpg
tags: [训练,Codeforces,Div3]
category: Codeforces
draft: False
---

# 1104Div1+2①A-贪心②C-贪心+栈模拟③B-贪心+逆序对+树状数组优化④D-贪心+数学+构造⑤E-贪心+图论

[更好的阅读体验](https://www.wolai.com/4ENmjLeKS1miGQYB2HCr2w "更好的阅读体验")

[Dashboard - Order Capital Round 2 (Codeforces Round 1104, Div. 1 + Div. 2) - Codeforces](https://codeforces.com/contest/2237 "Dashboard - Order Capital Round 2 (Codeforces Round 1104, Div. 1 + Div. 2) - Codeforces")

### A-贪心

遍历一遍数组，维护遇到的最小值，每次都加上当前维护的最小值即可

```python title="贪心"
t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int,input().split()))
    ans = 0
    min_ = float('inf')
    for x in a:
        if min_ > x:
            min_ = x
            ans += min_
        else:
            ans += min_
    print(ans)
```


### C-贪心+栈模拟

#### 题目

小鬼贾又在玩橡皮鸭了！从左到右有 $n$ 堆橡皮鸭。最初， $i$ /th 堆里有 $a_i$ 只橡皮鸭。

虽然序列 $a$ 并非按非递减顺序排序，但贾\*\*\*必须执行以下操作：

- 选择两堆相邻的橡皮鸭，使得左边一堆的橡皮鸭数量多于右边一堆。Ja 将这两堆鸭子对调，然后将新的左边一堆鸭子的数量加到新的右边一堆鸭子的数量上。

  形式上，选择一个索引 $i$ 这样的 $1\le i \lt n$ 和 $a_i \gt a_{i+1}$ 。然后将相邻的一对 $(a_i,a_{i+1})$ 替换为 $(a_{i+1},a_i+a_{i+1})$ 。

例如，如果相邻的两个堆中包含 $7$ 和 $3$ 只橡皮鸭，那么操作后它们就包含 $3$ 和 $10$ 只橡皮鸭。

Ja 可以在每一步中选择满足上述条件的任意索引。可以证明，无论他如何选择，过程最终都会以序列按非递减顺序排序结束。

小贾希望过程结束时最大的一堆中的橡皮鸭数量越少越好。求最大一堆的最小值。

按照题意模拟即可；维护一个栈，若入栈元素`x>`栈顶元素`st[-1]`，则出栈(记作`tmp`)后，以此入栈`x`和`x+tmp`即可；反之直接入栈`x`；最后输出`st[-1]`即可

```python title="栈模拟/贪心"
t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    st = []
    for x in a:
        if st and st[-1] > x:
            tmp = st.pop()
            st.append(x)
            st.append(x + tmp)
        else:
            st.append(x)
    print(st[-1])
```


### B-贪心+逆序对+树状数组优化

#### 题目

小鬼贾正在玩橡皮鸭。他把 $n$ 堆橡皮鸭摆成一排，其中 $i$ /堆里有 $a_i$ 只鸭子。鸭子呱呱给了小贾一个**严格递增的**序列 $b_1,b_2,\ldots,b_n$ ，并命令他让 $a_1,a_2,\ldots,a_n$ 这堆鸭子完全变成这个序列。

小贾分以下两个阶段完成这个过程：

1. 小贾可以在每堆鸭子中添加任意数量的鸭子。

   形式上，对于每一堆 $i$ ，他选择一个非负整数 $x_i$ ，并用 $a_i+x_i$ 替换 $a_i$ 。
2. 小贾可以重复交换相邻的两堆棋子。

   形式上，他可以执行以下任意次数的操作，可能为零：选择一个索引 $i$ 这样的 $1\le i\le n-1$ ，然后交换 $a_i$ 和 $a_{i+1}$ 的值。

如果在两个阶段结束后，堆的大小序列正好是 $b_1,b_2,\ldots,b_n$ ，那么这个过程就是有效的。

求所有有效过程中，**第二阶段**进行的操作次数最少的过程。如果没有有效过程，则输出 $-1$ 。

**可行性判断：**

将`a`排序后与目标`b`逐一比较，如果排序后`a`中的任何元素大于`b`的对应元素，则无法通过增加的操作达到目标

**贪心配对：**

在可行性的前提下，遍历数组`b`的每个位置`j`，在未使用的原宿数组`a`的元素中，找到第一个值`≤b[j]`的元素，将他分配给目标`j`

数组`c[i]`表示原始位置`i`的鸭子最终应该去往目标`c[i]`

这个贪心选择保证了最小化移动次数，因为越靠前的 `a` 元素会优先被分配给越靠前的 `b` 位置。

**计算逆序对：**

得到了最终位置映射 `c` 后，问题转化为：通过相邻交换将序列 `c` 变成升序排列 `0,1,2,...,n-1` 的最少交换次数。这等价于计算序列 `c` 中的**逆序对数量**（即满足 `i < k` 但 `c[i] > c[k]` 的数对数量）。

```python title="贪心+逆序对"
t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))
    a_sorted = sorted(a)
    ok = True
    for i in range(n):
        if a_sorted[i] > b[i]:
            ok = False
            break
    if not ok:
        print(-1)
        continue
    use = [False]*n
    c = [0]*n
    for j in range(n):
        pos = -1
        for i in range(n):
            if not use[i] and a[i] <= b[j]:
                pos = i
                break
        c[pos] = j
        use[pos] = True
    ans = 0
    for i in range(n):
        for k in range(i + 1,n):
            if c[i] > c[k]:
                ans += 1
    print(ans)


```


```python title="贪心+逆序对+树状数组优化"
class Fenwick:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def add(self, idx, delta):
        idx += 1  # 1-indexed
        while idx <= self.n:
            self.tree[idx] += delta
            idx += idx & -idx

    def sum(self, idx):
        # 查询 [0, idx) 的前缀和
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= idx & -idx
        return res


t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))

    # 可行性判断
    a_sorted = sorted(a)
    ok = True
    for i in range(n):
        if a_sorted[i] > b[i]:
            ok = False
            break
    if not ok:
        print(-1)
        continue

    # 贪心匹配
    used = [False] * n
    c = [0] * n
    for j in range(n):
        p = -1
        for i in range(n):
            if not used[i] and a[i] <= b[j]:
                p = i
                break
        c[p] = j
        used[p] = True

    # 树状数组统计逆序对
    fenwick = Fenwick(n)
    ans = 0
    for i in range(n - 1, -1, -1):
        ans += fenwick.sum(c[i])  # 查询比 c[i] 小的已处理元素个数
        fenwick.add(c[i], 1)  # 将 c[i] 加入树状数组

    print(ans)
```


### D-贪心+数学+构造

#### 题目

二进制字符串是仅由字符 $0$ 和 $1$ 组成的字符串。两个字符 $0$ 和 $1$ 被称为相反值。

考虑二进制字符串 $t$ 。假设 $|t|$ 是 $t$ 的长度。当 $|t| \ge 2$ 时，每隔 $1 \le i \lt |t|$ 字符 $t_i$ 和 $t_{i+1}$ 相邻。

如果二进制字符串 $t$ 可以通过以下任意次数（可能为零）的运算简化为长度恰好为 $1$ 的字符串，则称该字符串为优美字符串：

- 选择两个相邻的相等字符，删除这两个字符，然后插入一个值相反的字符取而代之。

例如，将第一个相邻字符对 $\mathtt{00}$ 替换为 $\mathtt{1}$ 后，字符串 $\mathtt{10001}$ 可以变为 $\mathtt{1101}$ 。然后可以变为 $\mathtt{001}$ ，再变为 $\mathtt{11}$ ，最后变为 $\mathtt{0}$ 。因此， $\mathtt{10001}$ 是美丽的。

另一方面， $\mathtt{111}$ 并不美。经过一次运算后，它变成了 $\mathtt{01}$ ，然后就不能再进行运算了。

给你一个二进制字符串 $s$ 。计算 $s$ 的非空优美子串 $^{\text{∗}}$ 的个数。

$^{\text{∗}}$ 如果从 $b$ 中删除开头的几个（可能是零个或全部）字符和结尾的几个（可能是零个或全部）字符可以得到 $a$ ，那么字符串 $a$ 是字符串 $b$ 的子串。

根据优美字符串的性质，一个字符串不优美当且仅当它**0和1数量相等且长度≥2**。因此：

- 优美子串数 = 所有非空子串 - 不优美子串

每次操作（删除两个相同字符，插入相反字符）会改变0和1的数量差 **±3**。因此：

- **数量差 mod 3** 是操作下的不变量
- 长度为1的字符串差值为±1，mod 3 ≠ 0
- 如果子串能化简到长度1，其数量差 mod 3 必不为0

**推论**：数量差 mod 3 ≠ 0 的子串**一定是优美的**。

但反过来不成立：mod 3 = 0 的子串可能是优美的（差值为3的倍数但不为0），也可能不优美（差值为0）。

维护前缀的 (1的个数 - 0的个数) mod 3，记为 `x`。

对于当前位置作为右端点，寻找之前的前缀左端点：

- 如果左右端点前缀差值不同（mod 3意义下），则子串的差值 mod 3 ≠ 0，一定优美 → 直接计入答案
- 如果左右端点前缀差值相同（mod 3 = 0），其中包含不优美的子串，需要扣除

差值 mod 3 = 0 的子串中，真正不优美的只有0和1数量完全相等的。这些子串有一个特征：由**连续相同字符构成且长度为偶数**。

遍历时维护当前连续相同字符段的长度 `y`：

- 遇到相同字符，`y` 增加
- 遇到不同字符，`y` 重置为1
- 连续k个相同字符中，长度为偶数的不优美子串有 `(k-1)//2` 个

在每一步减去当前连续段产生的不优美子串数，实现即时扣除。

```python title="构造"
t = int(input())
for _ in range(t):
    n = int(input())
    a = [1, 0, 0]
    x = 0
    ans = 0
    pre = ""
    y = 0
    for c in input():
        if c == "0":
            x -= 1
        else:
            x += 1
        x %= 3
        if c == pre:
            y = 1
        else:
            y += 1
        pre = c
        ans += sum(a) - a[x]
        a[x] += 1
        ans -= (y - 1) // 2
    print(ans)
```


### E-贪心+图论

#### 问题

鸭子呱呱有一个长度为 $n$ 的排列组合 $^{\text{∗}}$ 和一个不完整序列 $b_1,b_2,\ldots,b_n$ 。长度为 $n$ 的 $a$ 和一个不完整序列 $b_1,b_2,\ldots,b_n$ 。

$b$ 中的每个元素要么是 $-1$ 要么是 $1$ 到 $n$ 之间的整数。从 $1$ 到 $n$ 的每个整数在 $b$ 中最多出现一次。

Quack 希望将 $b$ 整理成一个与 $a$ 一致的排列。换句话说，在替换了 $b$ 中的每一个 $-1$ 之后，每一个 $1 \le i \le n$ 的等式 $a_{b_i}=b_{a_i}$ 都应该成立。

小鬼贾想帮助呱呱。在所有可能完成 $b$ 的方法中，他希望找到词典上最小的 $^{\text{†}}$ 。

请判断是否存在这种补全方式。如果存在，输出词典上最小的有效排列 $b$ 。否则，报告不可能。

$^{\text{∗}}$ 长度为 $n$ 的排列是由 $n$ 个不同的整数组成的数组，这些整数从 $1$ 到 $n$ 按任意顺序排列。例如， $[2,3,1,5,4]$ 是一个排列，但 $[1,2,2]$ 不是一个排列（ $2$ 在数组中出现了两次）， $[1,3,4]$ 也不是一个排列（ $n=3$ ，但数组中有 $4$ ）。

$^{\text{†}}$ 当且仅当下面的条件成立时，数组 $p$ 在词法上比相同大小的数组 $q$ 小：

- $p \ne q$ ，并且在 $p$ 和 $q$ 不同的第一个位置，数组 $p$ 中的元素比 $q$ 中的相应元素小。
