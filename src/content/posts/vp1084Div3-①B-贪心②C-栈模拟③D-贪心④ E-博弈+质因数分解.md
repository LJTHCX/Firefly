---
title: vp1084Div3-①B-贪心②C-栈模拟③D-贪心④E-博弈+质因数分解
published: 2026-07-24
description: 1084Div3
image: ./cover.jpg
tags: [训练,Codeforces,Div3,vp]
category: Codeforces
draft: False
---


# vp1084Div3-①B-贪心②C-栈模拟③D-贪心④E-博弈+质因数分解

[Dashboard - Codeforces Round 1084 (Div. 3) - Codeforces](https://codeforces.com/contest/2200 "Dashboard - Codeforces Round 1084 (Div. 3) - Codeforces")

### B-贪心

#### 题目

AksLolCoding 正在一个由 $n$ 个正整数组成的数组 $a$ 上玩游戏。在每一轮游戏中

- 如果 $a$ 是非递减，游戏结束。
- 否则，AksLolCoding 可以选择任意一个元素并将其从数组中移除。

确定游戏结束后数组中可能剩余元素的**最小**个数。

$^{\text{∗}}$ $a$ 是不递减的，如果所有的 $1\leq i\leq m-1$ 都是 $a_i\leq a_{i+1}$ ，其中 $m$ 是 $a$ 的长度。

#### 贪心

如果 $a$ 在开始时是非递减的，那么答案就是 $n$ 。否则，存在一个 $i$ ，即 $a_i \gt a_{i+1}$ 。我们可以删除除这两个元素之外的所有元素，然后删除 $a_i$ 以得到剩余的元素 $1$ ，因此在这种情况下答案是 $1$ 。

```python title="贪心"
t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    ok = True
    for i in range(n - 1):
        if a[i] > a[i + 1]:
            ok = False
            break
    if ok:
        print(n)
    else:
        print(1)
```


### C-栈模拟

#### 题目

AksLolCoding 正在长度为 $n$ 的字符串 $s$ 上玩游戏。最初， $s$ 只包含小写拉丁字符。

在一个回合中，AksLolCoding 可以选择任意一对整数 $(i,j)$ ，使得

- $1 \leq i \lt j \leq n$ ;
- $s_i = s_j \neq *$ ；以及
- $s_k = *$ 代表所有 $i \lt k \lt j$ 。

如果不存在这样的 $i,j$ ，那么游戏结束。否则，AksLolCoding 将设置 $s_i:=*$ 和 $s_j:=*$ 。

游戏结束后，当且仅当 $s$ 中的每个字符都等于 $*$ 时，AksLolCoding 才会获胜。判断 AksLolCoding 是否可能获胜。

**注：** $*$ 代表 ASCII 字符 42。

#### 栈模拟

类似括号匹配进行栈模拟

```python title="栈模拟"
t = int(input())
for _ in range(t):
    n = int(input())
    s = input().strip()
    st = []
    for c in s:
        if st and st[-1] == c:
            st.pop()
        else:
            st.append(c)
    print("YES" if not st else "NO")
```


### **D-贪心**

#### 题目

给你一个长度为 $n$ 的排列 $^{\text{∗}}$ 。长度为 $n$ 的排列组合 $p$ 。还有两个入口，分别位于位置 $x$ 和 $y$ （ $x \lt y$ ）。

位置 $i$ 的入口最初位于数组的 $i$ -th 和 $(i+1)$ -th 元素之间。具体来说，如果是 $i=0$ ，那么入口位于数组第一个元素之前，如果是 $i=n$ ，那么入口位于最后一个元素之后。

你可以任意执行以下两种操作\*\*次：

1. 1\. 移除一个入口左侧的元素，并将其插入另一个入口的右侧。
2. 移除一个入口右侧的元素，并将其插入另一个入口的左侧。

让 $\mathbf{\color{red}{\mathcal{O}}}$ 表示一个入口。例如，如果 $p$ 是 $[3,\mathbf{\color{red}{\mathcal{O}}},2,4,\mathbf{\color{red}{\mathcal{O}}},1]$ ：

- 对左侧和右侧的入口分别执行 $1$ 操作，得到数组 $[\mathbf{\color{red}{\mathcal{O}}},2,4,\mathbf{\color{red}{\mathcal{O}}},3,1]$ 和 $[3,\mathbf{\color{red}{\mathcal{O}}},4,2,\mathbf{\color{red}{\mathcal{O}}},1]$ 。
- 对左右两个入口分别执行 $2$ 操作的结果是数组 $[3,\mathbf{\color{red}{\mathcal{O}}},4,2,\mathbf{\color{red}{\mathcal{O}}},1]$ 和 $[3,1,\mathbf{\color{red}{\mathcal{O}}},2,4,\mathbf{\color{red}{\mathcal{O}}}]$ 。

请找出使用这些操作可以得到的 $^{\text{†}}$ 最小排列。请注意，门户并不影响排列的词典比较。

$^{\text{∗}}$ 长度为 $n$ 的排列是一个长度为 $n$ 的数组，其中包含了从 $1$ 到 $n$ 的每个整数，且每个整数只包含一次。

$^{\text{†}}$ 如果存在一个索引 $i$ ，使得 $1 \leq j \lt i$ 和 $a_i \lt b_i$ 的所有索引 $a_j = b_j$ 都是 $a$ ，那么 $a$ 的排列在词法上小于排列 $b$ 。

#### 贪心

- 数组 `p` 长度 `n`，有两个传送门在位置 `x` 和 `y`（`x < y`，0-indexed）
- 传送门在 `p[x]` 和 `p[x+1]` 之间、`p[y]` 和 `p[y+1]` 之间
- 操作：可以把左门左边/右边的元素移到右门右边/左边

传送门把数组分成三段：

- **左段 A**：`p[0] ~ p[x]`（左门左边及左门位置）
- **中段 B**：`p[x+1] ~ p[y]`（两门之间）
- **右段 C**：`p[y+1] ~ p[n-1]`（右门右边）

1. **中段 B 可以任意循环旋转**（通过操作可以把 B 的第一个元素移到最后，或最后一个移到最前）
2. **A 和 C 保持相对顺序不变**，但 B 可以插入到 A 和 C 之间的任意位置
3. 实际上，最终结果 = **A 和 C 合并** + **B 旋转到最小值开头**，然后 B 插入到合适位置

```python title="分离三段"
A = p[:x+1]     # 左段（包含左门位置）
B = p[x+1:y+1]  # 中段（两门之间）
C = p[y+1:]     # 右段
a = A + C
```


```python title="旋转中段"
# 把 B 旋转到最小值开头
mn = min(b)
idx = b.index(mn)
b = b[idx:] + b[:idx]
```


```python title="插入中段"
# 把 b 插入到 a 中，保持递增
# 找 a 中第一个 >= b[0] 的位置
pos = 0
while pos < len(a) and a[pos] < b[0]:
    pos += 1
ans = a[:pos] + b + a[pos:]
```


***

1. **B 旋转到最小值开头**：让 B 的第一个元素尽可能小
2. **B 插入到合适位置**：B 的第一个元素比 A 中某些元素大时，让那些更小的元素排在前面，保证字典序最小
3. **A 和 C 内部顺序不变**：因为它们之间的元素不能通过传送门交换

***

```python title="贪心"
for _ in range(int(input())):
    n,x,y = map(int,input().split())
    x -= 1
    y -= 1
    p = list(map(int,input().split()))
    a = []
    b = []
    for i in range(n):
        if i <= x or i > y:
            a.append(p[i])
        else:
            b.append(p[i])
    if b:
        mn = min(b)
        idx = b.index(mn)
        b = b[idx:] + b[:idx]
        m = b[0]
    else:
        m = -1
    pos = 0
    while pos < len(a) and a[pos] < m:
        pos += 1
    ans = a[:pos] + b + a[pos:]
    print(*ans)
```


### E-博弈+质因数分解

#### 题目

爱丽丝和鲍勃在最初包含 $n$ 个正整数的数组 $a$ 上玩游戏，爱丽丝先开始。

轮到每个玩家时，如果 $a$ 是非递减 $^{\text{∗}}$ ，游戏立即结束。否则，棋手可以从数组中选择一个元素 $x$ 和正整数 $1 \lt y,z \lt x$ 以便 $x=yz$ 并将数组中的 $x$ 替换为两个元素 $y$ 和 $z$ （在原位置 $x$ 的任意顺序）。如果无法移动，对局结束。

博弈结束后，如果 $a$ 是非递减的，那么鲍勃获胜。否则，爱丽丝获胜。如果双方都以最优方式下棋，谁会赢呢？

如果 $^{\text{∗}}$ $a$ 在所有 $1\leq i\leq m-1$ 中 $a_i\leq a_{i+1}$ 是非递减的，其中 $m$ 是 $a$ 的长度。

#### AI题解

***

#### 一、问题分析

**操作**：选择一个合数 `x = y × z`（`1 < y, z < x`），把 `x` 替换成 `[y, z]`。

**目标**：

- 数组非递减时游戏结束
- 结束时非递减 → Bob 赢
- 否则 → Alice 赢

***

#### 二、关键观察

1. **质数不能分解**，合数可以分解
2. 分解操作会把一个数变成两个**更小的数**
3. 如果一个数有**至少两种不同的质因子**，可以一直分解到质数，且质因子种类不同
4. 如果一个数只有**一种质因子**（即 `p^k`），分解后还是同一种质数

***

#### 三、核心函数 `primebase(x)`

```python 
def primebase(x):
    """返回 x 的唯一质因子，如果有多种则返回 -1"""
    s = set()
    i = 2
    while i * i <= x:
        while x % i == 0:
            s.add(i)
            x //= i
        i += 1
    if x > 1:
        s.add(x)
    if len(s) > 1:
        return -1   # 多种质因子
    if len(s) == 0:
        return 1    # x=1，无质因子
    return list(s)[0]
```


***

#### 四、分类讨论

对每个 `a[i]` 计算 `b[i] = primebase(a[i])`：

| 情况                         | 判断                  | 赢家         |
| -------------------------- | ------------------- | ---------- |
| \`a\` 已经非递减                | \`is\_sorted(a)\`   | **Bob**​   |
| 存在 \`b\[i] == -1\`（有多种质因子） | 可以无限分解              | **Alice**​ |
| \`b\` 是非递减的                | 只能分解成同一种质数，不改变顺序    | **Bob**​   |
| \`b\` 不是非递减的               | 需要调整顺序，但分解不能改变相对顺序？ | **Alice**​ |

***

#### 五、为什么？

- **多种质因子**：可以分解出不同大小的质数，Alice 可以打乱顺序 → Alice 赢
- **单一质因子**：分解后还是同一个质数，无法改变大小关系 → 如果 `b` 已排序则 Bob 赢，否则 Alice 赢（因为初始不排序且不能通过分解调整）
- **已经排序**：直接 Bob 赢

```python 
def primebase(x):
    """返回 x 的唯一质因子，如果有多种则返回 -1"""
    s = set()
    i = 2
    while i * i <= x:
        while x % i == 0:
            s.add(i)
            x //= i
        i += 1
    if x > 1:
        s.add(x)
    if len(s) > 1:
        return -1
    if len(s) == 0:
        return 1
    return list(s)[0]


t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    
    # 已经非递减
    if all(a[i] <= a[i+1] for i in range(n-1)):
        print("Bob")
        continue
    
    b = [primebase(x) for x in a]
    
    # 有元素包含多种质因子
    if -1 in b:
        print("Alice")
        continue
    
    # b 是否非递减
    if all(b[i] <= b[i+1] for i in range(n-1)):
        print("Bob")
    else:
        print("Alice")
```


***
